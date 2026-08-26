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
        {/* Toast Notification */}
        {toast && <div style={styles.toast}>{toast}</div>}

        {/* Delete Confirmation Modal */}
        {confirm && (
          <div style={styles.overlay}>
            <div style={styles.dialog}>
              <div style={styles.dialogIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </div>
              <div style={styles.dialogTitle}>Delete this image?</div>
              <p style={styles.dialogDesc}>This action cannot be undone and will remove the item from the gallery.</p>
              <div style={styles.dialogBtns}>
                <button onClick={() => setConfirm(null)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={() => handleDelete(confirm)} style={styles.deleteBtn}>Delete Image</button>
              </div>
            </div>
          </div>
        )}

        {/* ── GRID LIST VIEW ────────────────────────────── */}
        {mode === 'list' && (
          <>
            <div style={styles.header}>
              <div>
                <h1 style={styles.heading}>Gallery Images</h1>
                <p style={styles.sub}>{images.length} images in clinic gallery</p>
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
                <div style={styles.emptyText}>No gallery images uploaded yet. Click "Add Image" to upload your first image!</div>
              </div>
            ) : (
              <div style={styles.imgGrid}>
                {images.map(img => (
                  <div key={img.id} style={styles.imgCard}>
                    <div style={styles.imgWrap}>
                      <img
                        src={img.src}
                        alt={img.title}
                        style={styles.img}
                        onError={e => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                        }}
                      />
                      
                      {/* Top-Right Quick Delete Icon */}
                      <button
                        onClick={() => setConfirm(img.id)}
                        title="Delete Image"
                        style={styles.quickDelBtn}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        </svg>
                      </button>

                      {/* Span badge */}
                      <div style={styles.spanBadge}>{img.span}</div>
                    </div>

                    <div style={styles.imgInfo}>
                      <div style={styles.imgTitle}>{img.title}</div>
                      <div style={styles.imgLabel}>{img.label}</div>

                      {/* Always Visible Action Bar */}
                      <div style={styles.cardActionsRow}>
                        <button onClick={() => openEdit(img)} style={styles.cardEditBtn}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </button>
                        <button onClick={() => setConfirm(img.id)} style={styles.cardDelBtn}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                          Delete
                        </button>
                      </div>
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
                <h1 style={styles.heading}>{mode === 'add' ? 'Add New Image' : 'Edit Image'}</h1>
                <p style={styles.sub}>Fill in the image details and click Save.</p>
              </div>
              <button onClick={() => setMode('list')} style={styles.backBtn}>
                ← Back to gallery
              </button>
            </div>

            <div style={styles.formGrid}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Title *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Operating Theatre" />
                <Field label="Sub-label" name="label" value={form.label} onChange={handleChange} placeholder="e.g. Advanced Surgery Unit" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={fieldStyles.label}>Grid Span</label>
                  <select name="span" value={form.span} onChange={handleChange} style={fieldStyles.input}>
                    {SPANS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <Field label="Image URL *" name="src" value={form.src} onChange={handleChange} placeholder="https://..." />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                    Or Upload File to Cloudflare R2
                  </label>
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.75rem 1rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(201,169,110,0.4)',
                    color: '#c9a96e', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    {uploading ? 'Uploading to R2...' : 'Select Image from Device'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
                  </label>
                </div>

                {form.src && (
                  <div>
                    <div style={styles.previewLabel}>Preview</div>
                    <img src={form.src} alt="preview" style={styles.imgPreview}
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={handleSave}
                    disabled={!form.src.trim() || !form.title.trim()}
                    style={{ ...styles.saveBtn, flex: 1, opacity: (!form.src.trim() || !form.title.trim()) ? 0.5 : 1 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save Image
                  </button>

                  {mode === 'edit' && (
                    <button
                      type="button"
                      onClick={() => setConfirm(editId)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                        padding: '0.85rem 1.25rem', borderRadius: '10px',
                        background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                        color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      </svg>
                      Delete Image
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
    borderRadius: '10px', padding: '0.75rem 1rem', color: '#fff',
    fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
  },
};

const styles = {
  page: { color: '#fff', width: '100%' },
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1100,
    background: '#c9a96e', color: '#0a0a0f', fontWeight: 700,
    padding: '0.75rem 1.5rem', borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)', fontSize: '0.9rem',
  },
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
  },
  dialog: {
    background: '#12121a', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px', padding: '2rem', maxWidth: '380px', width: '90%', textAlign: 'center',
  },
  dialogIcon: {
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
  },
  dialogTitle: { color: '#fff', fontSize: '1.1rem', fontWeight: 700 },
  dialogDesc: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0.5rem 0 1.5rem', lineHeight: 1.5 },
  dialogBtns: { display: 'flex', gap: '0.75rem', justifyContent: 'center' },
  cancelBtn: {
    padding: '0.65rem 1.25rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem',
  },
  deleteBtn: {
    padding: '0.65rem 1.25rem', borderRadius: '10px',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.25rem',
  },
  imgCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
  },
  imgWrap: { position: 'relative', height: '180px', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  quickDelBtn: {
    position: 'absolute', top: '0.6rem', right: '0.6rem', zIndex: 10,
    width: '32px', height: '32px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.85)', border: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  },
  spanBadge: {
    position: 'absolute', bottom: '0.6rem', left: '0.6rem', zIndex: 10,
    background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '999px', padding: '0.15rem 0.6rem',
    color: 'rgba(255,255,255,0.85)', fontSize: '0.65rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  imgInfo: { padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' },
  imgTitle: { color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem' },
  imgLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', flex: 1 },
  cardActionsRow: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  cardEditBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
    padding: '0.55rem 0.85rem', borderRadius: '8px',
    background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)',
    color: '#c9a96e', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
  },
  cardDelBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
    padding: '0.55rem 0.85rem', borderRadius: '8px',
    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#f87171', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
  },
  formGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem',
  },
  previewLabel: {
    fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.4rem',
  },
  imgPreview: {
    width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.85rem 1.25rem',
    background: 'linear-gradient(135deg, #c9a96e, #e0c080)',
    border: 'none', borderRadius: '10px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
  },
};
