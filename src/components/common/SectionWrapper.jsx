import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionWrapper - Enterprise reusable section container.
 * Provides consistent vertical padding and optional scroll-triggered animation.
 *
 * @param {string}  id        - Anchor ID for deep-linking
 * @param {string}  className - Additional CSS classes
 * @param {string}  bg        - Background CSS value override
 * @param {boolean} animate   - Whether to animate on scroll-into-view (default: true)
 * @param {object}  style     - Inline style overrides
 */
export const SectionWrapper = ({
  id,
  className = '',
  bg,
  animate = true,
  style = {},
  children,
}) => {
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      style={{ background: bg, ...style }}
      {...motionProps}
    >
      {children}
    </motion.section>
  );
};
