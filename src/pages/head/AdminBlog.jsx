import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../utils/adminStorage';
import { uploadImageToR2 } from '../../utils/apiClient';
import { BookOpen, Plus, Pencil, Trash2, ArrowLeft, Save, Upload, Image } from 'lucide-react';

const EMPTY_FORM = {
  title: '', excerpt: '', content: '', category: '',
  author: 'Dr. Suhas S Kumar', date: '', image: '', slug: '',
};

export default function AdminBlog() {
  const [posts, setPosts]         = useState(getBlogs);
  const [mode, setMode]           = useState('list');
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]       = useState(null);
  const [confirm, setConfirm]     = useState(null);
  const [toast, setToast]         = useState('');
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
      showToast('✓ Image uploaded to Cloudflare R2!');
    } catch {
      showToast('✕ Failed to upload image');
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
    const cleanImage = (form.image && typeof form.image === 'string' && form.image.trim().length > 5)
      ? form.image.trim()
      : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80';
    const postToSave = { ...form, image: cleanImage };
    if (mode === 'add') {
      await addBlog(postToSave);
      showToast('✓ Blog post added!');
    } else {
      await updateBlog(editId, postToSave);
      showToast('✓ Blog post updated!');
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
      <div style={s.page} data-admin-page>
        {/* Toast */}
        {toast && <div style={s.toast}>{toast}</div>}

        {/* Delete Confirm Dialog */}
        {confirm && (
          <div style={s.overlay}>
            <div style={s.dialog}>
              <div style={s.dialogIconWrap}>
                <Trash2 size={24} color="#f87171" />
              </div>
              <div style={s.dialogTitle}>Delete this post?</div>
              <p style={s.dialogDesc}>This action cannot be undone.</p>
              <div style={s.dialogBtns}>
                <button onClick={() => setConfirm(null)} style={s.cancelBtn}>Cancel</button>
                <button onClick={() => handleDelete(confirm)} style={s.deleteBtn}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {mode === 'list' && (
          <>
            {/* Page Header */}
            <div style={s.pageHeader} data-admin-header>
              <div style={s.pageTitleGroup}>
                <div style={s.pageTitleIcon}>
                  <BookOpen size={22} color="#c9a96e" />
                </div>
                <div>
                  <h1 style={s.pageTitle}>Blog Posts</h1>
                  <p style={s.pageSub}>{posts.length} post{posts.length !== 1 ? 's' : ''} published</p>
                </div>
              </div>
              <button onClick={openAdd} style={s.primaryBtn}>
                <Plus size={16} />
                Add New Post
              </button>
            </div>

            {/* Post List */}
            {posts.length === 0 ? (
              <div style={s.empty}>
                <div style={s.emptyIconWrap}>
                  <BookOpen size={40} color="rgba(255,255,255,0.15)" />
                </div>
                <div style={s.emptyTitle}>No blog posts yet</div>
                <div style={s.emptyText}>Click "Add New Post" to publish your first article.</div>
                <button onClick={openAdd} style={{ ...s.primaryBtn, marginTop: '1.5rem' }}>
                  <Plus size={16} /> Add First Post
                </button>
              </div>
            ) : (
              <div style={s.postList}>
                {posts.map(post => (
                  <div key={post.id} style={s.postCard} data-blog-card data-admin-blog-post>
                    <div style={s.postImageWrap}>
                      <img
                        src={(post.image && typeof post.image === 'string' && post.image.trim().length > 5) ? post.image.trim() : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'}
                        alt={post.title}
                        style={s.postImg}
                        onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'; }}
                      />
                    </div>
                    <div style={s.postInfo}>
                      {post.category && (
                        <span style={s.categoryBadge}>{post.category}</span>
                      )}
                      <div style={s.postTitle}>{post.title}</div>
                      <div style={s.postMeta}>{post.author} · {post.date}</div>
                      <p style={s.postExcerpt}>{post.excerpt?.slice(0, 120)}{post.excerpt?.length > 120 ? '…' : ''}</p>
                    </div>
                    <div style={s.postActions} data-card-actions>
                      <button onClick={() => openEdit(post)} style={s.editBtn}>
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => setConfirm(post.id)} style={s.delBtn}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── FORM VIEW ── */}
        {(mode === 'add' || mode === 'edit') && (
          <>
            <div style={s.pageHeader} data-admin-header>
              <div style={s.pageTitleGroup}>
                <div style={s.pageTitleIcon}>
                  <BookOpen size={22} color="#c9a96e" />
                </div>
                <div>
                  <h1 style={s.pageTitle}>{mode === 'add' ? 'New Blog Post' : 'Edit Post'}</h1>
                  <p style={s.pageSub}>Fill in the details below and click Save.</p>
                </div>
              </div>
              <button onClick={() => setMode('list')} style={s.ghostBtn}>
                <ArrowLeft size={16} /> Back to list
              </button>
            </div>

            <div style={s.formGrid} data-admin-grid>
              {/* Left — Main content */}
              <div style={s.formPanel} data-admin-card>
                <div style={s.panelLabel}>Post Content</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <Field label="Title *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Understanding Laparoscopic Surgery" />
                  <Field label="Excerpt *" name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary shown on blog card…" as="textarea" rows={3} />
                  <Field label="Full Content" name="content" value={form.content} onChange={handleChange} placeholder="Full article content…" as="textarea" rows={12} />
                </div>
              </div>

              {/* Right — Metadata + Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Post Details card */}
                <div style={s.formPanel} data-admin-card>
                  <div style={s.panelLabel}>Post Details</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <Field label="Category" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Laparoscopy" />
                    <Field label="Author" name="author" value={form.author} onChange={handleChange} placeholder="Dr. Suhas S Kumar" />
                    <Field label="Date" name="date" value={form.date} onChange={handleChange} placeholder="e.g. Oct 12, 2025" />
                  </div>
                </div>

                {/* Image card */}
                <div style={s.formPanel} data-admin-card>
                  <div style={s.panelLabel}>Post Image</div>
                  <Field label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />

                  <div style={s.orDivider}>
                    <div style={s.orLine} />
                    <span style={s.orText}>OR UPLOAD</span>
                    <div style={s.orLine} />
                  </div>

                  <label style={{ ...s.uploadLabel, opacity: uploading ? 0.7 : 1 }}>
                    <Upload size={16} />
                    {uploading ? 'Uploading to R2…' : 'Select File from Device'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
                  </label>

                  {form.image && (
                    <div style={{ marginTop: '1rem' }}>
                      <div style={s.previewLabel}>Preview</div>
                      <img
                        src={form.image}
                        alt="preview"
                        style={s.imgPreview}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                {/* Save / Delete actions */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleSave}
                    disabled={!form.title.trim() || !form.excerpt.trim()}
                    style={{ ...s.saveBtn, flex: 1, opacity: (!form.title.trim() || !form.excerpt.trim()) ? 0.5 : 1 }}
                  >
                    <Save size={16} /> Save Post
                  </button>
                  {mode === 'edit' && (
                    <button onClick={() => setConfirm(editId)} style={s.dangerBtn}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <label style={fs.label}>{label}</label>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          ...fs.input,
          resize: as === 'textarea' ? 'vertical' : undefined,
          minHeight: as === 'textarea' ? (rows ? rows * 22 + 18 : 80) : undefined,
        }}
      />
    </div>
  );
}

const fs = {
  label: { fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.03em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' },
  input: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', padding: '0.8rem 1rem',
    color: '#fff', fontSize: '0.92rem', outline: 'none', width: '100%', boxSizing: 'border-box',
    fontFamily: "'Inter', system-ui, sans-serif", transition: 'border-color 0.2s',
  },
};

const s = {
  page: { padding: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '1200px', margin: '0 auto', position: 'relative' },

  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
    background: 'linear-gradient(135deg,#10b981,#34d399)', color: '#fff',
    borderRadius: '12px', padding: '0.8rem 1.5rem',
    fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },

  overlay: {
    position: 'fixed', inset: 0, zIndex: 999,
    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  dialog: {
    background: '#13131f', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px', padding: '2.5rem 2rem', maxWidth: '360px', width: '90%', textAlign: 'center',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
  },
  dialogIconWrap: {
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
  },
  dialogTitle: { color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' },
  dialogDesc: { color: 'rgba(255,255,255,0.45)', fontSize: '0.87rem', margin: '0 0 1.75rem' },
  dialogBtns: { display: 'flex', gap: '0.75rem', justifyContent: 'center' },
  cancelBtn: {
    padding: '0.7rem 1.5rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.75)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
  },
  deleteBtn: {
    padding: '0.7rem 1.5rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.35)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700,
  },

  /* Page header */
  pageHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  pageTitleGroup: { display: 'flex', alignItems: 'center', gap: '1rem' },
  pageTitleIcon: {
    width: '48px', height: '48px', borderRadius: '14px',
    background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  pageTitle: { fontSize: '1.7rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' },
  pageSub: { color: 'rgba(255,255,255,0.4)', fontSize: '0.87rem', margin: '0.2rem 0 0' },

  /* Buttons */
  primaryBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  ghostBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.7rem 1.25rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.88rem',
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.9rem 1.5rem',
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
  },
  dangerBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0.9rem 1rem',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '12px', color: '#f87171', cursor: 'pointer',
  },
  editBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.55rem 1rem', borderRadius: '8px',
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    color: '#c9a96e', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
  },
  delBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.55rem 1rem', borderRadius: '8px',
    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
  },

  /* Post list */
  empty: {
    textAlign: 'center', padding: '5rem 2rem',
    background: 'rgba(255,255,255,0.02)', borderRadius: '20px',
    border: '1px dashed rgba(255,255,255,0.1)', display: 'flex',
    flexDirection: 'column', alignItems: 'center',
  },
  emptyIconWrap: {
    width: '80px', height: '80px', borderRadius: '20px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
  },
  emptyTitle: { color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 700, margin: 0 },
  emptyText:  { color: 'rgba(255,255,255,0.35)', fontSize: '0.87rem', marginTop: '0.4rem' },

  postList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  postCard: {
    display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '1.25rem',
    transition: 'border-color 0.2s',
  },
  postImageWrap: {
    width: '88px', height: '88px', borderRadius: '12px',
    overflow: 'hidden', flexShrink: 0,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  },
  postImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  postInfo: { flex: 1, minWidth: 0 },
  categoryBadge: {
    display: 'inline-block', background: 'rgba(201,169,110,0.12)',
    color: '#c9a96e', fontSize: '0.68rem', fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '0.2rem 0.65rem', borderRadius: '999px', marginBottom: '0.5rem',
  },
  postTitle: { color: '#fff', fontWeight: 700, fontSize: '0.97rem', lineHeight: 1.35, marginBottom: '0.3rem' },
  postMeta: { color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginBottom: '0.5rem' },
  postExcerpt: { color: 'rgba(255,255,255,0.45)', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 },
  postActions: { display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 },

  /* Form layout */
  formGrid: {
    display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start',
  },
  formPanel: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px', padding: '1.75rem',
  },
  panelLabel: {
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(201,169,110,0.85)',
    marginBottom: '1.25rem',
  },
  orDivider: { display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' },
  orLine:    { flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' },
  orText:    { color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' },
  uploadLabel: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.85rem 1rem', borderRadius: '10px',
    background: 'rgba(201,169,110,0.06)', border: '1.5px dashed rgba(201,169,110,0.35)',
    color: '#c9a96e', cursor: 'pointer', fontSize: '0.87rem', fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  previewLabel: {
    fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem',
  },
  imgPreview: {
    width: '100%', height: '160px', objectFit: 'cover',
    borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)',
  },
};
