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
        title="Clinic Gallery"
        description="Explore the clinic environment, consultation spaces, and surgical care visuals from Dr. Suhas S Kumar's practice."
        pathname="/gallery"
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
        schema={[organizationSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }, { name: 'Gallery', item: `${siteSettings.siteUrl}/gallery` }])]}
      />
      <GalleryComponent />
    </PageWrapper>
  );
}
