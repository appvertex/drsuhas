import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * NotFound - 404 page component.
 * Uses semantic HTML with proper heading hierarchy and ARIA landmarks.
 * Linked to from App.jsx as the catch-all route.
 */
export const NotFound = () => (
  <motion.section
    aria-labelledby="not-found-heading"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'var(--bg-primary)',
    }}
  >
    <p
      aria-hidden="true"
      style={{
        fontSize: 'clamp(5rem, 18vw, 9rem)',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--border-strong)',
        lineHeight: 1,
        marginBottom: '1.5rem',
        letterSpacing: '-0.04em',
      }}
    >
      404
    </p>
    <h1 id="not-found-heading" className="h-2" style={{ marginBottom: '1rem' }}>
      Page Not Found
    </h1>
    <p
      className="text-body"
      style={{ marginBottom: '2.5rem', maxWidth: '420px' }}
    >
      The page you&apos;re looking for doesn&apos;t exist or may have been moved.
    </p>
    <Link to="/" className="btn btn-primary">
      Back to Home
    </Link>
  </motion.section>
);
