/**
 * adminStorage.js
 * ─────────────────────────────────────────────────────────────────
 * Storage engine for Blogs & Gallery:
 * 1. Fetches live data from Cloudflare Workers / D1 Database & R2 Storage.
 * 2. Caches items in localStorage for instant offline/re-render access.
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

/* ─── KEYS ───────────────────────────────────────────────────── */
const BLOGS_KEY   = 'admin_blogs';
const GALLERY_KEY = 'admin_gallery';

/* ─── HELPERS ────────────────────────────────────────────────── */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ─── BLOG CRUD ──────────────────────────────────────────────── */
export function getBlogs() {
  try {
    const stored = localStorage.getItem(BLOGS_KEY);
    if (stored) return JSON.parse(stored);
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
    if (stored) return JSON.parse(stored);
  } catch {/* ignore */}
  return [];
}

export function saveBlogs(blogs) {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
}

export async function addBlog(post) {
  const blogs = getBlogs();
  const newPost = { ...post, id: generateId(), slug: post.slug || generateId() };
  blogs.unshift(newPost);
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await createBlogApi(newPost);
  return newPost;
}

export async function updateBlog(id, updatedPost) {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...updatedPost };
    saveBlogs(blogs);

    // Sync to Cloudflare D1
    await updateBlogApi(id, blogs[index]);
  }
}

export async function deleteBlog(id) {
  const blogs = getBlogs().filter(b => b.id !== id);
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await deleteBlogApi(id);
}

/* ─── GALLERY CRUD ───────────────────────────────────────────── */
export function getGalleryImages() {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) return JSON.parse(stored);
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
    if (stored) return JSON.parse(stored);
  } catch {/* ignore */}
  return [];
}

export function saveGalleryImages(images) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
}

export async function addGalleryImage(img) {
  const images = getGalleryImages();
  const newImg = { ...img, id: generateId() };
  images.unshift(newImg);
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await createGalleryApi(newImg);
  return newImg;
}

export async function updateGalleryImage(id, updatedImg) {
  const images = getGalleryImages();
  const index = images.findIndex(g => g.id === id);
  if (index !== -1) {
    images[index] = { ...images[index], ...updatedImg };
    saveGalleryImages(images);

    // Sync to Cloudflare D1
    await updateGalleryApi(id, images[index]);
  }
}

export async function deleteGalleryImage(id) {
  const images = getGalleryImages().filter(g => g.id !== id);
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await deleteGalleryApi(id);
}

/* ─── AUTH ───────────────────────────────────────────────────── */
export function setAdminAuth(val) {
  if (val) sessionStorage.setItem('adminAuth', '1');
  else sessionStorage.removeItem('adminAuth');
}

export function isAdminAuthed() {
  return sessionStorage.getItem('adminAuth') === '1';
}
