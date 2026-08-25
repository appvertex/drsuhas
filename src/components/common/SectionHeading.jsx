import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeading - Reusable section header with eyebrow text,
 * gradient heading, and optional subtext.
 *
 * @param {string} eyebrow      - Small uppercase label above heading
 * @param {string} heading      - Main heading text
 * @param {string} gradientText - Part of heading rendered with gradient
 * @param {string} subtext      - Optional paragraph below heading
 * @param {'left'|'center'} align - Text alignment
 * @param {string} headingTag   - HTML heading element ('h2'|'h1')
 */
export const SectionHeading = ({
  eyebrow,
  heading,
  gradientText,
  subtext,
  align = 'left',
  headingTag: HeadingTag = 'h2',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      className={`section-heading ${className}`}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        maxWidth: isCenter ? '700px' : undefined,
        margin: isCenter ? '0 auto' : undefined,
        marginBottom: 'clamp(2rem, 4vw, 4.5rem)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>
          {eyebrow}
        </div>
      )}
      <HeadingTag className="h-2">
        {heading}
        {gradientText && (
          <>
            {' '}
            <span className="text-gradient">{gradientText}</span>
          </>
        )}
      </HeadingTag>
      {subtext && (
        <p className="text-lead" style={{ marginTop: '1.25rem' }}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
};
