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
        title="Surgical Services & Treatments in Bangalore"
        description="Comprehensive general and laparoscopic surgical treatments in Bangalore by Dr. Suhas S Kumar. Practicing at Deepak Hospital Jayanagar and Hemalatha Hospital Neelasandra. Keyhole hernia repair, gallbladder, thyroid, breast care, diabetic foot, and emergency surgeries."
        keywords="Laparoscopic Surgery Bangalore, Hernia Repair Bangalore, Gallbladder Surgery Bangalore, Thyroid Surgery Bangalore, Breast Surgery Bangalore, Diabetic Foot Surgery Bangalore, Surgical Services Bangalore, Surgeon Jayanagar, Surgeon Neelasandra"
        pathname="/services"
        image="https://www.surgeonsuhas.in/images/drsuhas.webp"
        schema={[organizationSchema, physicianSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Surgical Services', item: `${siteSettings.siteUrl}/services` }])]}
      />
      <div style={{ paddingTop: '20px' }}>
        <ServicesCategorized />
      </div>
    </PageWrapper>
  );
}
