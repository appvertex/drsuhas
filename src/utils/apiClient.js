/**
 * apiClient.js
 * ─────────────────────────────────────────────────────────────────
 * Frontend API client communicating with Cloudflare Workers / Pages Functions
 * (`/api/...`) backed by Cloudflare D1 (Database) & R2 (Image Storage).
 *
 * If the Cloudflare Worker backend is active, requests go to `/api/*`.
 * If running in standalone local environment without workers, it safely falls back
 * to `localStorage` to ensure a smooth dev experience.
 */

const API_BASE = '/api';

/**
 * Upload an image file directly to Cloudflare R2 via `/api/upload`
 * @param {File} file 
 * @returns {Promise<string>} Image URL
 */
export async function uploadImageToR2(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch (e) {
    console.warn('[Cloudflare R2 Upload] Worker endpoint not reachable, reading as Data URL fallback:', e);
  }

  // Fallback for local testing without worker backend: convert to base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Fetch all blogs from Cloudflare D1
 */
export async function fetchBlogsFromApi() {
  try {
    const res = await fetch(`${API_BASE}/blogs`);
    if (res.ok) {
      const blogs = await res.json();
      if (Array.isArray(blogs) && blogs.length > 0) {
        return blogs;
      }
    }
  } catch (e) {
    console.log('[API Client] Cloudflare Worker not active, falling back to localStorage.');
  }
  return null;
}

/**
 * Save new blog to Cloudflare D1
 */
export async function createBlogApi(post) {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('[API Client] Could not post to D1 API:', e);
  }
  return null;
}

/**
 * Update blog in Cloudflare D1
 */
export async function updateBlogApi(id, post) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) return true;
  } catch (e) {
    console.warn('[API Client] Could not update D1 API:', e);
  }
  return false;
}

/**
 * Delete blog from Cloudflare D1
 */
export async function deleteBlogApi(id) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) return true;
  } catch (e) {
    console.warn('[API Client] Could not delete from D1 API:', e);
  }
  return false;
}

/**
 * Fetch gallery images from Cloudflare D1
 */
export async function fetchGalleryFromApi() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (res.ok) {
      const gallery = await res.json();
      if (Array.isArray(gallery) && gallery.length > 0) {
        return gallery;
      }
    }
  } catch (e) {
    console.log('[API Client] Cloudflare Worker not active, falling back to localStorage.');
  }
  return null;
}

/**
 * Save new gallery item to Cloudflare D1
 */
export async function createGalleryApi(item) {
  try {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('[API Client] Could not post gallery item to D1 API:', e);
  }
  return null;
}

/**
 * Update gallery item in Cloudflare D1
 */
export async function updateGalleryApi(id, item) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (res.ok) return true;
  } catch (e) {
    console.warn('[API Client] Could not update gallery item in D1 API:', e);
  }
  return false;
}

/**
 * Delete gallery item from Cloudflare D1
 */
export async function deleteGalleryApi(id) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) return true;
  } catch (e) {
    console.warn('[API Client] Could not delete gallery item from D1 API:', e);
  }
  return false;
}

/**
 * Fetch site settings from Cloudflare D1
 */
export async function fetchSettingsFromApi() {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('[API Client] Could not fetch settings from D1 API:', e);
  }
  return null;
}

/**
 * Update site settings in Cloudflare D1
 */
export async function updateSettingsApi(settings) {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('[API Client] Could not update settings in D1 API:', e);
  }
  return null;
}

