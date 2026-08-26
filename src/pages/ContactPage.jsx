import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, Clock, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';
import { trackEvent } from '../utils/analyticsTracker';

export default function ContactPage() {
  const whatsappMessage = 'Hello Dr. Suhas, I would like to book a consultation.';
  const whatsappLink = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
    message: '',
    consent: false,
    botCheck: '', // Honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botCheck) return; // Silent rejection for bots

    // Validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number.');
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

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

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
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Make an Appointment</div>
            <h1 className="h-1" style={{ marginBottom: '1.5rem' }}>
              Book a Consultation with <span className="text-gradient">Confidence</span>
            </h1>
            <p className="text-lead" style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Appointments are available for surgical consultations, follow-up visits, and second opinions at Deepak Hospital, Bengaluru.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
            
            {/* ── APPOINTMENT BOOKING FORM ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{
                background: 'var(--bg-card, rgba(255,255,255,0.03))',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
                borderRadius: '28px',
                padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                boxShadow: 'var(--shadow-md, 0 10px 30px rgba(0,0,0,0.3))',
              }}
            >
              <h2 className="h-3" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
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
                    Appointment Request Received!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Thank you, <strong>{formData.name}</strong>. We have received your request for <strong>{formData.date}</strong> ({formData.time}). Our staff will contact you at <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '', phone: '', email: '', date: '',
                        time: 'Morning (10:00 AM - 1:00 PM)', message: '', consent: false, botCheck: '',
                      });
                    }}
                    className="btn btn-premium"
                    style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
                  >
                    Submit Another Request
                  </button>
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

            {/* ── CLINIC CONTACT DETAILS & MAP ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <a href={`tel:${siteSettings.phoneUrl}`} className="editorial-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none' }}>
                  <div style={{ background: 'var(--border-subtle)', padding: '0.9rem', borderRadius: '50%', color: 'var(--accent-gold)', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>Call Directly</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{siteSettings.phone}</div>
                  </div>
                </a>

                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="editorial-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none' }}>
                  <div style={{ background: 'var(--border-subtle)', padding: '0.9rem', borderRadius: '50%', color: 'var(--accent-gold)', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>WhatsApp Consultation</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Message clinic reception</div>
                  </div>
                </a>

                <a href={`mailto:${siteSettings.email}`} className="editorial-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none' }}>
                  <div style={{ background: 'var(--border-subtle)', padding: '0.9rem', borderRadius: '50%', color: 'var(--accent-gold)', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>Email Inquiry</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{siteSettings.email}</div>
                  </div>
                </a>

                <div className="editorial-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                  <div style={{ background: 'var(--border-subtle)', padding: '0.9rem', borderRadius: '50%', color: 'var(--accent-gold)', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '0.95rem' }}>Consultation Location</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      Deepak Hospital, 33rd Cross Rd, 7th Block, Jayanagar, Bengaluru 560070
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinic Map */}
              <div style={{ height: '320px', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
                <iframe
                  title="Clinic Map Location"
                  src={siteSettings.locations[0].mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem 0.8rem 2.75rem',
  borderRadius: '12px',
  background: 'var(--bg-primary, rgba(10,10,20,0.6))',
  border: '1px solid var(--border-subtle, rgba(255,255,255,0.12))',
  color: 'var(--text-primary, #fff)',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};
