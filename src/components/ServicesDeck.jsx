import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── Services Data ─── */
const services = [
  {
    slug: 'laparoscopic-surgery',
    num: '01',
    title: 'Laparoscopic Surgery',
    tag: 'Minimally Invasive',
    desc: 'Minimally invasive techniques designed to reduce discomfort and support faster recovery. Experience surgery with precision and less downtime.',
    image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=900&q=80',
    accent: '#C8A96E',
  },
  {
    slug: 'gastrointestinal-surgery',
    num: '02',
    title: 'Gastrointestinal Surgery',
    tag: 'Digestive Health',
    desc: 'Specialised treatment for digestive tract conditions with thoughtful surgical care and a patient-first approach throughout.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    accent: '#B8C4D0',
  },
  {
    slug: 'hernia-surgery',
    num: '03',
    title: 'Hernia Surgery',
    tag: 'Structural Repair',
    desc: 'Reliable repair for inguinal, umbilical and other hernias with a focus on comfort, long-term durability, and rapid recovery.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
    accent: '#A0B8A8',
  },
  {
    slug: 'gallbladder-surgery',
    num: '04',
    title: 'Gall Bladder Surgery',
    tag: 'Digestive Wellness',
    desc: 'Expert treatment for gallstones and related conditions, delivered with careful evaluation and precise minimally invasive technique.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    accent: '#C4B89A',
  },
  {
    slug: 'thyroid-surgery',
    num: '05',
    title: 'Thyroid Surgery',
    tag: 'Glandular Care',
    desc: 'Specialised thyroid procedures with precise surgical technique, careful pre-op planning, and compassionate recovery support.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80',
    accent: '#B0C4D8',
  },
  {
    slug: 'varicose-vein-surgery',
    num: '06',
    title: 'Varicose Vein Surgery',
    tag: 'Vascular Health',
    desc: 'Effective vein care to relieve discomfort and restore circulation. Modern surgical options with minimal downtime and clear recovery paths.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80',
    accent: '#C4A8B8',
  },
];

const VISIBLE_BEHIND = 2; // how many cards peek behind



/* ─── Single Card ─── */
function DeckCard({ service, index, totalBehind, isTop, onDismiss, direction, isMobile }) {
  const isVisible = index <= totalBehind;

  // Peek-behind scale / offset for cards under the top
  const scale = isTop ? 1 : 1 - index * (isMobile ? 0.03 : 0.045);
  const yOffset = isTop ? 0 : index * (isMobile ? 10 : 18);
  const opacity = isTop ? 1 : Math.max(0.2, 1 - index * 0.28);

  return (
    <motion.div
      layout
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '28px',
        overflow: 'hidden',
        cursor: isTop ? 'grab' : 'default',
        originX: 0.5,
        originY: 0.5,
        pointerEvents: isTop ? 'auto' : 'none',
      }}
      initial={false}
      animate={
        isTop
          ? { scale: 1, y: 0, opacity: 1, rotate: 0, zIndex: 10 }
          : { scale, y: yOffset, opacity, rotate: 0, zIndex: 10 - index }
      }
      exit={
        direction === 'next'
          ? { x: '140%', rotate: 18, opacity: 0, scale: 0.9, transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] } }
          : { x: '-140%', rotate: -18, opacity: 0, scale: 0.9, transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] } }
      }
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Card background image */}
      <img
        src={service.image}
        alt={service.title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        draggable={false}
      />

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--card-image-overlay)',
      }} />

      {/* Card content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* Top row: number + tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--card-overlay-surface)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(8px)',
          }}>
            {service.num}
          </div>

          <div style={{
            background: 'var(--card-overlay-surface)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${service.accent}40`,
            color: service.accent,
            borderRadius: '999px',
            padding: '0.35rem 1rem',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
          }}>
            {service.tag}
          </div>
        </div>

        {/* Bottom: title + desc + CTA */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '0.85rem',
          }}>
            {service.title}
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
            lineHeight: 1.7,
            maxWidth: '480px',
            marginBottom: '1.75rem',
          }}>
            {service.desc}
          </p>

          <Link
            to={`/services/${service.slug}`}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
            draggable={false}
          >
            Read Details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function ServicesDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [exiting, setExiting] = useState(false);

  const total = services.length;

  // Mobile detection inside component
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Adjust visible cards based on device
  const effectiveVisibleBehind = isMobile ? 1 : VISIBLE_BEHIND;

  const goNext = useCallback(() => {
    if (exiting) return;
    setDirection('next');
    setExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setExiting(false);
    }, 520);
  }, [exiting, total]);

  const goPrev = useCallback(() => {
    if (exiting) return;
    setDirection('prev');
    setExiting(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setExiting(false);
    }, 520);
  }, [exiting, total]);

  // Build ordered visible cards: [current, next, next+1, ...]
  const orderedIndices = Array.from({ length: Math.min(effectiveVisibleBehind + 1, total) }, (_, i) =>
    (currentIndex + i) % total
  );

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Clinical Specialties</div>
            <h2 className="h-2">
              Expertise driven by <span className="text-gradient">precision.</span>
            </h2>
          </div>

          {/* Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
          }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '1.5rem' }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Deck with on-card nav arrows */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(380px, 55vw, 540px)',
          maxWidth: '780px',
        }}>
          <AnimatePresence mode="popLayout" custom={direction}>
            {/* Render from bottom to top (reversed so top card is last in DOM) */}
            {[...orderedIndices].reverse().map((svcIndex, revI) => {
              const stackPos = orderedIndices.length - 1 - revI; // 0 = top
              const isTop = stackPos === 0;
              return (
                <DeckCard
                  key={svcIndex}
                  service={services[svcIndex]}
                  index={stackPos}
                  totalBehind={effectiveVisibleBehind}
                  isTop={isTop}
                  direction={direction}
                  isMobile={isMobile}
                />
              );
            })}
          </AnimatePresence>

          {/* Two stacked arrows — vertically centered on right edge */}
          <div style={{
            position: 'absolute',
            right: '-26px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            zIndex: 20,
          }}>
            {/* Prev — top */}
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(17,26,41,0.72)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
              }}
            >
              <ArrowLeft size={18} />
            </motion.button>

            {/* Next — bottom */}
            <motion.button
              onClick={goNext}
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
                border: 'none',
                color: '#060B11',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 24px rgba(242,227,198,0.4)',
              }}
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
