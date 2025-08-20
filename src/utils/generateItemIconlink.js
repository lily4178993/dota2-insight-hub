import { itemsUpscaledImages } from '../constants';
/**
 * Resolves the appropriate image path for a Dota 2 item icon.
 *
 * @function generateItemIconlink
 * @param {string} imgUrl - Original CDN image URL for the item.
 * @returns {string} - Local HD asset path if available, otherwise the original CDN URL.
 *
 * @description
 * Extracts the item image filename from the provided CDN URL, normalizes it to `.png`,
 * and checks against the `itemsUpscaledImages` manifest to determine if a local upscale exists.
 * If found, returns the relative path to the local HD asset. Otherwise, falls back to the original
 * CDN path.
 *
 * This function enables conditional rendering of high-resolution item icons in the frontend
 * without requiring runtime file existence checks.
 *
 * @example
 * generateItemIconlink("https://myoriginalcdnlink/items/blink.png");
 * // → "assets/items_hd/up_blink.png" (if upscaled version exists)
 * // → original CDN URL (if not)
 */

const generateItemIconlink = (imgUrl) => {
  const nameParam = imgUrl
    .split('/')
    .pop()
    .replace(/\.png.*/, '.png');

  const upscaleName = `up_${nameParam}`;
  if (itemsUpscaledImages[upscaleName]) {
    return `assets/items_hd/${upscaleName}`;
  }
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${nameParam}`;
};

export default generateItemIconlink;
