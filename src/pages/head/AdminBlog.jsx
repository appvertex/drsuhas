import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../utils/adminStorage';
import { uploadImageToR2 } from '../../utils/apiClient';

const EMPTY_FORM = {
  title: '', excerpt: '', content: '', category: '',
  author: 'Dr. Suhas S Kumar', date: '', image: '', slug: '',
};

export default function AdminBlog() {
  const [posts, setPosts]       = useState(getBlogs);
  const [mode, setMode]         = useState('list');   // 'list' | 'add' | 'edit'
  const [form, setForm]         = useState(EMPTY_FORM);
  const [editId, setEditId]     = useState(null);
  const [confirm, setConfirm]   = useState(null);     // id to delete
  const [toast, setToast]       = useState('');
  const [uploading, setUploading] = useState(false);

  function refresh() { setPosts(getBlogs()); }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToR2(file);
      setForm(f => ({ ...f, image: url }));
      showToast('Image uploaded to Cloudflare R2!');
    } catch (err) {
      showToast('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  function openAdd() {
    setForm({ ...EMPTY_FORM, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
    setEditId(null);
    setMode('add');
  }

  function openEdit(post) {
    setForm({ ...post });
    setEditId(post.id);
    setMode('edit');
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.excerpt.trim()) return;
    if (mode === 'add') {
      await addBlog(form);
      showToast('Blog post added!');
    } else {
      await updateBlog(editId, form);
      showToast('Blog post updated!');
    }
    refresh();
    setMode('list');
  }

  async function handleDelete(id) {
    await deleteBlog(id);
    refresh();
    setConfirm(null);
    showToast('Post deleted.');
  }

  return (
    <AdminLayout>
      <div style={styles.page}>
        {/* Toast */}
        {toast && <div style={styles.toast}>{toast}</div>}

        {/* Confirm delete dialog */}
        {confirm && (
          <div style={styles.overlay}>
            <div style={styles.dialog}>
              <div style={styles.dialogIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </div>
              <div style={styles.dialogTitle}>Delete this post?</div>
              <p style={styles.dialogDesc}>This action cannot be undone.</p>
              <div style={styles.dialogBtns}>
                <button onClick={() => setConfirm(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={() => handleDelete(confirm)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── LIST VIEW ─────────────────────────────── */}
        {mode === 'list' && (
          <>
            <div style={styles.header}>
              <div>
                <h1 style={styles.heading}>Blog Posts</h1>
                <p style={styles.sub}>{posts.length} posts published</p>
              </div>
              <button onClick={openAdd} style={styles.addBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add New Post
              </button>
            </div>

            {posts.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>📝</div>
                <div style={styles.emptyText}>No blog posts yet. Add your first post!</div>
              </div>
            ) : (
              <div style={styles.postList}>
                {posts.map(post => (
                  <div key={post.id} style={styles.postCard}>
                    <img src={post.image} alt={post.title} style={styles.postImg}
                      onError={e => { e.target.src = 'https://via.placeholder.com/80x80?text=?'; }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={styles.postCategory}>{post.category}</div>
                      <div style={styles.postTitle}>{post.title}</div>
                      <div style={styles.postMeta}>{post.author} · {post.date}</div>
                      <p style={styles.postExcerpt}>{post.excerpt?.slice(0, 100)}…</p>
                    </div>
                    <div style={styles.postActions}>
                      <button onClick={() => openEdit(post)} style={styles.editBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                      <button onClick={() => setConfirm(post.id)} style={styles.delBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── FORM VIEW (Add / Edit) ─────────────────── */}
        {(mode === 'add' || mode === 'edit') && (
          <>
            <div style={styles.header}>
              <div>
                <h1 style={styles.heading}>{mode === 'add' ? 'Add New Post' : 'Edit Post'}</h1>
                <p style={styles.sub}>Fill in the details below and click Save.</p>
              </div>
              <button onClick={() => setMode('list')} style={styles.backBtn}>
                ← Back to list
              </button>
            </div>

            <div style={styles.formGrid}>
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Title *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Understanding Laparoscopic Surgery" />
                <Field label="Excerpt *" name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary (shown on the blog card)" as="textarea" rows={3} />
                <Field label="Content" name="content" value={form.content} onChange={handleChange} placeholder="Full article content..." as="textarea" rows={10} />
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Laparoscopy" />
                <Field label="Author" name="author" value={form.author} onChange={handleChange} placeholder="Dr. Suhas S Kumar" />
                <Field label="Date" name="date" value={form.date} onChange={handleChange} placeholder="e.g. Oct 12, 2025" />
                <Field label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
                
                {/* File Upload to Cloudflare R2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                    Or Upload File to Cloudflare R2
                  </label>
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.75rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(201,169,110,0.4)',
                    color: '#c9a96e', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {uploading ? 'Uploading to R2...' : 'Select File from Device'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Image preview */}
                {form.image && (
                  <div>
                    <div style={styles.previewLabel}>Image Preview</div>
                    <img src={form.image} alt="preview" style={styles.imgPreview}
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={!form.title.trim() || !form.excerpt.trim()}
                  style={{ ...styles.saveBtn, opacity: (!form.title.trim() || !form.excerpt.trim()) ? 0.5 : 1 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Post
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function Field({ label, name, value, onChange, placeholder, as = 'input', rows }) {
  const Tag = as;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={fieldStyles.label}>{label}</label>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{ ...fieldStyles.input, resize: as === 'textarea' ? 'vertical' : undefined, minHeight: as === 'textarea' ? (rows ? rows * 24 + 18 : 80) : undefined }}
      />
    </div>
  );
}

const fieldStyles = {
  label: {
    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
  },
  input: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', padding: '0.75rem 1rem',
    color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box',
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: 'border-color 0.2s',
  },
};

const styles = {
  page: { padding: '2.5rem', maxWidth: '1100px', margin: '0 auto', position: 'relative' },
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
    background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)',
    borderRadius: '12px', padding: '0.75rem 1.25rem',
    color: '#34d399', fontSize: '0.88rem', fontWeight: 600,
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
  },
  overlay: {
    position: 'fixed', inset: 0, zIndex: 999,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  dialog: {
    background: '#1a1a25', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '2rem', maxWidth: '340px', width: '90%',
    textAlign: 'center',
  },
  dialogIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  dialogTitle: { color: '#fff', fontSize: '1.1rem', fontWeight: 700 },
  dialogDesc: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0.5rem 0 1.5rem' },
  dialogBtns: { display: 'flex', gap: '0.75rem', justifyContent: 'center' },
  cancelBtn: {
    padding: '0.65rem 1.5rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem',
  },
  deleteBtn: {
    padding: '0.65rem 1.5rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
  },
  header: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  heading: { fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.03em' },
  sub: { color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', margin: '0.25rem 0 0' },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 1.4rem',
    background: 'linear-gradient(135deg, #c9a96e, #e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem',
    cursor: 'pointer', letterSpacing: '0.01em',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', padding: '0.6rem 1.2rem',
    color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.88rem',
  },
  empty: {
    textAlign: 'center', padding: '4rem 2rem',
    background: 'rgba(255,255,255,0.02)', borderRadius: '20px',
    border: '1px dashed rgba(255,255,255,0.1)',
  },
  emptyIcon: { fontSize: '3rem', marginBottom: '1rem' },
  emptyText: { color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' },
  postList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  postCard: {
    display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '1.25rem',
  },
  postImg: {
    width: '80px', height: '80px', borderRadius: '10px',
    objectFit: 'cover', flexShrink: 0,
  },
  postCategory: {
    display: 'inline-block', background: 'rgba(201,169,110,0.12)',
    color: '#c9a96e', fontSize: '0.7rem', fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '0.2rem 0.6rem', borderRadius: '999px', marginBottom: '0.4rem',
  },
  postTitle: { color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3 },
  postMeta: { color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', margin: '0.3rem 0' },
  postExcerpt: { color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 },
  postActions: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 },
  editBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.5rem 1rem', borderRadius: '8px',
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    color: '#c9a96e', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
  },
  delBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.5rem 1rem', borderRadius: '8px',
    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
  },
  formGrid: {
    display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem',
  },
  previewLabel: {
    fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem',
  },
  imgPreview: {
    width: '100%', height: '180px', objectFit: 'cover',
    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)',
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #c9a96e, #e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.95rem',
    cursor: 'pointer', marginTop: '0.5rem',
  },
};
