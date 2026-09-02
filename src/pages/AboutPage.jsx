import React from 'react';
import SEO from '../components/SEO';
import DoctorDetailPage from '../components/DoctorDetailPage';
import { PageWrapper } from '../components/common';
import { personSchema, physicianSchema, organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function AboutPage() {
  return (
    <PageWrapper>
      <SEO
        title="About Dr. Suhas S Kumar – Senior Surgeon in Bangalore"
        description="Learn about Dr. Suhas S Kumar's medical qualifications (MBBS, MS, FMAS, FIAGES, FALS), 11+ years of experience, and laparoscopic surgery practice in Bangalore, Karnataka at Deepak Hospital Jayanagar and Hemalatha Hospital Neelasandra."
        keywords="Dr Suhas S Kumar, Surgeon in Bangalore, Laparoscopic Surgeon Bangalore qualifications, General Surgeon Bangalore profile, Deepak Hospital Jayanagar surgeon, Hemalatha Hospital Neelasandra surgeon"
        pathname="/about"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[physicianSchema, personSchema, organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'About Dr. Suhas', item: `${siteSettings.siteUrl}/about` }])]}
      />
      <div style={{ paddingTop: '80px' }}>
        <DoctorDetailPage />
      </div>
    </PageWrapper>
  );
}
