import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * PageWrapper - Shared page transition wrapper.
 * Used by every route page to provide consistent enter/exit animations.
 * Defined once here to eliminate the repeated declaration across all pages.
 */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export const PageWrapper = memo(({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
  >
    {children}
  </motion.div>
));

PageWrapper.displayName = 'PageWrapper';
