import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import {
  getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage,
} from '../../utils/adminStorage';
import { uploadImageToR2 } from '../../utils/apiClient';
import { Image as ImageIcon, Plus, ArrowLeft, Pencil, Trash2, Save } from 'lucide-react';

const EMPTY = { src: '', title: '', label: '', span: 'normal' };
const SPANS = [
  { value: 'normal', label: 'Normal', icon: '◻' },
  { value: 'wide',   label: 'Wide',   icon: '▬' },
  { value: 'tall',   label: 'Tall',   icon: '▮' },
];

export default function AdminGallery() {
  const [images, setImages]       = useState(getGalleryImages);
  const [mode, setMode]           = useState('list');
  const [form, setForm]           = useState(EMPTY);
  const [editId, setEditId]       = useState(null);
  const [confirm, setConfirm]     = useState(null);
  const [toast, setToast]         = useState('');
  const [toastType, setToastType] = useState('success');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver]   = useState(false);

  function refresh() { setImages(getGalleryImages()); }

  function showToast(msg, type = 'success') {
    setToast(msg); setToastType(type);
    setTimeout(() => setToast(''), 3000);
  }

  async function handleFileUpload(file) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToR2(file);
      setForm(f => ({ ...f, src: url }));
      showToast('✓ Image uploaded to Cloudflare R2');
    } catch {
      showToast('✕ Upload failed — try again', 'error');
    } finally {
      setUploading(false);
    }
  }

  function onFileInput(e) { handleFileUpload(e.target.files?.[0]); }

  function onDrop(e) {
    e.preventDefault(); setDragOver(false);
    handleFileUpload(e.dataTransfer.files?.[0]);
  }

  function openAdd()      { setForm(EMPTY); setEditId(null); setMode('add'); }
  function openEdit(img)  { setForm({ ...img }); setEditId(img.id); setMode('edit'); }
  function closeForm()    { setMode('list'); }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave() {
    if (!form.src.trim() || !form.title.trim()) return;
    if (mode === 'add') {
      await addGalleryImage(form);
      showToast('✓ Image added to gallery');
    } else {
      await updateGalleryImage(editId, form);
      showToast('✓ Changes saved');
    }
    refresh(); setMode('list');
  }

  async function handleDelete(id) {
    await deleteGalleryImage(id);
    refresh(); setConfirm(null);
    showToast('Image deleted', 'error');
  }

  const isFormValid = form.src.trim() && form.title.trim();

  return (
    <AdminLayout>
      <div style={s.page} data-admin-page>

        {/* ── Toast ─────────────────────────────── */}
        {toast && (
          <div style={{ ...s.toast, ...(toastType === 'error' ? s.toastError : {}) }}>
            {toast}
          </div>
        )}

        {/* ── Delete Confirmation Modal ──────────── */}
        {confirm && (
          <div style={s.overlay} onClick={() => setConfirm(null)}>
            <div style={s.dialog} onClick={e => e.stopPropagation()}>
              <div style={s.dialogIconWrap}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </div>
              <h3 style={s.dialogTitle}>Delete image?</h3>
              <p style={s.dialogDesc}>This action is permanent and cannot be undone.</p>
              <div style={s.dialogBtns}>
                <button onClick={() => setConfirm(null)} style={s.btnGhost}>Cancel</button>
                <button onClick={() => handleDelete(confirm)} style={s.btnDanger}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Page Header ──────────────────────── */}
        <div style={s.header} data-admin-header>
          <div style={s.pageTitleGroup}>
            <div style={s.pageTitleIcon}>
              <ImageIcon size={22} color="#c9a96e" />
            </div>
            <div>
              <h1 style={s.pageTitle}>Gallery</h1>
              <p style={s.pageSub}>
                {mode === 'list'
                  ? `${images.length} image${images.length !== 1 ? 's' : ''} in the clinic gallery`
                  : mode === 'add' ? 'Upload a new image' : 'Edit image details'}
              </p>
            </div>
          </div>
          <div style={s.headerActions}>
            {mode === 'list' ? (
              <button onClick={openAdd} style={s.btnPrimary}>
                <Plus size={16} /> Add Image
              </button>
            ) : (
              <button onClick={closeForm} style={s.btnGhost}>
                <ArrowLeft size={16} /> Back to gallery
              </button>
            )}
          </div>
        </div>

        {/* ── GRID LIST VIEW ───────────────────── */}
        {mode === 'list' && (
          <>
            {images.length === 0 ? (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <p style={s.emptyTitle}>No images yet</p>
                <p style={s.emptyHint}>Click "Add Image" to upload your first gallery photo.</p>
                <button onClick={openAdd} style={{ ...s.btnPrimary, marginTop: '1.5rem' }}>
                  + Add First Image
                </button>
              </div>
            ) : (
              <div style={s.grid}>
                {images.map(img => (
                  <div key={img.id} style={s.card}>
                    {/* Image */}
                    <div style={s.imgWrap}>
                      <img
                        src={img.src} alt={img.title} style={s.img}
                        onError={e => { e.target.src = 'https://placehold.co/400x260/1a1a2e/555?text=No+Image'; }}
                      />
                      {/* Span badge */}
                      {img.span && img.span !== 'normal' && (
                        <span style={s.spanBadge}>{img.span}</span>
                      )}
                    </div>

                    {/* Name Bar */}
                    <div style={s.nameBar}>
                      <div style={s.nameBarMeta}>
                        <span style={s.nameBarTitle}>{img.title}</span>
                        {img.label && <span style={s.nameBarLabel}>{img.label}</span>}
                      </div>
                      <div style={s.nameBarActions}>
                        <button onClick={() => openEdit(img)} style={s.cardBtnEdit} title="Edit">
                          <Pencil size={13} /> Edit
                        </button>
                        <button onClick={() => setConfirm(img.id)} style={s.cardBtnDelete} title="Delete">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── ADD / EDIT FORM ──────────────────── */}
        {(mode === 'add' || mode === 'edit') && (
          <div style={s.formLayout}>
            {/* Left Column: Fields */}
            <div style={s.formLeft}>
              <div style={s.formSection}>
                <p style={s.formSectionLabel}>Image Details</p>

                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Title <span style={s.required}>*</span></label>
                  <input
                    name="title" value={form.title} onChange={handleChange}
                    placeholder="e.g. Operating Theatre"
                    style={s.input}
                  />
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Sub-label</label>
                  <input
                    name="label" value={form.label} onChange={handleChange}
                    placeholder="e.g. Advanced Surgery Unit"
                    style={s.input}
                  />
                </div>

                <div style={s.fieldGroup}>
                  <label style={s.fieldLabel}>Grid Span</label>
                  <div style={s.spanPicker}>
                    {SPANS.map(sp => (
                      <button
                        key={sp.value}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, span: sp.value }))}
                        style={{ ...s.spanOption, ...(form.span === sp.value ? s.spanOptionActive : {}) }}
                      >
                        <span style={s.spanIcon}>{sp.icon}</span>
                        <span>{sp.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save/Delete buttons */}
              <div style={s.formFooter}>
                <button
                  onClick={handleSave}
                  disabled={!isFormValid}
                  style={{ ...s.btnPrimary, flex: 1, opacity: isFormValid ? 1 : 0.45, cursor: isFormValid ? 'pointer' : 'not-allowed' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  {mode === 'add' ? 'Add to Gallery' : 'Save Changes'}
                </button>
                {mode === 'edit' && (
                  <button onClick={() => setConfirm(editId)} style={s.btnDangerOutline}>
                    Delete
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Upload + Preview */}
            <div style={s.formRight}>
              <p style={s.formSectionLabel}>Image Source</p>

              {/* URL input */}
              <div style={s.fieldGroup}>
                <label style={s.fieldLabel}>Image URL <span style={s.required}>*</span></label>
                <input
                  name="src" value={form.src} onChange={handleChange}
                  placeholder="https://..."
                  style={s.input}
                />
              </div>

              {/* Divider */}
              <div style={s.orDivider}>
                <span style={s.orLine}/><span style={s.orText}>OR</span><span style={s.orLine}/>
              </div>

              {/* Drop zone */}
              <label
                style={{ ...s.dropZone, ...(dragOver ? s.dropZoneActive : {}) }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                {uploading ? (
                  <div style={s.uploadingState}>
                    <div style={s.spinner}/>
                    <span>Uploading to R2…</span>
                  </div>
                ) : (
                  <>
                    <div style={s.uploadIconWrap}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <p style={s.dropTitle}>Drop image here or <span style={s.dropHighlight}>browse</span></p>
                    <p style={s.dropHint}>PNG, JPG, WEBP — uploaded to Cloudflare R2</p>
                  </>
                )}
                <input type="file" accept="image/*" onChange={onFileInput} disabled={uploading} style={{ display: 'none' }}/>
              </label>

              {/* Preview */}
              {form.src && (
                <div style={s.previewWrap}>
                  <p style={s.fieldLabel}>Preview</p>
                  <div style={s.previewImgWrap}>
                    <img
                      src={form.src} alt="preview" style={s.previewImg}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </AdminLayout>
  );
}

/* ── Styles ─────────────────────────────────────────────────── */
const s = {
  page: { color: '#fff', width: '100%', fontFamily: "'Inter', system-ui, sans-serif", padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxSizing: 'border-box' },

  /* Title group */
  pageTitleGroup: { display: 'flex', alignItems: 'center', gap: '1rem' },
  pageTitleIcon: {
    width: '48px', height: '48px', borderRadius: '14px',
    background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },

  /* Toast */
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000,
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    color: '#0a0a0f', fontWeight: 700, padding: '0.8rem 1.5rem',
    borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    fontSize: '0.9rem', animation: 'fadeIn 0.25s ease',
  },
  toastError: {
    background: 'linear-gradient(135deg,#ef4444,#f87171)',
    color: '#fff',
  },

  /* Modal */
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
  },
  dialog: {
    background: '#13131e', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px', padding: '2.25rem 2rem', maxWidth: '360px',
    width: '90%', textAlign: 'center', animation: 'fadeIn 0.2s ease',
  },
  dialogIconWrap: {
    width: '60px', height: '60px', borderRadius: '50%',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
  },
  dialogTitle: { color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: 0 },
  dialogDesc:  { color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', margin: '0.5rem 0 1.75rem', lineHeight: 1.6 },
  dialogBtns:  { display: 'flex', gap: '0.75rem', justifyContent: 'center' },

  /* Header */
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  pageTitle: { fontSize: '1.7rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' },
  pageSub:   { color: 'rgba(255,255,255,0.4)', fontSize: '0.87rem', margin: '0.2rem 0 0' },
  headerActions: { display: 'flex', gap: '0.75rem' },

  /* Buttons */
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  btnGhost: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500,
  },
  btnDanger: {
    padding: '0.7rem 1.5rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
  },
  btnDangerOutline: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '0.75rem 1.2rem', borderRadius: '12px',
    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
    color: '#f87171', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
  },

  /* Empty State */
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '5rem 2rem', background: 'rgba(255,255,255,0.02)',
    borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)',
    textAlign: 'center',
  },
  emptyIcon:  { marginBottom: '1.25rem' },
  emptyTitle: { color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 600, margin: 0 },
  emptyHint:  { color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', margin: '0.4rem 0 0' },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1.25rem',
  },

  /* Card */
  card: {
    display: 'flex', flexDirection: 'column',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '18px', overflow: 'hidden',
    transition: 'border-color 0.2s, transform 0.2s',
  },
  imgWrap: { position: 'relative', height: '185px', overflow: 'hidden', flexShrink: 0 },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  spanBadge: {
    position: 'absolute', top: '0.6rem', left: '0.6rem',
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px',
    padding: '0.15rem 0.6rem', fontSize: '0.65rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.85)',
  },

  /* Name Bar */
  nameBar: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 0.9rem',
    background: 'rgba(10,10,20,0.6)',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    flexWrap: 'wrap',
  },
  nameBarMeta: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1px' },
  nameBarTitle: {
    color: '#fff', fontWeight: 600, fontSize: '0.88rem',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  nameBarLabel: {
    color: 'rgba(255,255,255,0.38)', fontSize: '0.72rem',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  nameBarActions: { display: 'flex', gap: '0.4rem', flexShrink: 0 },
  cardBtnEdit: {
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    padding: '0.45rem 0.8rem', borderRadius: '8px',
    background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)',
    color: '#c9a96e', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  cardBtnDelete: {
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    padding: '0.45rem 0.8rem', borderRadius: '8px',
    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
    whiteSpace: 'nowrap',
  },

  /* Form Layout */
  formLayout: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
    gap: '2rem', alignItems: 'start',
  },
  formLeft:  { display: 'flex', flexDirection: 'column', gap: '1.75rem' },
  formRight: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  formSection: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  formSectionLabel: {
    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
    margin: 0,
  },
  formFooter: { display: 'flex', gap: '0.75rem', alignItems: 'center' },

  /* Fields */
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  fieldLabel: {
    fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
  },
  required: { color: '#c9a96e' },
  input: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '0.8rem 1rem', color: '#fff',
    fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', width: '100%',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  },

  /* Span Picker */
  spanPicker: { display: 'flex', gap: '0.5rem' },
  spanOption: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
    padding: '0.65rem 0.5rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.15s',
  },
  spanOptionActive: {
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.5)',
    color: '#c9a96e',
  },
  spanIcon: { fontSize: '1rem' },

  /* Divider */
  orDivider: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  orLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' },
  orText: { color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' },

  /* Drop Zone */
  dropZone: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '0.5rem', padding: '2rem 1.5rem', borderRadius: '14px',
    background: 'rgba(255,255,255,0.02)', border: '1.5px dashed rgba(201,169,110,0.3)',
    cursor: 'pointer', transition: 'border-color 0.15s, background 0.15s',
    textAlign: 'center',
  },
  dropZoneActive: {
    borderColor: 'rgba(201,169,110,0.7)', background: 'rgba(201,169,110,0.06)',
  },
  uploadIconWrap: {
    width: '52px', height: '52px', borderRadius: '14px',
    background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem',
  },
  dropTitle: { color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', margin: 0 },
  dropHighlight: { color: '#c9a96e', fontWeight: 600 },
  dropHint: { color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', margin: 0 },

  /* Upload loading */
  uploadingState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
    color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem',
  },
  spinner: {
    width: '28px', height: '28px', border: '3px solid rgba(201,169,110,0.2)',
    borderTopColor: '#c9a96e', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  /* Preview */
  previewWrap: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  previewImgWrap: {
    borderRadius: '12px', overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)', height: '175px',
  },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
};
