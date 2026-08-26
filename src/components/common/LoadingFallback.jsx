import React from 'react';

/**
 * LoadingFallback - Shown while a React.lazy route chunk loads.
 * Uses a subtle spinner consistent with the design system.
 * ARIA live region announces loading state to screen readers.
 */
export const LoadingFallback = () => (
  <div
    role="status"
    aria-label="Loading page"
    aria-live="polite"
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #0a0a0f)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '3px solid rgba(201, 169, 110, 0.2)',
          borderTopColor: '#c9a96e',
          margin: '0 auto 1rem',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontFamily: 'system-ui, sans-serif' }}>
        Loading…
      </p>
    </div>
  </div>
);
