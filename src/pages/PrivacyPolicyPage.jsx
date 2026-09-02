import React from 'react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <SEO
        title="Privacy Policy | Dr. Suhas S Kumar"
        description="Privacy policy and data protection practices for patients visiting Dr. Suhas S Kumar's surgical practice website in Bangalore, Karnataka."
        pathname="/privacy-policy"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Privacy Policy', item: `${siteSettings.siteUrl}/privacy-policy` }
          ])
        ]}
      />
      <section className="section" style={{ paddingTop: 'clamp(6.5rem, 8vw, 7.5rem)', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Patient Trust & Transparency</div>
          <h1 className="h-display" style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Last updated: September 2026
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>1. Information We Collect</h2>
            <p>
              When you use our website to book an appointment or send a clinical query, we may collect personal details such as your name, phone number, email address, preferred appointment date, and brief description of medical concerns provided voluntarily through our appointment form or WhatsApp link.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>2. How We Use Your Information</h2>
            <p>
              The information you provide is strictly used for scheduling consultations, communicating regarding surgical appointments, and offering medical guidance. We do not sell, rent, or lease patient contact details to third-party marketing companies.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>3. Confidentiality & Security</h2>
            <p>
              Medical data confidentiality is paramount. Direct communication via WhatsApp or phone is handled under clinical privacy protocols. However, please refrain from sending sensitive diagnostic reports through unencrypted web forms.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>4. Contact Us</h2>
            <p>
              For privacy inquiries or data requests, please contact Dr. Suhas S Kumar's clinic desk at <strong>{siteSettings.phone}</strong> or email <strong>{siteSettings.email}</strong>.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
