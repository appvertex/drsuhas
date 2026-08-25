import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { editorialServices } from '../../data/editorialServicesData';

export function ImageCanvas({ activeIndex }) {
  const canvasRef = useRef(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left - 60);
      cursorY.set(e.clientY - rect.top - 60);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <div
      ref={canvasRef}
      style={{ position: 'relative', height: '680px', borderRadius: '28px', overflow: 'hidden', background: 'var(--bg-secondary)' }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={editorialServices[activeIndex].image}
          alt={editorialServices[activeIndex].title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AnimatePresence>

      {/* Bottom gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--card-image-overlay-soft)' }} />

      {/* Bottom label inside image */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
              {editorialServices[activeIndex].tag}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {editorialServices[activeIndex].title}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail Strip */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {editorialServices.map((s, i) => (
            <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === activeIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.3)', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      {/* Magnetic "Visit" label */}
      <motion.div
        style={{
          position: 'absolute',
          x: springX,
          y: springY,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 10
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div style={{ textAlign: 'center', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Learn<br />More
        </div>
      </motion.div>
    </div>
  );
}
