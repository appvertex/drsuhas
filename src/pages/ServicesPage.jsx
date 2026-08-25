import React from 'react';
import SEO from '../components/SEO';
import ServicesCategorized from '../components/ServicesCategorized';
import { PageWrapper } from '../components/common';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function ServicesPage() {
  return (
    <PageWrapper>
      <SEO
        title="Surgical Services"
        description="Explore general surgery, laparoscopic surgery, hernia repair, gallbladder surgery, thyroid surgery, varicose veins, piles, diabetic foot and emergency care."
        pathname="/services"
        image="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80"
        schema={[organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Services', item: `${siteSettings.siteUrl}/services` }])]}
      />
      <div style={{ paddingTop: '80px' }}>
        <ServicesCategorized />
      </div>
    </PageWrapper>
  );
}
