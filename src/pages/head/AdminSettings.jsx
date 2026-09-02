import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getSiteSettings, getSiteSettingsAsync, saveSiteSettings, DEFAULT_SITE_SETTINGS } from '../../utils/adminStorage';
import { Settings, Save, RotateCcw, Award, Phone, Mail, MessageSquare, Lock, Calendar, Eye } from 'lucide-react';

export default function AdminSettings() {
  const [form, setForm]     = useState(DEFAULT_SITE_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState({ msg: '', ok: true });

  useEffect(() => {
    let mounted = true;
    setForm(getSiteSettings());
    getSiteSettingsAsync().then(s => { if (mounted && s) setForm(s); });
    return () => { mounted = false; };
  }, []);

  function showToast(msg, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast({ msg: '', ok: true }), 3500);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSiteSettings(form);
      showToast('✓ Settings saved successfully!', true);
    } catch {
      showToast('✕ Failed to save. Try again.', false);
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (window.confirm('Reset all settings to default values?')) {
      setForm(DEFAULT_SITE_SETTINGS);
    }
  }

  return (
    <AdminLayout>
      <div style={s.page} data-admin-page>

        {/* Toast */}
        {toast.msg && (
          <div style={{ ...s.toast, background: toast.ok ? 'linear-gradient(135deg,#10b981,#34d399)' : 'linear-gradient(135deg,#ef4444,#f87171)' }}>
            {toast.msg}
          </div>
        )}

        {/* Page Header */}
        <div style={s.pageHeader} data-admin-header>
          <div style={s.pageTitleGroup}>
            <div style={s.pageTitleIcon}>
              <Settings size={22} color="#c9a96e" />
            </div>
            <div>
              <h1 style={s.pageTitle}>Site Settings</h1>
              <p style={s.pageSub}>Manage clinic details, WhatsApp numbers, counters, and security.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} data-admin-actions>
            <button onClick={handleReset} style={s.ghostBtn} type="button">
              <RotateCcw size={15} /> Reset Defaults
            </button>
            <button onClick={handleSave} disabled={saving} style={{ ...s.saveBtn, opacity: saving ? 0.75 : 1 }}>
              <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Main Layout: 3-col sections + sidebar preview */}
        <form onSubmit={handleSave}>
          <div style={s.layout} data-admin-grid>

            {/* ── Left/Center: Settings cards ── */}
            <div style={s.settingsCol}>

              {/* Contact & WhatsApp */}
              <div style={s.card} data-admin-card>
                <div style={s.cardHeader}>
                  <div style={s.cardIconWrap}>
                    <Phone size={18} color="#c9a96e" />
                  </div>
                  <div>
                    <div style={s.cardTitle}>Contact & WhatsApp</div>
                    <div style={s.cardDesc}>Phone numbers, email, and WhatsApp targets</div>
                  </div>
                </div>
                <div style={s.fieldsGrid} data-admin-fields>
                  <InputField label="Display Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 95387 65487" hint="Appears in header, footer & contact cards" />
                  <InputField label="Clinic Email Address 1" name="email" value={form.email} onChange={handleChange} placeholder="suhassk2@gmail.com" type="email" hint="Primary email — appears in footer & contact card" />
                  <InputField label="Clinic Email Address 2" name="email2" value={form.email2 || ''} onChange={handleChange} placeholder="info@surgeonsuhas.in" type="email" hint="Secondary email — also shown in footer" />
                  <InputField label="Appointment WhatsApp No." name="appointmentWhatsApp" value={form.appointmentWhatsApp} onChange={handleChange} placeholder="919538765487" hint="Country code + number (no spaces or +)" />
                  <InputField label="Floating Widget WhatsApp No." name="floatingWhatsApp" value={form.floatingWhatsApp} onChange={handleChange} placeholder="919538765487" hint="Used by the bottom-right chat button" />
                </div>
              </div>

              {/* Practice Statistics */}
              <div style={s.card} data-admin-card>
                <div style={s.cardHeader}>
                  <div style={s.cardIconWrap}>
                    <Award size={18} color="#c9a96e" />
                  </div>
                  <div>
                    <div style={s.cardTitle}>Practice Statistics</div>
                    <div style={s.cardDesc}>Numbers shown on homepage & about page counters</div>
                  </div>
                </div>
                <div style={s.statsGrid} data-admin-fields>
                  <StatField label="Years of Experience" nameVal="yearsOfExperience" nameSuffix="yearsSuffix" form={form} onChange={handleChange} placeholder="11" />
                  <StatField label="Surgeries Performed"  nameVal="surgeriesPerformed" nameSuffix="surgeriesSuffix" form={form} onChange={handleChange} placeholder="1000" />
                  <StatField label="Patients Treated"     nameVal="patientsTreated"   nameSuffix="patientsSuffix"   form={form} onChange={handleChange} placeholder="2500" />
                  <StatField label="Publications Authored" nameVal="publicationsAuthored" nameSuffix="publicationsSuffix" form={form} onChange={handleChange} placeholder="10" />
                </div>
              </div>

              {/* Footer & Security */}
              <div style={s.card} data-admin-card>
                <div style={s.cardHeader}>
                  <div style={s.cardIconWrap}>
                    <Lock size={18} color="#c9a96e" />
                  </div>
                  <div>
                    <div style={s.cardTitle}>Footer & Security</div>
                    <div style={s.cardDesc}>Copyright year and Admin Portal login password</div>
                  </div>
                </div>
                <div style={s.fieldsGrid} data-admin-fields>
                  <InputField label="Copyright Year" name="copyrightYear" value={form.copyrightYear} onChange={handleChange} placeholder="2026" hint={`Displays as: © ${form.copyrightYear || '2026'} Dr. Suhas S Kumar. All rights reserved.`} />
                  <InputField label="Admin Portal Password" name="adminPassword" value={form.adminPassword || ''} onChange={handleChange} placeholder="admin123" hint="Used to log into /head/admin/login" />
                </div>
              </div>

            </div>

            {/* ── Right: Live Preview sidebar ── */}
            <div style={s.previewCol} data-admin-preview>
              <div style={s.previewCard}>
                <div style={s.previewTitleRow}>
                  <Eye size={16} color="#c9a96e" />
                  <span style={s.previewTitle}>Live Preview</span>
                </div>
                <p style={s.previewSub}>Updates as you type</p>

                {/* Contact Info */}
                <div style={s.previewSection}>
                  <div style={s.previewSectionLabel}>Contact</div>
                  <div style={s.previewRow}>📞 <span>{form.phone || '+91 95387 65487'}</span></div>
                  <div style={s.previewRow}>✉️ <span>{form.email || 'suhassk2@gmail.com'}</span></div>
                  {form.email2 && <div style={s.previewRow}>✉️ <span>{form.email2}</span></div>}
                  <div style={{ ...s.previewRow, color: '#25D366' }}>💬 <span>{form.appointmentWhatsApp || '919538765487'}</span></div>
                </div>

                {/* Stats */}
                <div style={s.previewSection}>
                  <div style={s.previewSectionLabel}>Statistics</div>
                  <div style={s.statsPreviewGrid}>
                    {[
                      { val: form.yearsOfExperience, suffix: form.yearsSuffix, label: 'Yrs Experience' },
                      { val: form.surgeriesPerformed, suffix: form.surgeriesSuffix, label: 'Surgeries' },
                      { val: form.patientsTreated, suffix: form.patientsSuffix, label: 'Patients' },
                      { val: form.publicationsAuthored, suffix: form.publicationsSuffix, label: 'Publications' },
                    ].map((stat, i) => (
                      <div key={i} style={s.statPreviewBox}>
                        <div style={s.statPreviewVal}>{Number(stat.val || 0).toLocaleString()}{stat.suffix || '+'}</div>
                        <div style={s.statPreviewLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={s.previewFooter}>
                  <div style={s.previewFooterText}>© {form.copyrightYear || '2026'} Dr. Suhas S Kumar</div>
                  <div style={s.previewFooterSub}>All rights reserved.</div>
                </div>
              </div>

              {/* Save shortcut inside sidebar too */}
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ ...s.saveBtn, width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: saving ? 0.75 : 1 }}
                type="button"
              >
                <Save size={16} /> {saving ? 'Saving…' : 'Save All Settings'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function InputField({ label, name, value, onChange, placeholder, hint, type = 'text' }) {
  return (
    <div style={f.group}>
      <label style={f.label}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={f.input} />
      {hint && <span style={f.hint}>{hint}</span>}
    </div>
  );
}

function StatField({ label, nameVal, nameSuffix, form, onChange, placeholder }) {
  return (
    <div style={f.group}>
      <label style={f.label}>{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input type="number" name={nameVal} value={form[nameVal]} onChange={onChange} placeholder={placeholder} style={{ ...f.input, flex: 1 }} min="0" />
        <input type="text" name={nameSuffix} value={form[nameSuffix]} onChange={onChange} placeholder="+" style={f.suffixInput} />
      </div>
    </div>
  );
}

const f = {
  group: { display: 'flex', flexDirection: 'column', gap: '0.45rem' },
  label: { fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.03em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' },
  input: {
    padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#fff', fontSize: '0.92rem', outline: 'none',
    boxSizing: 'border-box', fontFamily: "'Inter', system-ui, sans-serif", transition: 'border-color 0.2s',
    width: '100%',
  },
  suffixInput: {
    width: '64px', padding: '0.8rem 0.5rem', textAlign: 'center',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: '#c9a96e', fontWeight: 700, fontSize: '0.92rem', outline: 'none',
    flexShrink: 0,
  },
  hint: { fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4 },
};

const s = {
  page: { padding: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '1300px', margin: '0 auto', position: 'relative' },

  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
    color: '#fff', borderRadius: '12px', padding: '0.8rem 1.5rem',
    fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },

  /* Header */
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
  pageSub:   { color: 'rgba(255,255,255,0.4)', fontSize: '0.87rem', margin: '0.2rem 0 0' },

  /* Buttons */
  saveBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
  },
  ghostBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', fontSize: '0.88rem',
  },

  /* Main layout */
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '1.5rem',
    alignItems: 'start',
  },
  settingsCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },

  /* Cards */
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', padding: '1.75rem',
  },
  cardHeader: {
    display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1.5rem',
  },
  cardIconWrap: {
    width: '40px', height: '40px', borderRadius: '11px',
    background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  cardTitle: { fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' },
  cardDesc:  { fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' },

  /* Field grids inside cards */
  fieldsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
  statsGrid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },

  /* Preview sidebar */
  previewCol: { position: 'sticky', top: '1.5rem' },
  previewCard: {
    background: 'rgba(15,15,26,0.8)', border: '1px solid rgba(201,169,110,0.2)',
    borderRadius: '20px', padding: '1.5rem',
  },
  previewTitleRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' },
  previewTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#c9a96e' },
  previewSub:   { fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' },

  previewSection: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px', padding: '1rem', marginBottom: '1rem',
  },
  previewSectionLabel: {
    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(201,169,110,0.8)', marginBottom: '0.65rem',
  },
  previewRow: {
    fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
    marginBottom: '0.35rem', display: 'flex', gap: '0.4rem',
  },

  statsPreviewGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' },
  statPreviewBox: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px', padding: '0.75rem 0.5rem', textAlign: 'center',
  },
  statPreviewVal:   { fontSize: '1.2rem', fontWeight: 800, color: '#c9a96e', lineHeight: 1.1 },
  statPreviewLabel: { fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem' },

  previewFooter: {
    background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,255,255,0.12)',
    borderRadius: '10px', padding: '0.85rem', textAlign: 'center',
  },
  previewFooterText: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 },
  previewFooterSub:  { fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' },
};
