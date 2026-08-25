import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage,
} from '../../utils/adminStorage';
import { uploadImageToR2 } from '../../utils/apiClient';

const EMPTY = { src: '', title: '', label: '', span: 'normal' };
const SPANS = ['normal', 'wide', 'tall'];

export default function AdminGallery() {
  const [images, setImages]   = useState(getGalleryImages);
  const [mode, setMode]       = useState('list');     // 'list' | 'add' | 'edit'
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast]     = useState('');
  const [uploading, setUploading] = useState(false);

  function refresh() { setImages(getGalleryImages()); }

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
      setForm(f => ({ ...f, src: url }));
      showToast('Image uploaded to Cloudflare R2!');
    } catch (err) {
      showToast('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }

  function openAdd() { setForm(EMPTY); setEditId(null); setMode('add'); }
  function openEdit(img) { setForm({ ...img }); setEditId(img.id); setMode('edit'); }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    if (!form.src.trim() || !form.title.trim()) return;
    if (mode === 'add') {
      await addGalleryImage(form);
      showToast('Image added!');
    } else {
      await updateGalleryImage(editId, form);
      showToast('Image updated!');
    }
    refresh();
    setMode('list');
  }

  async function handleDelete(id) {
    await deleteGalleryImage(id);
    refresh();
    setConfirm(null);
    showToast('Image deleted.');
  }

  return (
    <AdminLayout>
      <div style={styles.page}>
        {/* Toast */}
        {toast && <div style={styles.toast}>{toast}</div>}

        {/* Confirm dialog */}
        {confirm && (
          <div style={styles.overlay}>
            <div style={styles.dialog}>
              <div style={styles.dialogIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                </svg>
              </div>
              <div style={styles.dialogTitle}>Delete this image?</div>
              <p style={styles.dialogDesc}>This action cannot be undone.</p>
              <div style={styles.dialogBtns}>
                <button onClick={() => setConfirm(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={() => handleDelete(confirm)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── GRID VIEW ─────────────────────────────── */}
        {mode === 'list' && (
          <>
            <div style={styles.header}>
              <div>
                <h1 style={styles.heading}>Gallery</h1>
                <p style={styles.sub}>{images.length} images in gallery</p>
              </div>
              <button onClick={openAdd} style={styles.addBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Image
              </button>
            </div>

            {images.length === 0 ? (
              <div style={styles.empty}>
                <div style={styles.emptyIcon}>🖼️</div>
                <div style={styles.emptyText}>No gallery images yet. Add your first one!</div>
              </div>
            ) : (
              <div style={styles.imgGrid}>
                {images.map(img => (
                  <div key={img.id} style={styles.imgCard}>
                    <div style={styles.imgWrap}>
                      <img src={img.src} alt={img.title} style={styles.img}
                        onError={e => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                        }} />
                      {/* Hover overlay with actions */}
                      <div style={styles.imgOverlay}>
                        <button onClick={() => openEdit(img)} style={styles.oBtn}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button onClick={() => setConfirm(img.id)} style={{ ...styles.oBtn, ...styles.oBtnRed }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                          Delete
                        </button>
                      </div>
                      {/* Span badge */}
                      <div style={styles.spanBadge}>{img.span}</div>
                    </div>
                    <div style={styles.imgInfo}>
                      <div style={styles.imgTitle}>{img.title}</div>
                      <div style={styles.imgLabel}>{img.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── FORM VIEW ────────────────────────────── */}
        {(mode === 'add' || mode === 'edit') && (
          <>
            <div style={styles.header}>
              <div>
                <h1 style={styles.heading}>{mode === 'add' ? 'Add New Image' : 'Edit Image'}</h1>
                <p style={styles.sub}>Fill in the details below and click Save.</p>
              </div>
              <button onClick={() => setMode('list')} style={styles.backBtn}>← Back to Gallery</button>
            </div>

            <div style={styles.formWrap}>
              <div style={styles.formLeft}>
                {/* Image preview */}
                <div style={styles.previewBox}>
                  {form.src ? (
                    <img src={form.src} alt="preview" style={styles.previewImg}
                      onError={e => { e.target.style.display = 'none'; }} />
                  ) : (
                    <div style={styles.previewPlaceholder}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>Image preview will appear here</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.formRight}>
                <Field label="Image URL *" name="src" value={form.src} onChange={handleChange}
                  placeholder="https://images.unsplash.com/..." />
                
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

                <Field label="Title *" name="title" value={form.title} onChange={handleChange}
                  placeholder="e.g. Advanced Operating Theatre" />
                <Field label="Label / Caption" name="label" value={form.label} onChange={handleChange}
                  placeholder="e.g. State-of-the-Art Surgical Suite" />

                {/* Span selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={fieldStyles.label}>Grid Span</label>
                  <div style={styles.spanBtns}>
                    {SPANS.map(s => (
                      <button
                        key={s}
                        onClick={() => setForm(f => ({ ...f, span: s }))}
                        style={{
                          ...styles.spanBtn,
                          ...(form.span === s ? styles.spanBtnActive : {}),
                        }}
                      >
                        {s === 'normal' ? '1×1 Normal' : s === 'wide' ? '2×1 Wide' : '1×2 Tall'}
                      </button>
                    ))}
                  </div>
                  <p style={styles.spanHint}>
                    Wide = spans 2 columns. Tall = spans 2 rows.
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={!form.src.trim() || !form.title.trim()}
                  style={{ ...styles.saveBtn, opacity: (!form.src.trim() || !form.title.trim()) ? 0.5 : 1 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Image
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={fieldStyles.label}>{label}</label>
      <input
        name={name} value={value} onChange={onChange} placeholder={placeholder}
        style={fieldStyles.input}
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
  },
};

const styles = {
  page: { padding: '2.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative' },
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
    borderRadius: '20px', padding: '2rem', maxWidth: '340px', width: '90%', textAlign: 'center',
  },
  dialogIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
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
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
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
  imgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  imgCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', overflow: 'hidden',
  },
  imgWrap: { position: 'relative', aspectRatio: '4/3', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' },
  imgOverlay: {
    position: 'absolute', inset: 0,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
    opacity: 0,
    transition: 'opacity 0.25s',
    // Note: hover handled by CSS class — we'll use onMouseEnter/onMouseLeave trick via inline
  },
  oBtn: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.5rem 0.9rem', borderRadius: '8px',
    background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.35)',
    color: '#c9a96e', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
  },
  oBtnRed: {
    background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#f87171',
  },
  spanBadge: {
    position: 'absolute', top: '0.5rem', right: '0.5rem',
    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '999px', padding: '0.15rem 0.55rem',
    color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  imgInfo: { padding: '0.85rem 1rem' },
  imgTitle: { color: '#fff', fontWeight: 600, fontSize: '0.85rem' },
  imgLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '0.2rem' },
  formWrap: {
    display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem',
    alignItems: 'start',
  },
  formLeft: {},
  formRight: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  previewBox: {
    borderRadius: '16px', overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    aspectRatio: '4/3',
  },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  previewPlaceholder: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100%', gap: '0.75rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem',
  },
  spanBtns: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  spanBtn: {
    padding: '0.5rem 1rem', borderRadius: '8px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.82rem',
    transition: 'background 0.15s, color 0.15s',
  },
  spanBtnActive: {
    background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.35)',
    color: '#c9a96e', fontWeight: 600,
  },
  spanHint: {
    color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', margin: 0, lineHeight: 1.4,
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.9rem',
    background: 'linear-gradient(135deg, #c9a96e, #e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
  },
};
