import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { philosophyCards as CARDS } from '../data/philosophyData';
import { PhilosophyCard } from './sections/PhilosophyCard';
import { useTheme } from '../hooks';

export default function Philosophy() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    } else {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  const sectionBg = isDark
    ? 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-alternate) 100%)'
    : 'linear-gradient(160deg, #F8FBFF 0%, #F1F7FD 100%)';
  const badgeColor = isDark ? 'var(--secondary-blue)' : '#0E2348';
  const badgeBg = isDark ? 'rgba(90,174,255,0.10)' : 'rgba(45,107,255,0.07)';
  const badgeBorder = isDark ? 'rgba(90,174,255,0.20)' : 'rgba(45,107,255,0.12)';

  return (
    <section style={{ background: sectionBg, padding: '75px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Ornaments */}
      <div
        style={{
          position: 'absolute', inset: 0, opacity: isDark ? 0.04 : 0.025, pointerEvents: 'none', zIndex: 0,
          backgroundImage: isDark
            ? `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 104L30 87L0 104V70L30 53L60 70V104ZM30 51L0 34V0L30 17L60 0V34L30 51Z' fill='%23FFFFFF' fill-opacity='0.3' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 104L30 87L0 104V70L30 53L60 70V104ZM30 51L0 34V0L30 17L60 0V34L30 51Z' fill='%232D6BFF' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: isDark
            ? 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(45,107,255,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(45,107,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: badgeBg, color: badgeColor,
              border: `1px solid ${badgeBorder}`, borderRadius: '999px',
              padding: '0.4rem 1rem', fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'var(--font-sans)', marginBottom: '0.85rem',
            }}
          >
            OUR PHILOSOPHY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em',
              color: 'var(--text-primary)', margin: '0 0 0.75rem',
            }}
          >
            Surgical Excellence <br className="mobile-only" />
            <span className="text-gradient">Guided by Compassion.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.98rem',
              color: 'var(--text-secondary)', lineHeight: 1.68, margin: '0 auto',
              maxWidth: '580px',
            }}
          >
            Every surgical decision is driven by precision, innovation, and personalized patient care. We treat the person, not just the condition.
          </motion.p>
        </div>

        {/* Animated Expanding Accordion Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '14px',
            width: '100%',
            height: isMobile ? 'auto' : '430px',
          }}
        >
          {CARDS.map((card, index) => (
            <PhilosophyCard
              key={card.number}
              card={card}
              index={index}
              isActive={activeIdx === index}
              isMobile={isMobile}
              isDark={isDark}
              onSelect={() => setActiveIdx(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
