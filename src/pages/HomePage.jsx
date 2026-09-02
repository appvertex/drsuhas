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
import { websiteSchema, organizationSchema, personSchema, physicianSchema, faqSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function HomePage() {
  return (
    <PageWrapper>
      <SEO
        title="Best General & Laparoscopic Surgeon in Udupi, Karnataka"
        description="Dr. Suhas S Kumar is a leading General & Laparoscopic Surgeon in Udupi, Karnataka. Expert care for hernia, gallbladder, thyroid, breast surgery, and diabetic foot care."
        keywords="General Surgeon in Udupi, Laparoscopic Surgeon in Udupi, Hernia Surgery Udupi, Gallbladder Surgery Udupi, Appendix Surgery Udupi, Breast Surgery Udupi, Thyroid Surgery Udupi, Diabetic Foot Care Udupi"
        pathname="/"
        image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80"
        schema={[websiteSchema, organizationSchema, physicianSchema, personSchema, faqSchema, breadcrumbSchema([{ name: 'Home', item: `${siteSettings.siteUrl}/` }])]}
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
