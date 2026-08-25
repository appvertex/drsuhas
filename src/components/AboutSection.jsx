import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ─── keyword data ─── */
const KEYWORDS = [
  {
    id: 'laparoscopy',
    label: 'advanced laparoscopy',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=480&q=80',
    caption: 'Minimally Invasive Precision',
  },
  {
    id: 'experience',
    label: '11+ years',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=480&q=80',
    caption: 'A Decade of Excellence',
  },
  {
    id: 'patient-care',
    label: 'patient well-being',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=480&q=80',
    caption: 'Compassion at Every Step',
  },
  {
    id: 'recovery',
    label: 'rapid recovery',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=480&q=80',
    caption: 'Back to Life, Faster',
  },
];

/* ─── styles ─── */
const styles = {
  section: {
    backgroundColor: 'var(--bg-secondary)',
    overflow: 'hidden',
    position: 'relative',
  },
  innerWrap: {
    maxWidth: '860px',
    marginInline: 'auto',
    position: 'relative',
  },
  eyebrow: { marginBottom: '1rem' },
  heading: { marginBottom: '2.5rem' },
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    marginBottom: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  paragraph: {
    fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
    lineHeight: 1.85,
    color: 'var(--text-secondary)',
    fontWeight: 400,
  },
  keyword: {
    color: 'var(--accent-gold)',
    fontWeight: 600,
    cursor: 'default',
    position: 'relative',
    display: 'inline',
    borderBottom: '1px dashed rgba(242, 227, 198, 0.3)',
    transition: 'border-color 0.3s ease',
  },
  floatingCard: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    width: '220px',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 40px rgba(242,227,198,0.08)',
  },
  floatingImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    display: 'block',
  },
  floatingCaption: {
    padding: '0.75rem 1rem',
    background: 'var(--bg-primary)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.03em',
  },
  /* mobile inline reveal */
  mobileReveal: {
    marginTop: '0.75rem',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
  },
  mobileRevealImg: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
    display: 'block',
  },
  mobileRevealCaption: {
    padding: '0.6rem 0.85rem',
    background: 'var(--bg-primary)',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--accent-gold)',
    fontFamily: 'var(--font-display)',
  },
  decorLine: {
    position: 'absolute',
    top: 0,
    left: '-40px',
    width: '2px',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 0%, var(--accent-gold) 30%, var(--accent-gold) 70%, transparent 100%)',
    opacity: 0.15,
  },
};

/* ─── Keyword Span (Desktop: hover, Mobile: tap) ─── */
function KeywordSpan({ kw, onEnter, onLeave, isMobile }) {
  const [showMobile, setShowMobile] = useState(false);

  const handleClick = () => {
    if (isMobile) setShowMobile((prev) => !prev);
  };

  return (
    <>
      <span
        style={{
          ...styles.keyword,
          ...(isMobile && { cursor: 'pointer' }),
        }}
        onMouseEnter={() => !isMobile && onEnter(kw)}
        onMouseLeave={() => !isMobile && onLeave()}
        onClick={handleClick}
      >
        {kw.label}
      </span>

      {/* Mobile: inline image reveal */}
      {isMobile && (
        <AnimatePresence>
          {showMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-strong)', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}
            >
              <img src={kw.image} alt={kw.caption} loading="lazy" style={styles.mobileRevealImg} />
              <div style={styles.mobileRevealCaption}>{kw.caption}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

/* ─── Main Component ─── */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [activeKw, setActiveKw] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleEnter = useCallback((kw) => setActiveKw(kw), []);
  const handleLeave = useCallback(() => setActiveKw(null), []);

  /* helpers to render paragraphs with interactive keywords */
  const K = (id) => {
    const kw = KEYWORDS.find((k) => k.id === id);
    return (
      <KeywordSpan
        key={id}
        kw={kw}
        onEnter={handleEnter}
        onLeave={handleLeave}
        isMobile={isMobile}
      />
    );
  };

  /* stagger children */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      className="section"
      style={styles.section}
      onMouseMove={handleMouseMove}
      ref={sectionRef}
      id="about-section"
    >
      <div className="container">
        <motion.div
          style={styles.innerWrap}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Decorative left line */}
          <div style={styles.decorLine} className="hide-mobile" />

          {/* Eyebrow */}
          <motion.div variants={childVariants} className="text-eyebrow" style={styles.eyebrow}>
            Meet the Surgeon
          </motion.div>

          {/* Heading */}
          <motion.h2 variants={childVariants} className="h-2" style={styles.heading}>
            Dr. Suhas S Kumar
          </motion.h2>

          {/* Text blocks with interactive keywords */}
          <motion.div variants={childVariants} style={styles.textBlock}>
            <p style={styles.paragraph}>
              Dedicated to advancing the field of minimally invasive surgery through precision,
              innovation, and an unwavering commitment to {K('patient-care')}. With over{' '}
              {K('experience')} of intensive clinical practice, Dr. Suhas brings a rare
              blend of technical mastery and genuine compassion to every consultation.
            </p>

            <p style={styles.paragraph}>
              Specializing in {K('laparoscopy')} and complex gastrointestinal
              procedures, he consistently delivers outcomes that prioritize safety, clarity, and{' '}
              {K('recovery')}. Every treatment plan is uniquely tailored
              to the individual — because no two patients are alike.
            </p>

            <p style={styles.paragraph}>
              His philosophy is simple: surgery should not just treat a condition, but restore a
              patient's quality of life with the least amount of physical and emotional stress
              possible.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={childVariants}>
            <Link
              to="/about"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              View Full Profile <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Floating cursor-following card (desktop only) ─── */}
      <AnimatePresence>
        {activeKw && !isMobile && (
          <motion.div
            key={activeKw.id}
            style={{
              ...styles.floatingCard,
              left: mousePos.x + 20,
              top: mousePos.y - 100,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <img src={activeKw.image} alt={activeKw.caption} loading="lazy" style={styles.floatingImage} />
            <div style={styles.floatingCaption}>{activeKw.caption}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
