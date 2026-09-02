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
        title="Best General & Laparoscopic Surgeon in Bangalore, Karnataka"
        description="Dr. Suhas S Kumar is a leading General & Laparoscopic Surgeon in Bangalore, Karnataka. Practicing at Deepak Hospital Jayanagar and Hemalatha Hospital Neelasandra. Expert care for hernia, gallbladder, thyroid, breast surgery, and diabetic foot care."
        keywords="General Surgeon in Bangalore, Laparoscopic Surgeon in Bangalore, Hernia Surgery Bangalore, Gallbladder Surgery Bangalore, Appendix Surgery Bangalore, Breast Surgery Bangalore, Thyroid Surgery Bangalore, Diabetic Foot Care Bangalore, Surgeon Jayanagar, Surgeon Neelasandra, Deepak Hospital Jayanagar, Hemalatha Hospital Neelasandra"
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
