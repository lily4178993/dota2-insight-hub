import fs from 'fs';
/**
 * Generates a manifest JSON file indexing all `.png` assets in a given directory.
 *
 * @function generateManifest
 * @param {string} sourceDir - Absolute or relative path to the directory containing image assets.
 * @param {string} outputPath - Destination path for the generated manifest file.
 *
 * @throws {Error} If the source directory does not exist.
 *
 * @description
 * Scans the specified `sourceDir` for `.png` files and creates a manifest object
 * where each filename is mapped to `true`. The manifest is written to `outputPath`
 * in pretty-printed JSON format.
 *
 * Example manifest:
 * {
 *   "up_item_blink.png": true,
 *   "up_item_sword.png": true
 * }
 *
 * This manifest can be consumed by frontend logic (e.g. React) to verify asset presence
 * or fallback to CDN paths when local upscales are missing.
 *
 * @example
 * generateManifest('./public/upscaled', './src/data/upscaleManifest.json');
 *
 * // Output:
 * // ✅ Manifest generated with 42 entries at ./src/data/upscaleManifest.json
 */
const generateManifest = (sourceDir, outputPath) => {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter((file) => file.endsWith('.png'));

  const manifest = {};
  files.forEach((file) => {
    manifest[file] = true;
  });

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  // eslint-disable-next-line no-console
  console.log(
    `✅ Manifest generated with ${files.length} entries at ${outputPath}`,
  );
};

export default generateManifest;
