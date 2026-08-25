import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoadingFallback - Shown while a React.lazy route chunk loads.
 * Uses a subtle spinner consistent with the design system.
 * ARIA live region announces loading state to screen readers.
 */
export const LoadingFallback = () => (
  <motion.div
    role="status"
    aria-label="Loading page"
    aria-live="polite"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <motion.div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--primary-blue)',
          margin: '0 auto 1rem',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>
        Loading…
      </p>
    </div>
  </motion.div>
);
