import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { specializations } from '../../data/specializationsData';

export function DesktopFilmStrip() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, specializations.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section aria-label="Clinical Specializations" style={{ position: 'relative', height: '100vh', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>

      {/* Section Label */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        textAlign: 'center'
      }}>
        <div className="text-eyebrow" style={{ marginBottom: '0.5rem', fontSize: '1rem', letterSpacing: '0.2em', color: '#ffffff', textShadow: '0 0 20px rgba(59,130,246,0.4)' }}>Clinical Specialties</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', letterSpacing: '0.03em', fontWeight: 500 }}>
          Explore our {specializations.length} specializations
        </p>
      </div>

      {/* Navigation Arrows */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 3rem',
        zIndex: 40,
        pointerEvents: 'none'
      }}>
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous specialization"
          style={{
            pointerEvents: 'auto',
            opacity: activeIndex === 0 ? 0 : 1,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(96,165,250,0.3)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: activeIndex === 0 ? 'default' : 'pointer',
            boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === specializations.length - 1}
          aria-label="Next specialization"
          style={{
            pointerEvents: 'auto',
            opacity: activeIndex === specializations.length - 1 ? 0 : 1,
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(96,165,250,0.3)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: activeIndex === specializations.length - 1 ? 'default' : 'pointer',
            boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
            transition: 'all 0.3s ease'
          }}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Film Strip Progress Dots */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 30
      }}>
        {specializations.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === activeIndex ? '28px' : '6px',
              backgroundColor: i === activeIndex ? '#DEC898' : 'rgba(255,255,255,0.25)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ height: '6px', borderRadius: '99px' }}
          />
        ))}
      </div>

      {/* Horizontal Track */}
      <motion.div
        animate={{ x: `-${activeIndex * 100}vw` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          display: 'flex',
          width: `${specializations.length * 100}vw`,
          height: '100%',
        }}
      >
        {specializations.map((spec, i) => (
          <div
            key={i}
            style={{
              width: '100vw',
              height: '100vh',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Cinematic Background Image */}
            <img
              src={spec.image}
              alt={spec.title}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.75) saturate(0.8)',
              }}
            />

            {/* Light gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--card-image-overlay-soft)',
            }} />

            {/* Frame Number */}
            <div style={{
              position: 'absolute',
              top: '64px',
              left: '48px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: '#ffffff',
              fontFamily: 'monospace',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '0.5rem 0.65rem',
              borderRadius: '4px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
            }}>
              FRAME {spec.number} / {specializations.length.toString().padStart(2, '0')}
            </div>

            {/* Content */}
            <div style={{
              position: 'absolute',
              inset: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 'clamp(1.5rem, 8vw, 8rem)',
              paddingRight: 'clamp(1.5rem, 8vw, 8rem)',
              zIndex: 10,
            }}>

              {/* Giant Frame Number */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={activeIndex === i ? { opacity: 0.18, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  fontSize: 'clamp(5rem, 18vw, 14rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${spec.accent}`,
                  lineHeight: 0.85,
                  marginBottom: '1.5rem',
                  position: 'absolute',
                  right: 'clamp(1rem, 6vw, 6rem)',
                  bottom: '80px',
                  userSelect: 'none',
                }}
              >
                {spec.number}
              </motion.div>

              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={activeIndex === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ width: '32px', height: '1px', backgroundColor: spec.accent }} />
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: spec.accent,
                }}>
                  {spec.subtitle}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  margin: 0,
                  marginBottom: '2rem',
                  maxWidth: '700px',
                }}
              >
                {spec.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  lineHeight: 1.7,
                  maxWidth: '520px',
                  marginBottom: '3rem',
                }}
              >
                {spec.desc}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: spec.accent,
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    padding: '0.75rem 1.8rem',
                    border: `2px solid ${spec.accent}`,
                    borderRadius: '50px',
                    background: `${spec.accent}18`,
                    boxShadow: `0 0 20px ${spec.accent}30, 0 4px 15px rgba(0,0,0,0.1)`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = spec.accent;
                    e.currentTarget.style.color = '#1a1a1a';
                    e.currentTarget.style.boxShadow = `0 0 30px ${spec.accent}50, 0 6px 20px rgba(0,0,0,0.15)`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${spec.accent}18`;
                    e.currentTarget.style.color = spec.accent;
                    e.currentTarget.style.boxShadow = `0 0 20px ${spec.accent}30, 0 4px 15px rgba(0,0,0,0.1)`;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
