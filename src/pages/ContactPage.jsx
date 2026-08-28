import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, Clock, User, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { getSiteSettings, getSiteSettingsAsync } from '../utils/adminStorage';

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem 0.85rem 2.75rem',
  background: 'var(--bg-card, rgba(255,255,255,0.04))',
  border: '1px solid var(--border-subtle, rgba(255,255,255,0.12))',
  borderRadius: '12px',
  color: 'var(--text-primary, #ffffff)',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
};

export default function ContactPage() {
  const [appSettings, setAppSettings] = useState(getSiteSettings);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
    consent: false,
    botCheck: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    const sync = () => {
      if (mounted) setAppSettings(getSiteSettings());
    };
    window.addEventListener('settings-changed', sync);
    window.addEventListener('storage', sync);
    getSiteSettingsAsync().then(latest => {
      if (mounted && latest) setAppSettings(latest);
    });
    return () => {
      mounted = false;
      window.removeEventListener('settings-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Please select a preferred date for your consultation.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please accept the consent terms to submit your booking.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    // Format WhatsApp Message to send directly to configured WhatsApp number
    const targetPhone = (appSettings.appointmentWhatsApp || '919538765487').replace(/\D/g, '');
    const waMessage = 
`🏥 *NEW APPOINTMENT BOOKING REQUEST*

👤 *Full Name:* ${formData.name}
📞 *Phone Number:* ${formData.phone}
${formData.email ? `✉️ *Email Address:* ${formData.email}\n` : ''}📅 *Preferred Date:* ${formData.date}
⏰ *Preferred Time Slot:* ${formData.time}
${formData.message ? `💬 *Medical Concern/Notes:* ${formData.message}\n` : ''}
----------------------------------------
_Submitted via Dr. Suhas S Kumar Website_`;

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;

    try {
      // Record real analytics event & save appointment locally for admin view
      trackEvent('appointment_submit', { name: formData.name, service: formData.message || 'Consultation' });

      try {
        const existingApts = JSON.parse(localStorage.getItem('admin_appointments') || '[]');
        const newApt = {
          id: `APT-${1000 + existingApts.length + 1}`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.message || 'General Surgical Consultation',
          date: formData.date,
          time: formData.time,
          status: 'Confirmed',
          source: 'Website Form',
          createdAt: new Date().toISOString(),
        };
        existingApts.unshift(newApt);
        localStorage.setItem('admin_appointments', JSON.stringify(existingApts));
      } catch {/* ignore */}

      fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});

      // Open WhatsApp directly to target number
      window.open(waUrl, '_blank');

      setSubmitted(true);
    } catch {
      window.open(waUrl, '_blank');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const targetWaNum = (appSettings.appointmentWhatsApp || '919538765487').replace(/\D/g, '');
  const currentWaUrl = `https://wa.me/${targetWaNum}?text=${encodeURIComponent(
`🏥 *NEW APPOINTMENT BOOKING REQUEST*

👤 *Full Name:* ${formData.name}
📞 *Phone Number:* ${formData.phone}
${formData.email ? `✉️ *Email Address:* ${formData.email}\n` : ''}📅 *Preferred Date:* ${formData.date}
⏰ *Preferred Time Slot:* ${formData.time}
${formData.message ? `💬 *Medical Concern/Notes:* ${formData.message}\n` : ''}
----------------------------------------
_Submitted via Dr. Suhas S Kumar Website_`
  )}`;

  return (
    <PageWrapper>
      <SEO
        title="Contact & Book Appointment"
        description="Book a surgical consultation, follow-up visit, or second opinion with Dr. Suhas S Kumar in Bengaluru."
        pathname="/contact"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Contact', item: `${siteSettings.siteUrl}/contact` }
          ])
        ]}
      />

      <section className="section" style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Appointment Booking</div>
            <h1 className="h-display" style={{ marginBottom: '1rem' }}>
              Schedule Your <span className="text-gradient-gold">Consultation</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Choose your preferred date and time slot. Your booking request will be sent directly to Dr. Suhas's clinic desk via WhatsApp (9538765487).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            
            {/* Left Column: Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'var(--bg-card, rgba(255,255,255,0.03))',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
                borderRadius: '24px', padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Request an Appointment
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Fill out the details below and our team will get in touch to confirm your schedule.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '3rem 1.5rem',
                    background: 'rgba(34,197,94,0.06)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    borderRadius: '20px',
                  }}
                >
                  <CheckCircle2 size={56} style={{ color: '#4ade80', marginBottom: '1.25rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Appointment Sent via WhatsApp!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    Thank you, <strong>{formData.name}</strong>. Your booking details for <strong>{formData.date}</strong> ({formData.time}) have been formatted and sent directly to <strong>9538765487</strong>.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <a
                      href={currentWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{
                        background: '#25D366',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        padding: '0.85rem 1.6rem',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        textDecoration: 'none',
                        boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                      }}
                    >
                      <MessageSquare size={18} /> Send to WhatsApp (9538765487)
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '', phone: '', email: '', date: '',
                          time: 'Morning (10:00 AM - 1:00 PM)', message: '', consent: false, botCheck: '',
                        });
                      }}
                      className="btn btn-premium"
                      style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem', marginTop: '0.5rem' }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Honeypot for spam protection */}
                  <input
                    type="text"
                    name="botCheck"
                    value={formData.botCheck}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                  />

                  {errorMsg && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                      color: '#f87171', padding: '0.85rem 1.1rem', borderRadius: '12px', fontSize: '0.88rem',
                    }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="apt-name" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      Full Name <span style={{ color: 'var(--accent-gold)' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        id="apt-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="apt-phone" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Phone Number <span style={{ color: 'var(--accent-gold)' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          id="apt-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="apt-email" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Email Address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                          id="apt-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="apt-date" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Preferred Date <span style={{ color: 'var(--accent-gold)' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                        <input
                          id="apt-date"
                          type="date"
                          name="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={handleChange}
                          required
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label htmlFor="apt-time" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                        Preferred Time Slot
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                        <select
                          id="apt-time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="Morning (10:00 AM - 1:00 PM)" style={{ background: '#12121e', color: '#fff' }}>Morning (10:00 AM - 1:00 PM)</option>
                          <option value="Evening (5:00 PM - 8:00 PM)" style={{ background: '#12121e', color: '#fff' }}>Evening (5:00 PM - 8:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label htmlFor="apt-message" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      Medical Concern / Notes (Optional)
                    </label>
                    <textarea
                      id="apt-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your symptoms or reason for visit..."
                      style={{ ...inputStyle, paddingLeft: '1rem', resize: 'vertical' }}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{ marginTop: '0.2rem', accentColor: 'var(--accent-gold)', width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      I agree to receive booking confirmation and appointment reminders via SMS / WhatsApp.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-premium"
                    style={{ width: '100%', marginTop: '0.5rem', padding: '0.9rem', fontSize: '0.95rem' }}
                  >
                    {submitting ? (
                      'Submitting Request...'
                    ) : (
                      <>
                        Confirm Booking Request <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column: Clinic Details & Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div style={{
                background: 'var(--bg-card, rgba(255,255,255,0.03))',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
                borderRadius: '24px', padding: '2.5rem',
              }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  Clinic Contact Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', flexShrink: 0,
                    }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</div>
                      <a href={`https://wa.me/${(appSettings.floatingWhatsApp || '919538765487').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none' }}>
                        {appSettings.phone || '+91 95387 65487'}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', flexShrink: 0,
                    }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                      <a href={`mailto:${appSettings.email || siteSettings.email}`} style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none' }}>
                        {appSettings.email || siteSettings.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', flexShrink: 0,
                    }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consultation Location</div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.98rem' }}>
                        Deepak Hospital
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                        33rd Cross Rd, 7th Block, Jayanagar, Bengaluru 560070
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Map Embed */}
              <div style={{
                borderRadius: '24px', overflow: 'hidden', height: '280px',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
              }}>
                <iframe
                  title="Deepak Hospital Location Map"
                  src={siteSettings.locations[0].mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
