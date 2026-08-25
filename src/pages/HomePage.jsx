import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import Philosophy from '../components/Philosophy';
import AboutSection from '../components/AboutSection';
import SpecializationsFilmStrip from '../components/SpecializationsFilmStrip';
import Timeline from '../components/Timeline';
import FAQ from '../components/FAQ';
import GalleryComponent from '../components/Gallery';
import { PageWrapper } from '../components/common';
import { websiteSchema, organizationSchema, personSchema, faqSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function HomePage() {
  return (
    <PageWrapper>
      <SEO
        title="General & Laparoscopic Surgeon in Bengaluru"
        description="Dr. Suhas S Kumar provides premium general, laparoscopic, hernia, gallbladder, thyroid, breast, diabetic foot and emergency surgical care in Bengaluru."
        pathname="/"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[websiteSchema, organizationSchema, personSchema, faqSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }])]}
      />
      <Hero />
      <StatsCounter />
      <Philosophy />
      <AboutSection />
      <SpecializationsFilmStrip />
      <Timeline />
      <FAQ />
      <GalleryComponent />
    </PageWrapper>
  );
}
