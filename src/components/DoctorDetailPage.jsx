import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import LuxuryCredentials from './LuxuryCredentials';
import { DoctorLocations } from './sections/DoctorLocations';
import { ParallaxCTA } from './sections/ParallaxCTA';
import { milestones } from '../data/content';

export default function DoctorDetailPage() {
  return (
    <>
      {/* Hero */}
      <section className="doctor-hero">
        <div className="doctor-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-eyebrow" style={{ marginBottom: '0.5rem' }}>Consultant General & Laparoscopic Surgeon</div>
            <h1 className="h-display" style={{ marginBottom: '0.75rem' }}>
              Dr. Suhas<br /><span className="text-gradient-gold">S Kumar</span>
            </h1>
            <p className="text-lead" style={{ maxWidth: '540px', marginBottom: '1rem' }}>
              MS (Gen Surg) - FIAGES - FALS - Dip Lap
            </p>
            <div className="doctor-hero-accent" aria-hidden="true" />
            <div className="doctor-hero-proof" aria-label="Professional highlights">
              <div>
                <strong>11+</strong>
                <span>Years of practice</span>
              </div>
              <div>
                <strong>1000+</strong>
                <span>Surgeries performed</span>
              </div>
              <div>
                <strong>FALS</strong>
                <span>Advanced laparoscopy</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="doctor-hero-portrait">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-doctor.png`}
            alt="Dr. Suhas S Kumar"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      {/* Credentials — Luxury Award Showcase */}
      <LuxuryCredentials />

      {/* Bio & Background */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <GraduationCap size={28} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
            <h3 className="h-3" style={{ marginBottom: '1.5rem' }}>Academic Background</h3>
            <p className="text-body" style={{ marginBottom: '1.5rem' }}>
              Dr. Suhas S. Kumar completed his MS in General Surgery and went on to serve as Assistant Professor in the Department of General Surgery at St. Johns Medical College Hospital, Bangalore - one of India's most prestigious medical institutions.
            </p>
            <p className="text-body">
              His time in academic medicine sharpened both his teaching abilities and his surgical precision, laying the foundation for a practice built on evidence-based care and continuous learning.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Briefcase size={28} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
            <h3 className="h-3" style={{ marginBottom: '1.5rem' }}>Clinical Practice</h3>
            <p className="text-body" style={{ marginBottom: '1.5rem' }}>
              With over 11 years of clinical experience and 1000+ surgeries performed, Dr. Suhas now practices at Deepak Hospital, offering a full range of general and advanced laparoscopic surgical services.
            </p>
            <p className="text-body">
              His specialisations span from laparoscopic cholecystectomy and hernia repair to thyroid surgery, breast oncology surgery, and comprehensive diabetic foot care - always with a patient-first approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Career Journey</div>
            <h2 className="h-2">A decade of <span className="text-gradient">surgical excellence</span></h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--border-subtle)' }} />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', position: 'relative' }}
              >
                {/* Dot */}
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'var(--bg-primary)', border: '2px solid var(--accent-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, zIndex: 1,
                  fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-gold)',
                  fontFamily: 'var(--font-display)', letterSpacing: '0.05em'
                }}>
                  {m.year}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {m.title}
                  </h4>
                  <p className="text-body" style={{ margin: 0 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <DoctorLocations />

      {/* Premium CTA Section */}
      <ParallaxCTA />
    </>
  );
}
