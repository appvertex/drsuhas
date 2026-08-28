import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { getSiteSettings, getSiteSettingsAsync, saveSiteSettings, DEFAULT_SITE_SETTINGS } from '../../utils/adminStorage';
import { Settings, Save, RefreshCw, Award, Calendar, Phone, Mail, MessageSquare } from 'lucide-react';

export default function AdminSettings() {
  const [form, setForm] = useState(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    let mounted = true;
    setForm(getSiteSettings());
    setLoading(false);

    getSiteSettingsAsync().then((settings) => {
      if (mounted && settings) {
        setForm(settings);
      }
    });

    return () => { mounted = false; };
  }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
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
      showToast('✓ Site settings updated successfully!');
    } catch (err) {
      showToast('✕ Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    if (window.confirm('Reset settings to default values?')) {
      setForm(DEFAULT_SITE_SETTINGS);
    }
  }

  return (
    <AdminLayout currentTab="admin-settings">
      <div style={styles.container}>
        {/* Toast Notification */}
        {toast && (
          <div style={styles.toast}>
            <span>{toast}</span>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              <Settings size={28} style={{ color: '#c9a96e', marginRight: '0.75rem', verticalAlign: 'bottom' }} />
              Site Settings
            </h1>
            <p style={styles.subtitle}>
              Manage clinic contact details, WhatsApp integration numbers, statistics counters, and footer configuration.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Main Grid */}
        <div style={styles.grid}>
          
          {/* Settings Form */}
          <form onSubmit={handleSave} style={styles.formCard}>
            
            {/* Section 1: Contact Information & WhatsApp */}
            <div style={styles.sectionHeader}>
              <Phone size={20} style={{ color: '#c9a96e' }} />
              <h2 style={styles.sectionTitle}>Contact & WhatsApp Configuration</h2>
            </div>
            <p style={styles.sectionDesc}>
              Update clinic phone numbers, email address, and WhatsApp targets for appointment requests.
            </p>

            <div style={styles.fieldsGrid}>
              
              {/* Phone Number */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  <Phone size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                  Display Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 95387 65487"
                  style={styles.input}
                />
                <span style={styles.helpText}>Appears in header, footer & contact cards</span>
              </div>

              {/* Email Address */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  <Mail size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                  Clinic Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="suhassk2@gmail.com"
                  style={styles.input}
                />
                <span style={styles.helpText}>Appears in website contact cards & footer</span>
              </div>

              {/* Appointment WhatsApp Target Number */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  <MessageSquare size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                  Book Appointment Send WhatsApp No.
                </label>
                <input
                  type="text"
                  name="appointmentWhatsApp"
                  value={form.appointmentWhatsApp}
                  onChange={handleChange}
                  placeholder="919538765487"
                  style={styles.input}
                />
                <span style={styles.helpText}>Country code + number (e.g. 919538765487)</span>
              </div>

              {/* Floating WhatsApp Chat Number */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  <MessageSquare size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />
                  Floating WhatsApp Widget Number
                </label>
                <input
                  type="text"
                  name="floatingWhatsApp"
                  value={form.floatingWhatsApp}
                  onChange={handleChange}
                  placeholder="919538765487"
                  style={styles.input}
                />
                <span style={styles.helpText}>Used by bottom-right floating WhatsApp button</span>
              </div>

            </div>

            <div style={styles.divider} />

            {/* Section 2: Counter Statistics */}
            <div style={styles.sectionHeader}>
              <Award size={20} style={{ color: '#c9a96e' }} />
              <h2 style={styles.sectionTitle}>Practice Statistics Counters</h2>
            </div>
            <p style={styles.sectionDesc}>
              These metrics appear in the statistics section on the homepage and about page.
            </p>

            <div style={styles.fieldsGrid}>
              
              {/* Years of Experience */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Years of Experience
                </label>
                <div style={styles.inputFlex}>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={form.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="11"
                    style={styles.input}
                    min="0"
                  />
                  <input
                    type="text"
                    name="yearsSuffix"
                    value={form.yearsSuffix}
                    onChange={handleChange}
                    placeholder="+"
                    style={styles.suffixInput}
                  />
                </div>
                <span style={styles.helpText}>Display label: Years of Experience</span>
              </div>

              {/* Surgeries Performed */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Surgeries Performed
                </label>
                <div style={styles.inputFlex}>
                  <input
                    type="number"
                    name="surgeriesPerformed"
                    value={form.surgeriesPerformed}
                    onChange={handleChange}
                    placeholder="1000"
                    style={styles.input}
                    min="0"
                  />
                  <input
                    type="text"
                    name="surgeriesSuffix"
                    value={form.surgeriesSuffix}
                    onChange={handleChange}
                    placeholder="+"
                    style={styles.suffixInput}
                  />
                </div>
                <span style={styles.helpText}>Display label: Surgeries Performed</span>
              </div>

              {/* Patients Treated */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Patients Treated
                </label>
                <div style={styles.inputFlex}>
                  <input
                    type="number"
                    name="patientsTreated"
                    value={form.patientsTreated}
                    onChange={handleChange}
                    placeholder="2500"
                    style={styles.input}
                    min="0"
                  />
                  <input
                    type="text"
                    name="patientsSuffix"
                    value={form.patientsSuffix}
                    onChange={handleChange}
                    placeholder="+"
                    style={styles.suffixInput}
                  />
                </div>
                <span style={styles.helpText}>Display label: Patients Treated</span>
              </div>

              {/* Publications Authored */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Publications Authored
                </label>
                <div style={styles.inputFlex}>
                  <input
                    type="number"
                    name="publicationsAuthored"
                    value={form.publicationsAuthored}
                    onChange={handleChange}
                    placeholder="10"
                    style={styles.input}
                    min="0"
                  />
                  <input
                    type="text"
                    name="publicationsSuffix"
                    value={form.publicationsSuffix}
                    onChange={handleChange}
                    placeholder="+"
                    style={styles.suffixInput}
                  />
                </div>
                <span style={styles.helpText}>Display label: Publications Authored</span>
              </div>

            </div>

            <div style={styles.divider} />

            {/* Section 3: Footer Settings */}
            <div style={styles.sectionHeader}>
              <Calendar size={20} style={{ color: '#c9a96e' }} />
              <h2 style={styles.sectionTitle}>Footer Configuration</h2>
            </div>
            <p style={styles.sectionDesc}>
              Configure copyright details displayed in the footer across all pages.
            </p>

            <div style={styles.fieldGroupSingle}>
              <label style={styles.label}>Copyright Year</label>
              <input
                type="text"
                name="copyrightYear"
                value={form.copyrightYear}
                onChange={handleChange}
                placeholder="2026"
                style={styles.input}
              />
              <span style={styles.helpText}>Appears as: &copy; {form.copyrightYear || '2026'} Dr. Suhas S Kumar. All rights reserved.</span>
            </div>

            {/* Form Actions */}
            <div style={styles.formActions}>
              <button type="button" onClick={handleReset} style={styles.resetBtn}>
                Reset Defaults
              </button>
              <button type="submit" disabled={saving} style={styles.saveBtn}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>

          </form>

          {/* Live Preview Panel */}
          <div style={styles.previewCard}>
            <h3 style={styles.previewHeader}>Live Settings Preview</h3>
            <p style={styles.previewSub}>Real-time view of updated contact & counter configuration:</p>

            {/* Contact Details Preview */}
            <div style={{ ...styles.previewSection, marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 700, marginBottom: '0.75rem' }}>Contact Info</div>
              <div style={{ fontSize: '0.88rem', color: '#fff', marginBottom: '0.4rem' }}>
                📞 <strong>Phone:</strong> {form.phone || '+91 95387 65487'}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#fff', marginBottom: '0.4rem' }}>
                ✉️ <strong>Email:</strong> {form.email || 'suhassk2@gmail.com'}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#25D366' }}>
                💬 <strong>Appointment WhatsApp:</strong> {form.appointmentWhatsApp || '919538765487'}
              </div>
            </div>

            {/* Stats Counter Preview */}
            <div style={styles.previewStatsContainer}>
              <div style={styles.previewStatBox}>
                <div style={styles.previewStatVal}>
                  {Number(form.yearsOfExperience || 0).toLocaleString()}{form.yearsSuffix || '+'}
                </div>
                <div style={styles.previewStatLabel}>Years of Experience</div>
              </div>

              <div style={styles.previewStatBox}>
                <div style={styles.previewStatVal}>
                  {Number(form.surgeriesPerformed || 0).toLocaleString()}{form.surgeriesSuffix || '+'}
                </div>
                <div style={styles.previewStatLabel}>Surgeries Performed</div>
              </div>

              <div style={styles.previewStatBox}>
                <div style={styles.previewStatVal}>
                  {Number(form.patientsTreated || 0).toLocaleString()}{form.patientsSuffix || '+'}
                </div>
                <div style={styles.previewStatLabel}>Patients Treated</div>
              </div>

              <div style={styles.previewStatBox}>
                <div style={styles.previewStatVal}>
                  {Number(form.publicationsAuthored || 0).toLocaleString()}{form.publicationsSuffix || '+'}
                </div>
                <div style={styles.previewStatLabel}>Publications Authored</div>
              </div>
            </div>

            {/* Footer Copyright Preview */}
            <div style={styles.previewFooterBox}>
              <div style={styles.previewFooterText}>
                &copy; {form.copyrightYear || '2026'} Dr. Suhas S Kumar. All rights reserved.
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#fff',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '0.9rem',
    marginTop: '0.4rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '2rem',
    alignItems: 'start',
  },
  formCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '2rem',
    backdropFilter: 'blur(16px)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginBottom: '0.4rem',
  },
  sectionTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
  },
  sectionDesc: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '1.5rem',
  },
  fieldsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  fieldGroupSingle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    maxWidth: '300px',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.02em',
  },
  inputFlex: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  suffixInput: {
    width: '60px',
    padding: '0.75rem 0.5rem',
    textAlign: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: '#c9a96e',
    fontWeight: 700,
    fontSize: '0.95rem',
    outline: 'none',
  },
  helpText: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.4)',
  },
  divider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '2rem 0',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
  },
  saveBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #c9a96e 0%, #e0c080 100%)',
    color: '#0a0a0f',
    border: 'none',
    borderRadius: '12px',
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  resetBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.6)',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  previewCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(201,169,110,0.2)',
    borderRadius: '20px',
    padding: '1.75rem',
  },
  previewHeader: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#c9a96e',
    margin: 0,
  },
  previewSub: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '1.5rem',
  },
  previewSection: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem',
  },
  previewStatsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  previewStatBox: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '1.25rem 1rem',
    textAlign: 'center',
  },
  previewStatVal: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#c9a96e',
    lineHeight: 1.1,
  },
  previewStatLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.6)',
    marginTop: '0.35rem',
  },
  previewFooterBox: {
    background: 'rgba(0,0,0,0.3)',
    border: '1px dashed rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '1rem',
    textAlign: 'center',
  },
  previewFooterText: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.7)',
  },
  toast: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    background: '#10b981',
    color: '#fff',
    padding: '0.9rem 1.5rem',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '0.9rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
    zIndex: 9999,
  },
};
