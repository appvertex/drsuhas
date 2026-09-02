import React from 'react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';

export default function DisclaimerPage() {
  return (
    <PageWrapper>
      <SEO
        title="Medical Disclaimer | Dr. Suhas S Kumar"
        description="Important medical disclaimer regarding online health content and surgical advice provided by Dr. Suhas S Kumar in Bangalore, Karnataka."
        pathname="/disclaimer"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Medical Disclaimer', item: `${siteSettings.siteUrl}/disclaimer` }
          ])
        ]}
      />
      <section className="section" style={{ paddingTop: 'clamp(6.5rem, 8vw, 7.5rem)', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Important Medical Notice</div>
          <h1 className="h-display" style={{ marginBottom: '2rem' }}>Medical Disclaimer</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Last updated: September 2026
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>1. Informational Purposes Only</h2>
            <p>
              The content published on this website—including articles, surgical descriptions, treatment guides, and FAQs—is provided for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>2. Doctor-Patient Relationship</h2>
            <p>
              Browsing this website or communicating with the clinic through electronic messages does not establish a formal doctor-patient relationship. A formal relationship is established only during in-person clinical examination and formal consultation.
            </p>

            <h2 className="h-3" style={{ color: 'var(--accent-gold)' }}>3. Surgical Outcomes</h2>
            <p>
              Surgical results, recovery timelines, and procedural outcomes vary between individual patients based on health status, underlying pathology, and compliance with post-operative guidance.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
