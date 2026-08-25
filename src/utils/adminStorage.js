/**
 * adminStorage.js
 * ─────────────────────────────────────────────────────────────────
 * Hybrid storage engine:
 * 1. Synchronously serves cached data from localStorage (or defaults) for fast rendering.
 * 2. Asynchronously syncs with Cloudflare Workers / D1 Database & R2 Storage.
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

/* ─── DEFAULT DATA (mirrors original hardcoded arrays) ────────── */
const DEFAULT_BLOGS = [
  {
    id: '1',
    slug: 'understanding-laparoscopic-surgery',
    title: 'Understanding Laparoscopic Surgery: What to Expect',
    excerpt:
      'Laparoscopy has revolutionized surgery. Learn about the benefits of minimally invasive procedures, preparation, and what to expect during recovery.',
    content: `Laparoscopic surgery, often referred to as keyhole surgery, represents one of the most significant advancements in modern surgical practice. By utilizing small incisions typically ranging from 0.5 to 1.5 centimeters, surgeons insert a high-definition camera (laparoscope) and specialized instruments to perform complex operations with high visual precision.\n\n### Key Advantages of Laparoscopy\n- **Significantly Reduced Pain**: Smaller incisions lead to less tissue trauma and significantly reduced postoperative discomfort.\n- **Shorter Hospitalization**: Most patients are discharged within 24 to 48 hours following surgery.\n- **Faster Return to Daily Routine**: Patients generally resume normal daily activities within 1 to 2 weeks.\n- **Minimal Scarring**: Scars are minimal and fade considerably over time.\n\n### Preparing for Surgery\nPrior to laparoscopic surgery, Dr. Suhas conducts a thorough clinical evaluation, pre-operative blood work, and imaging. Detailed instructions regarding fasting and medication management are provided to ensure optimal patient safety.`,
    date: 'Oct 12, 2025',
    author: 'Dr. Suhas S Kumar',
    category: 'Laparoscopy',
    image:
      'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    slug: 'recovery-after-hernia-repair',
    title: 'Recovery After Hernia Repair: A Patient Guide',
    excerpt:
      'A successful recovery depends heavily on post-operative care. Read our comprehensive guide on resting, movement, and returning to daily activities safely.',
    content: `Recovering from hernia repair requires a balanced approach between rest and gentle, progressive movement. Whether undergoing laparoscopic mesh repair or traditional open surgery, adhering to medical guidelines accelerates healing and minimizes recurrence risk.\n\n### Post-Operative Care Guidelines\n- **Avoid Heavy Lifting**: Refrain from lifting anything over 5 kg for at least 4 to 6 weeks.\n- **Wound Care**: Keep the incision site clean and dry. Follow dressing change instructions meticulously.\n- **Dietary Management**: Maintain a high-fiber diet and stay well-hydrated to prevent constipation and strain on abdominal muscles.\n- **Gradual Activity**: Gentle walking is encouraged from the first day to promote circulation and prevent blood clots.`,
    date: 'Sep 28, 2025',
    author: 'Dr. Suhas S Kumar',
    category: 'Hernia Care',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    slug: 'managing-diabetic-foot-ulcers',
    title: 'Managing Diabetic Foot Ulcers: Treatment and Care',
    excerpt:
      'Diabetic foot complications require immediate, expert attention. Learn about wound care, infection control, and when surgical intervention is necessary.',
    content: `Diabetic foot ulcers are serious complications of diabetes requiring prompt multidisciplinary care. Poor blood circulation and peripheral neuropathy mean minor injuries can escalate quickly if unmonitored.\n\n### Prevention & Daily Inspection\n- Inspect feet daily for cuts, blisters, redness, or swelling.\n- Keep feet clean and well-moisturized (avoiding between toes).\n- Wear comfortable, well-fitted footwear designed for diabetic feet.\n\n### Clinical & Surgical Management\nEarly surgical debridement of non-viable tissue, specialized offloading dressings, and strict glycemic control are key steps to promote ulcer healing and prevent limb loss.`,
    date: 'Aug 15, 2025',
    author: 'Dr. Suhas S Kumar',
    category: 'Diabetic Foot',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    slug: 'varicose-veins-laser-vs-traditional',
    title: 'Varicose Veins: Modern Laser vs Traditional Surgery',
    excerpt:
      'Explore the differences between endovenous laser treatment and traditional surgical vein stripping, focusing on recovery times and clinical outcomes.',
    content: `Varicose veins cause pain, leg heaviness, and aesthetic concerns. Modern endovenous laser ablation (EVLA) has transformed vascular surgical care.\n\n### Laser Ablation vs Open Stripping\n- **Laser Treatment (EVLA)**: Performed under local anesthesia as a day-care procedure. Uses thermal energy to seal diseased veins internally. No large incisions or stitches required.\n- **Recovery Comparison**: Patients undergoing laser treatment walk out immediately after the procedure and resume work within 48 hours, compared to 2-3 weeks for traditional vein stripping.`,
    date: 'Jul 22, 2025',
    author: 'Dr. Suhas S Kumar',
    category: 'Vein Surgery',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
];

const DEFAULT_GALLERY = [
  {
    id: 'g1',
    src: '/images/hero-doctor.png',
    title: 'Dr. Suhas S Kumar',
    label: 'Consultant General & Laparoscopic Surgeon',
    span: 'tall',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    title: 'Advanced Operating Theatre',
    label: 'State-of-the-Art Surgical Suite',
    span: 'wide',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    title: 'Clinical Consultation',
    label: 'Personalized Care & Diagnostics',
    span: 'tall',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    title: 'Minimal Access Surgery',
    label: 'Precision Laparoscopic Tools',
    span: 'normal',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    title: 'Interdisciplinary Team',
    label: 'Collaborative Surgical Care',
    span: 'normal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    title: 'Diagnostic Excellence',
    label: 'High-Resolution Medical Imaging',
    span: 'normal',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    title: 'Recovery & Care Unit',
    label: 'Monitored Post-Op Environment',
    span: 'wide',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80',
    title: 'Endo-Surgery Facility',
    label: 'Advanced Laparoscopic Tower',
    span: 'tall',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    title: 'Clinical Research',
    label: 'Evidence-Based Practice',
    span: 'normal',
  },
];

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
    if (apiBlogs) {
      saveBlogs(apiBlogs);
    }
  });

  return DEFAULT_BLOGS;
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

export async function updateBlog(id, data) {
  const blogs = getBlogs().map(b => (b.id === id ? { ...b, ...data } : b));
  saveBlogs(blogs);

  // Sync to Cloudflare D1
  await updateBlogApi(id, data);
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
    if (apiGallery) {
      saveGalleryImages(apiGallery);
    }
  });

  return DEFAULT_GALLERY;
}

export function saveGalleryImages(images) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
}

export async function addGalleryImage(img) {
  const images = getGalleryImages();
  const newImg = { ...img, id: generateId() };
  images.push(newImg);
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await createGalleryApi(newImg);
  return newImg;
}

export async function updateGalleryImage(id, data) {
  const images = getGalleryImages().map(g => (g.id === id ? { ...g, ...data } : g));
  saveGalleryImages(images);

  // Sync to Cloudflare D1
  await updateGalleryApi(id, data);
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
