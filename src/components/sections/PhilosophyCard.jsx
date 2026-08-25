import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardIcon } from './PhilosophyIcons';

export function PhilosophyCard({
  card,
  index,
  isActive,
  isMobile,
  isDark,
  onSelect
}) {
  // Cards one and three intentionally stay light to create an alternating
  // white/navy rhythm, regardless of the surrounding site theme.
  const isLightCard = !card.isNavy;
  const accentColor = isLightCard ? '#2D6BFF' : '#5AAEFF';
  const titleColor = isLightCard ? '#0E2348' : '#FFFFFF';
  const descColor = isLightCard ? '#58738F' : 'rgba(210,228,249,0.88)';
  const bgColor = isLightCard ? '#FFFFFF' : (isDark ? '#081320' : '#0E2348');
  const borderColor = card.isNavy
    ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)')
    : 'rgba(45,107,255,0.12)';
  const tagBg = card.isNavy ? 'rgba(90,174,255,0.12)' : 'rgba(45,107,255,0.07)';
  const tagBorder = card.isNavy ? 'rgba(90,174,255,0.22)' : 'rgba(45,107,255,0.15)';

  const defaultShadow = isDark 
    ? '0 16px 32px rgba(0,0,0,0.35)' 
    : '0 14px 40px rgba(30,80,180,0.07)';
  const hoverShadow = isDark
    ? '0 24px 48px rgba(0,0,0,0.5)'
    : '0 20px 48px rgba(30,80,180,0.11)';
  const innerGlare = card.isNavy 
    ? 'inset 0 1px 1px rgba(255,255,255,0.15)' 
    : 'inset 0 1px 1px rgba(255,255,255,0.7)';

  const desktopFlex = isActive ? 3.5 : 1;
  const mobileHeight = isActive ? 'auto' : '76px';

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${card.title} - ${card.tag}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      onMouseEnter={() => !isMobile && onSelect()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: hoverShadow }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        layout: { duration: 0.6, type: 'spring', bounce: 0.2 },
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: { duration: 0.3 },
        boxShadow: { duration: 0.3 }
      }}
      style={{
        flex: isMobile ? 'none' : desktopFlex,
        height: isMobile ? mobileHeight : '100%',
        borderRadius: '20px',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: `${defaultShadow}, ${innerGlare}`,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        outline: 'none',
      }}
    >
      {/* Background Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${card.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isActive
            ? (isLightCard ? 0.55 : 0.50)
            : (isLightCard ? 0.35 : 0.30),
          transition: 'opacity 0.5s ease',
          mixBlendMode: card.isNavy ? 'luminosity' : 'normal',
          filter: card.isNavy ? 'contrast(105%) brightness(95%)' : 'contrast(100%) brightness(100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Overlay Gradient Mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: card.isNavy
            ? (isDark
                ? 'linear-gradient(135deg, rgba(9,21,36,0.90) 0%, rgba(14,35,72,0.82) 100%)'
                : 'linear-gradient(135deg, rgba(14,35,72,0.85) 0%, rgba(7,20,42,0.78) 100%)')
            : 'linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(241,247,253,0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Background Glow */}
      {isActive && (
        <motion.div
          layoutId={`active-glow-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: card.isNavy
              ? 'radial-gradient(circle at 80% 20%, rgba(90,174,255,0.15) 0%, transparent 60%)'
              : 'radial-gradient(circle at 80% 20%, rgba(45,107,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Inactive Content */}
      <AnimatePresence mode="popLayout">
        {!isActive && (
          <motion.div
            key={`inactive-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: isMobile ? '1.25rem' : '1.75rem',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: isMobile ? 'space-between' : 'flex-start',
              width: '100%',
              height: '100%',
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            <motion.div layoutId={`icon-${index}`} style={{ marginBottom: isMobile ? '0' : '1.5rem', color: accentColor }}>
              <CardIcon index={index} color={accentColor} isNavy={card.isNavy} />
            </motion.div>

            <motion.h3
              layoutId={`title-${index}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile ? '1.05rem' : '0.92rem',
                fontWeight: 600,
                color: titleColor,
                margin: 0,
                writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
                transform: isMobile ? 'none' : 'rotate(180deg)',
                flex: isMobile ? 1 : 'none',
                marginLeft: isMobile ? '1rem' : 0,
                lineHeight: 1.35,
                letterSpacing: isMobile ? '0.02em' : '0.1em',
                textTransform: isMobile ? 'none' : 'uppercase',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                opacity: 0.8,
              }}
            >
              {card.title}
            </motion.h3>

            {isMobile && (
              <motion.div
                animate={{ rotate: 0 }}
                style={{ color: titleColor, opacity: 0.5, marginLeft: '1rem' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Content */}
      <AnimatePresence mode="popLayout">
        {isActive && (
          <motion.div
            key={`active-${index}`}
            initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? -20 : 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              padding: isMobile ? '1.25rem' : '2.25rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 1,
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <motion.div layoutId={`icon-${index}`} style={{ color: accentColor }}>
                <CardIcon index={index} color={accentColor} isNavy={card.isNavy} />
              </motion.div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '999px',
                  background: tagBg,
                  border: `1px solid ${tagBorder}`,
                  color: accentColor,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {card.tag}
              </div>
            </div>

            <motion.h3
              layoutId={`title-${index}`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)',
                fontWeight: 700,
                lineHeight: 1.18,
                letterSpacing: '-0.02em',
                color: titleColor,
                margin: '0 0 0.85rem',
              }}
            >
              {card.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.68,
                color: descColor,
                margin: 0,
                maxWidth: '94%',
              }}
            >
              {card.description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
