import { useState, useEffect } from 'react';

/**
 * useReducedMotion - Returns true if the user has requested reduced motion
 * in their OS accessibility settings. Use to disable/simplify animations.
 * Meets WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions).
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
