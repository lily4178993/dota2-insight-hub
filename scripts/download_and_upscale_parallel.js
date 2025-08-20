import fs from 'fs';
import path from 'path';
import os from 'os';
import fse from 'fs-extra';
import chalk from 'chalk';
import pLimit from 'p-Limit';
import { execFile } from 'child_process';
import fetch from 'node-fetch';
// eslint-disable-next-line import/extensions
import generateManifest from './generate_manifest.js';

// API endpoints & directories
const API_ITEMS = 'https://api.opendota.com/api/constants/items';
const TEMPORARY_DIR = './temporary_assets';
const PUBLIC_DIR = 'public\\assets\\items_hd';
const MANIFEST_PATH = 'src/constants/items_upscaled_manifest.json';

// Model & executable selection
let EXECUTABLE;
const MODEL_NAME = 'realesrgan-x4plus-anime';

// Counters
let active = 0;
let completed = 0;
let failed = 0;

// Determine platform + pick executable
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

// Check executable exists
const executablePath = path.resolve(EXECUTABLE);
if (!fs.existsSync(executablePath)) {
  console.error(chalk.red(`❌ Binary not found: ${executablePath}`));
  process.exit(1);
}

// Mode flags
const isProduction = process.env.NODE_ENV === 'production';
const shouldPublish = isProduction || process.argv.includes('--publish');

// Concurrency settings
const cpuCount = os.cpus().length;
const MAX_PARALLEL = Math.max(1, cpuCount - 1); // Limit to one less than total CPU cores
const limit = pLimit(MAX_PARALLEL);
console.log(
  chalk.cyan(
    `🔍 CPU Scan: ${cpuCount} cores detected, using up to ${MAX_PARALLEL} in parallel`,
  ),
);

// Ensure temporary directory exists and create it if not
await fse.ensureDir(TEMPORARY_DIR);
// Ensure public directory exists and create it if not
await fse.ensureDir(PUBLIC_DIR);
// Utility: Check if file exists
const fileExists = (filePath) => fs.existsSync(filePath);

// Error classification helper
const classifyError = (error) => {
  const message = error.message || '';
  if (
    message.includes('ENOTFOUND')
    || message.includes('ECONNRESET')
    || message.includes('ETIMEDOUT')
    || /5\d{2}/.test(message)
  ) return { retry: true };
  if (message.includes('out of memory') || message.includes('VK_ERROR')) {
    return { retry: true, cooldown: 5000 }; // 5s GPU cooldown
  }
  return { retry: false };
};

// Retry wrapper helper
const withRetry = async (fn, retries = 3) => {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await fn();
    } catch (error) {
      const { retry, cooldown } = classifyError(error);
      attempt += 1;
      if (!retry || attempt > retries) throw error;
      if (cooldown) {
        console.log(chalk.yellow(`⏳ Cooling down for ${cooldown}ms...`));
        // eslint-disable-next-line no-await-in-loop
        await new Promise((res) => {
          setTimeout(res, cooldown);
        });
      } else {
        console.log(chalk.yellow(`🔁 Retrying (${attempt}/${retries})...`));
      }
    }
  }
  // If we exhausted all retries, we can return a fallback value or re-throw the error
  throw new Error('Max retries exceeded');
};

// Fetch items data from API
const getItems = async () => {
  const response = await fetch(API_ITEMS);
  const data = await response.json();
  return Object.values(data)
    .filter((item) => item.img)
    .map(
      (item) => `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/items/${item.img}`,
    );
};

// Download image
const downloadImage = async (url, filePath) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}`);
  const buffer = await response.buffer();
  fs.writeFileSync(filePath, buffer);
};

// Upscale image using the external executable
const upscaleImage = (inputPath, outputPath) => new Promise((resolve, reject) => {
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

// Utility: Delete unscaled image from tempory folder
const deleteUnscaledImage = async () => {
  const files = await fse.readdir(TEMPORARY_DIR);
  await Promise.all(
    files.map((file) => {
      if (!file.startsWith('up_')) {
        fse.remove(path.join(TEMPORARY_DIR, file));
      }
      return Promise.resolve();
    }),
  );
};

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

// Function to process image
const processImage = async (url) => {
  const { filename, finalURL } = rebuildURL(url);
  const localPath = `${TEMPORARY_DIR}/${filename}`;
  const upscaledPath = `${TEMPORARY_DIR}/up_${filename}`;

  try {
    // Deduplication download
    if (!fileExists(localPath)) {
      console.log(chalk.blue(`⬇️ Downloading: ${filename}`));
      await withRetry(() => downloadImage(finalURL, localPath));
    } else {
      console.log(chalk.gray(`⏩ Skipping download, exists: ${filename}`));
    }

    // Deduplication upscale
    if (!fileExists(upscaledPath)) {
      console.log(chalk.yellow(`🔄 Upscaling: ${localPath}`));
      await withRetry(() => upscaleImage(localPath, upscaledPath));
    } else {
      console.log(
        chalk.gray(
          `⏩ Skipping upscale, exists: ${path.basename(upscaledPath)}`,
        ),
      );
    }
  } catch (error) {
    console.error(
      chalk.red(`❌ Error processing ${filename}: ${error.message}`),
    );
    throw error; // Re-throw to handle in the main loop
  }
};

// Publish the upscaled images to the public directory
const publishToPublic = async () => {
  console.log(chalk.yellow(`🧹 Removing old public assets from ${PUBLIC_DIR}`));
  await fse.emptyDir(PUBLIC_DIR);

  // Generate manifest
  generateManifest(TEMPORARY_DIR, MANIFEST_PATH);
  console.log(chalk.cyan(`📜 Manifest generated at ${MANIFEST_PATH}`));

  // Copy images to public
  const files = fs.readdirSync(TEMPORARY_DIR).filter((f) => f.endsWith('.png'));
  await Promise.all(
    files.map((file) => fs.promises.copyFile(
      path.join(TEMPORARY_DIR, file),
      path.join(PUBLIC_DIR, file),
    )),
  );
  console.log(`✅ Published ${files.length} images to public folder`);
};

// Log the current status of the processing pipeline
const logStatus = () => {
  process.stdout.write(
    chalk.cyan(
      `\rActive: ${active} | Completed: ${completed} | Failed: ${failed}`,
    ),
  );
};

// Main function to run the script
(async () => {
  try {
    const items = await getItems();
    console.log(chalk.bold(`📦 ${items.length} images found via API`));

    const tasks = items.map((url, idx) => limit(async () => {
      active += 1;
      logStatus();
      try {
        await processImage(url);
        completed += 1;
      } catch (error) {
        failed += 1;
        console.error(
          chalk.red(`❌ Error processing item ${idx + 1}: ${error.message}`),
        );
      } finally {
        active -= 1;
        await deleteUnscaledImage();
        logStatus();
      }
    }));

    // Run all tasks with concurrency limit
    await Promise.all(tasks);

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
