import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoading(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 700);

    const handleLoad = () => {
      window.clearTimeout(timer);
      setLoading(false);
    };

    window.addEventListener('load', handleLoad, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              rotate: { duration: 1.2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 }
            }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--accent-gold)',
            }}
          />
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-3" 
            style={{ marginTop: '2rem', letterSpacing: '0.1em' }}
          >
            DR. SUHAS S KUMAR
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-body"
            style={{ marginTop: '0.5rem', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}
          >
            Surgical Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
