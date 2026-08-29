/**
 * imageOptimizer.js
 * ─────────────────────────────────────────────────────────────────
 * Utility to optimize external image URLs (e.g. Unsplash, Cloudflare R2)
 * for high-speed rendering by injecting resolution and format parameters.
 */

/**
 * Transforms an image URL to an optimized low-bandwidth version.
 * @param {string} url - Original image URL
 * @param {number} width - Desired width in pixels (default: 600 for grid thumbnails)
 * @param {number} quality - Quality 1-100 (default: 75)
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(url, width = 600, quality = 75) {
  if (!url || typeof url !== 'string') return url;

  // Unsplash Optimization
  if (url.includes('images.unsplash.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('auto', 'format');
      parsed.searchParams.set('fit', 'crop');
      parsed.searchParams.set('w', String(width));
      parsed.searchParams.set('q', String(quality));
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
}
