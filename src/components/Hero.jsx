import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTheme } from '../hooks';

// ─── Shared easing curve used across every element for visual cohesion ────────
const EASE = [0.22, 0.58, 0.32, 1.0];

// ─── Individual item variant — used directly on motion elements ───────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
};

// ─── Stagger container — delays children relative to each other ───────────────
// delayChildren: 0.35 → first text item starts after the image is clearly visible
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.35,
    },
  },
};

const heroImageLight = `${import.meta.env.BASE_URL}images/hero-doctor.jpg`;
const heroImageDark  = `${import.meta.env.BASE_URL}images/hero-doctor-dark.jpg`;

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const heroImage = isDark ? heroImageDark : heroImageLight;

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* ── Background layer (z-index 0) ─────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>

        {/* Hex grid pattern — fades in softly with the rest of the hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.08 : 0.07 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: '55%',
            pointerEvents: 'none',
            backgroundImage: isDark
              ? `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 104L30 87L0 104V70L30 53L60 70V104ZM30 51L0 34V0L30 17L60 0V34L30 51Z' fill='%23FFFFFF' fill-opacity='0.3' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`
              : `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 104L30 87L0 104V70L30 53L60 70V104ZM30 51L0 34V0L30 17L60 0V34L30 51Z' fill='%232D6BFF' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Doctor image wrapper — animates as ONE unit so the ::before
            blend-overlay never flashes ahead of the image underneath it. */}
        <motion.div
          key={heroImage}
          className="hero-img-wrapper"
          style={{ width: '100%', height: '100%', '--hero-image': `url(${heroImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Scale-only reveal on the img — opacity handled by the parent */}
          <motion.img
            key={heroImage}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.0, ease: EASE }}
            src={heroImage}
            alt="Dr. Suhas S Kumar - Consultant General &amp; Laparoscopic Surgeon"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 0%' }}
          />
        </motion.div>

      </div>

      {/* ── Text content (z-index 10) ─────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '80px' }}>
        <motion.div
          style={{ maxWidth: '700px' }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <div className="text-eyebrow" style={{ marginBottom: '1.5rem' }}>
              Dr. Suhas S Kumar &mdash; Consultant Surgeon
            </div>
          </motion.div>

          <motion.h1
            className="h-display"
            style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}
            variants={fadeUp}
          >
            Surgical precision.<br />
            <span className="text-gradient-navy">Human compassion.</span>
          </motion.h1>

          <motion.p
            className="text-lead"
            style={{ marginBottom: '3rem', maxWidth: '540px', color: 'var(--text-secondary)' }}
            variants={fadeUp}
          >
            A premium surgical experience shaped by advanced laparoscopy, calm confidence, and a deeply personal approach to your care and recovery.
          </motion.p>

          <motion.div
            className="hero-cta-row"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}
            variants={fadeUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="btn btn-primary">
                Book Consultation <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/services" className="btn btn-secondary">
                Explore Specialties
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
