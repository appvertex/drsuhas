import React from 'react';
import SEO from '../components/SEO';
import ServicesCategorized from '../components/ServicesCategorized';
import { PageWrapper } from '../components/common';
import { organizationSchema, physicianSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function ServicesPage() {
  return (
    <PageWrapper>
      <SEO
        title="Surgical Services & Treatments in Udupi"
        description="Comprehensive general and laparoscopic surgical treatments in Udupi by Dr. Suhas S Kumar. Keyhole hernia repair, gallbladder, thyroid, breast care, diabetic foot, and emergency surgeries."
        keywords="Laparoscopic Surgery Udupi, Hernia Repair Udupi, Gallbladder Surgery Udupi, Thyroid Surgery Udupi, Breast Surgery Udupi, Diabetic Foot Surgery Udupi, Surgical Services Udupi"
        pathname="/services"
        image="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80"
        schema={[organizationSchema, physicianSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Surgical Services', item: `${siteSettings.siteUrl}/services` }])]}
      />
      <div style={{ paddingTop: '20px' }}>
        <ServicesCategorized />
      </div>
    </PageWrapper>
  );
}
