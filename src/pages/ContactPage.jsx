import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function ContactPage() {
  const whatsappMessage = 'Hello, I would like to book a consultation.';
  const whatsappLink = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  return (
    <PageWrapper>
      <SEO
        title="Contact & Appointments"
        description="Book a surgical consultation, follow-up visit, or second opinion with Dr. Suhas S Kumar in Bengaluru."
        pathname="/contact"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Contact', item: `${siteSettings.siteUrl}/contact` }])]}
      />
      <section className="section" style={{ paddingTop: '160px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Make an appointment</div>
            <h1 className="h-1" style={{ marginBottom: '1.5rem' }}>Book a consultation with <span className="text-gradient">confidence.</span></h1>
            <p className="text-lead" style={{ marginBottom: '3rem' }}>Appointments are available for surgical consultations, follow-up visits, and second opinions.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href={`tel:${siteSettings.phoneUrl}`} className="editorial-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                <div style={{ background: 'var(--border-subtle)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Call</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{siteSettings.phone}</div>
                </div>
              </a>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="editorial-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                <div style={{ background: 'var(--border-subtle)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>WhatsApp</div>
                  <div style={{ color: 'var(--text-secondary)' }}>Message instantly</div>
                </div>
              </a>

              <a href={`mailto:${siteSettings.email}`} className="editorial-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                <div style={{ background: 'var(--border-subtle)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{siteSettings.email}</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ height: '500px', borderRadius: '32px', overflow: 'hidden' }}>
            <iframe title="Clinic map" src={siteSettings.locations[0].mapSrc} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin allow-popups" />
          </motion.div>

        </div>
      </section>
    </PageWrapper>
  );
}
