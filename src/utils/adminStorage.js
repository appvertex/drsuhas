/**
 * adminStorage.js
 * ─────────────────────────────────────────────────────────────────
 * Storage engine for Blogs & Gallery with 100% safe storage fallbacks
 * for private browsing/incognito mode DOMExceptions:
 * 1. Fetches live data from Cloudflare Workers / D1 Database & R2 Storage.
 * 2. Caches items in localStorage/memory for instant offline/re-render access.
 * 3. Contains ZERO hardcoded default posts or gallery items.
 */

import {
  fetchBlogsFromApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  fetchGalleryFromApi,
  createGalleryApi,
  updateGalleryApi,
  deleteGalleryApi,
} from './apiClient';

/* ─── KEYS & MEMORY FALLBACKS ───────────────────────────────── */
const BLOGS_KEY   = 'admin_blogs';
const GALLERY_KEY = 'admin_gallery';
let memoryBlogs   = null;
let memoryGallery = null;
let memoryAuth    = false;

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ─── BLOG CRUD ──────────────────────────────────────────────── */
export function getBlogs() {
  if (memoryBlogs && Array.isArray(memoryBlogs)) return memoryBlogs;

  try {
    const stored = localStorage.getItem(BLOGS_KEY);
    if (stored) {
      memoryBlogs = JSON.parse(stored);
      return memoryBlogs;
    }
  } catch {/* ignore */}

  // Trigger background sync with Cloudflare D1
  fetchBlogsFromApi().then(apiBlogs => {
    if (apiBlogs && Array.isArray(apiBlogs)) {
      saveBlogs(apiBlogs);
    }
  });

  return [];
}

export async function getBlogsAsync() {
  const apiBlogs = await fetchBlogsFromApi();
  if (apiBlogs && Array.isArray(apiBlogs)) {
    saveBlogs(apiBlogs);
    return apiBlogs;
  }
  try {
    const stored = localStorage.getItem(BLOGS_KEY);
    if (stored) {
      memoryBlogs = JSON.parse(stored);
      return memoryBlogs;
    }
  } catch {/* ignore */}
  return memoryBlogs || [];
}

export function saveBlogs(blogs) {
  memoryBlogs = blogs;
  try {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  } catch {/* ignore */}
}

export async function addBlog(blog) {
  const newPost = {
    id: generateId(),
    ...blog,
    created_at: new Date().toISOString(),
  };
  const blogs = [newPost, ...getBlogs()];
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await createBlogApi(newPost);
  return newPost;
}

export async function updateBlog(id, blog) {
  const blogs = getBlogs().map(b => (b.id === id ? { ...b, ...blog } : b));
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await updateBlogApi(id, blog);
}

export async function deleteBlog(id) {
  const blogs = getBlogs().filter(b => b.id !== id);
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await deleteBlogApi(id);
}

/* ─── GALLERY CRUD ───────────────────────────────────────────── */
export function getGalleryImages() {
  if (memoryGallery && Array.isArray(memoryGallery)) return memoryGallery;

  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) {
      memoryGallery = JSON.parse(stored);
      return memoryGallery;
    }
  } catch {/* ignore */}

  // Trigger background sync with Cloudflare D1
  fetchGalleryFromApi().then(apiGallery => {
    if (apiGallery && Array.isArray(apiGallery)) {
      saveGalleryImages(apiGallery);
    }
  });

  return [];
}

export async function getGalleryImagesAsync() {
  const apiGallery = await fetchGalleryFromApi();
  if (apiGallery && Array.isArray(apiGallery)) {
    saveGalleryImages(apiGallery);
    return apiGallery;
  }
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) {
      memoryGallery = JSON.parse(stored);
      return memoryGallery;
    }
  } catch {/* ignore */}
  return memoryGallery || [];
}

export function saveGalleryImages(images) {
  memoryGallery = images;
  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  } catch {/* ignore */}
}

export async function addGalleryImage(img) {
  const newImg = {
    id: generateId(),
    ...img,
    created_at: new Date().toISOString(),
  };
  const images = [newImg, ...getGalleryImages()];
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await createGalleryApi(newImg);
  return newImg;
}

export async function updateGalleryImage(id, img) {
  const images = getGalleryImages().map(g => (g.id === id ? { ...g, ...img } : g));
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await updateGalleryApi(id, img);
}

export async function deleteGalleryImage(id) {
  const images = getGalleryImages().filter(g => g.id !== id);
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await deleteGalleryApi(id);
}

/* ─── AUTH ───────────────────────────────────────────────────── */
export function setAdminAuth(val) {
  memoryAuth = Boolean(val);
  try {
    if (val) sessionStorage.setItem('adminAuth', '1');
    else sessionStorage.removeItem('adminAuth');
  } catch {/* ignore */}
}

export function isAdminAuthed() {
  if (memoryAuth) return true;
  try {
    return sessionStorage.getItem('adminAuth') === '1';
  } catch {
    return memoryAuth;
  }
}
