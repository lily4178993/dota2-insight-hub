import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFile } from 'child_process';
import fetch from 'node-fetch';
import fse from 'fs-extra';
import chalk from 'chalk';

const API_ITEMS = 'https://api.opendota.com/api/constants/items';
const TEMPORARY_DIR = './temporary_assets';
const PUBLIC_DIR = '.public/assets/items_hd';
let EXECUTABLE;
const MODEL_NAME = 'realesrgan-x4plus-anime';

// Check the OS platform
const platform = os.platform();
if (platform === 'win32') {
  EXECUTABLE = './scripts/realesrgan-win/realesrgan-ncnn-vulkan.exe';
} else if (platform === 'darwin') {
  EXECUTABLE = './scripts/realesrgan-macos/realesrgan-ncnn-vulkan';
} else if (platform === 'linux') {
  EXECUTABLE = './scripts/realesrgan-linux/realesrgan-ncnn-vulkan';
} else {
  console.error(
    chalk.red(
      `❌ Unsupported platform: ${platform}. Binary available for Windows, macOS, and Linux only.`,
    ),
  );
  process.exit(1);
}

// Check if Binary exists
const executablePath = path.resolve(EXECUTABLE);
if (!fs.existsSync(executablePath)) {
  console.error(chalk.red(`❌ Binary not found: ${executablePath}`));
  process.exit(1);
}

// Check if production mode is enabled
const isProduction = process.env.NODE_ENV === 'production';
const publishFlag = process.argv.includes('--publish');
const shouldPublish = isProduction || publishFlag;

// 🔍 CPU Scan for parallel processing
const cpuCount = os.cpus().length;
const MAX_PARALLEL = Math.max(1, cpuCount - 1); // Limit to one less than total cores
console.log(
  chalk.cyan(
    `🔍 CPU Scan: ${cpuCount} cores detected, using up to ${MAX_PARALLEL} in parallel`,
  ),
);

// Ensure temporary directory exists and create it if not
await fse.ensureDir(TEMPORARY_DIR);
// Ensure public directory exists and create it if not
await fse.ensureDir(PUBLIC_DIR);

// Fetch items data from API
async function getItems() {
  const response = await fetch(API_ITEMS);
  const data = await response.json();
  return Object.values(data)
    .filter((item) => item.img)
    .map(
      (item) => `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${item.img}`,
    );
}

// Download image
async function downloadImage(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}`);
  const buffer = await response.buffer();
  fs.writeFileSync(filePath, buffer);
}

// Upscale image using the external executable
function upscaleImage(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    execFile(
      EXECUTABLE,
      ['-i', inputPath, '-o', outputPath, '-n', MODEL_NAME],
      (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(chalk.green(`✅ Upscaled: ${path.basename(outputPath)}`));
          resolve();
        }
      },
    );
  });
}

// Function to rebuild the entire URL
const rebuildURL = (imageUrl) => {
  const base = 'https://cdn.cloudflare.steamstatic.com';
  const nameParam = imageUrl
    .split('/')
    .pop()
    .replace(/\.png.*/, '.png');

  return {
    finalURL: `${base}/apps/dota2/images/dota_react/items/${nameParam}`,
    filename: nameParam,
  };
};

// Utility: Check if file exists
const fileExists = (filePath) => fs.existsSync(filePath);

// Function to process image
async function processImage(url) {
  const { filename, finalURL } = rebuildURL(url);
  const localPath = `${TEMPORARY_DIR}/${filename}`;
  const upscaledPath = `${TEMPORARY_DIR}/up_${filename}`;

  try {
    // 1. Pre-download deduplication
    if (fileExists(localPath)) {
      console.log(
        chalk.gray(`⏩ Skipping download, already exists: ${filename}`),
      );
    } else {
      console.log(chalk.blue(`⬇️ Downloading: ${filename}`));
      await downloadImage(finalURL, localPath);
    }

    // 2. Pre-upscale deduplication
    if (fileExists(upscaledPath)) {
      console.log(
        chalk.gray(
          `⏩ Skipping upscale, already exists: ${path.basename(upscaledPath)}`,
        ),
      );
      return;
    }

    // 3. Upscaling step
    console.log(chalk.yellow(`🔄 Upscaling: ${localPath}`));
    await upscaleImage(localPath, upscaledPath);
  } catch (error) {
    console.error(
      chalk.red(`❌ Error processing ${filename}: ${error.message}`),
    );
  }
}

// Publish the upscaled images to the public directory
async function publishToPublic() {
  console.log(chalk.yellow(`🧹 Removing old public assets from ${PUBLIC_DIR}`));
  await fse.emptyDir(PUBLIC_DIR);

  console.log(
    chalk.cyan(`📦 Copying new optimized assets to the ${PUBLIC_DIR}`),
  );
  await fse.copy(TEMPORARY_DIR, PUBLIC_DIR, { overwrite: true });
}

// Create worker function
let index = 0;
async function worker(items) {
  const promises = [];
  while (index < items.length) {
    const currentIndex = index;
    index += 1;
    promises.push(processImage(items[currentIndex]));
  }
  await Promise.all(promises);
}

// Main function to run the script
(async () => {
  try {
    const items = await getItems();
    console.log(chalk.bold(`📦 ${items.length} images found via API`));

    // Create worker pool
    await Promise.all(
      Array.from({ length: MAX_PARALLEL }, () => worker(items)),
    );

    // Publish the upscaled images to public directory if needed
    if (shouldPublish) {
      await publishToPublic();
    } else {
      console.log(
        chalk.gray(
          'ℹ️ Skipping publishing to /public directory. (Use --publish or NODE_ENV=production to enable.)',
        ),
      );
    }

    console.log(chalk.bold.green('🏁 Pipeline complete with success!'));
  } catch (error) {
    console.error(chalk.bgRed.white('❌ Error in processing pipeline:'), error);
  }
})();
