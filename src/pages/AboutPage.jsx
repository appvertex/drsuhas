import React from 'react';
import SEO from '../components/SEO';
import DoctorDetailPage from '../components/DoctorDetailPage';
import { PageWrapper } from '../components/common';
import { personSchema, organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function AboutPage() {
  return (
    <PageWrapper>
      <SEO
        title="About Dr. Suhas S Kumar"
        description="Learn about Dr. Suhas S Kumar's training, surgical experience, qualifications, and clinical practice in Bengaluru."
        pathname="/about"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[personSchema, organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'About', item: `${siteSettings.siteUrl}/about` }])]}
      />
      <div style={{ paddingTop: '80px' }}>
        <DoctorDetailPage />
      </div>
    </PageWrapper>
  );
}
