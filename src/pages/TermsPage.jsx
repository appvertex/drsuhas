import React from 'react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';

export default function TermsPage() {
  return (
    <PageWrapper>
      <SEO
        title="Terms & Conditions | Dr. Suhas S Kumar"
        description="Terms and conditions for utilizing website appointment features and information provided by Dr. Suhas S Kumar in Bangalore, Karnataka."
        pathname="/terms-and-conditions"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Terms & Conditions', item: `${siteSettings.siteUrl}/terms-and-conditions` }
          ])
        ]}
      />
      <section className="section" style={{ paddingTop: 'clamp(6.5rem, 8vw, 7.5rem)', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Patient Guidelines</div>
          <h1 className="h-display" style={{ marginBottom: '2rem' }}>Terms & Conditions</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Last updated: September 2026
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use this site.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>2. Appointment Scheduling</h2>
            <p>
              Submitting an appointment request through the website or WhatsApp does not constitute a guaranteed clinical slot until confirmed directly by Dr. Suhas S Kumar's clinic staff.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>3. Emergency Situations</h2>
            <p>
              This website and online messaging are not designed for life-threatening acute medical emergencies. If you experience severe trauma or critical distress, please visit the emergency casualty room at Deepak Hospital Jayanagar, Hemalatha Hospital Neelasandra, or the nearest trauma center immediately.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>4. Intellectual Property</h2>
            <p>
              All surgical guides, medical articles, graphics, logos, and site branding belong to Dr. Suhas S Kumar and may not be reproduced without written permission.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
