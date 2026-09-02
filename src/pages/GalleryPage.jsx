import React from 'react';
import SEO from '../components/SEO';
import GalleryComponent from '../components/Gallery';
import { PageWrapper } from '../components/common';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function GalleryPage() {
  return (
    <PageWrapper>
      <SEO
        title="Medical & Surgical Gallery | Dr. Suhas S Kumar Udupi"
        description="View clinical consultation rooms, laparoscopic surgical setups, and hospital infrastructure at Dr. Suhas S Kumar's practice in Udupi, Karnataka."
        keywords="Clinic Gallery Udupi, Surgical Facility Udupi, Dr Suhas S Kumar clinic photos, Operating theatre Udupi"
        pathname="/gallery"
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
        schema={[organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Gallery', item: `${siteSettings.siteUrl}/gallery` }])]}
      />
      <GalleryComponent isStandalone={true} />
    </PageWrapper>
  );
}
