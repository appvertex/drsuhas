import React, { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackPageView } from '../../utils/analyticsTracker';

/**
 * PageWrapper - Shared page transition wrapper with automatic real analytics telemetry tracking.
 */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export const PageWrapper = memo(({ children }) => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
});

PageWrapper.displayName = 'PageWrapper';
