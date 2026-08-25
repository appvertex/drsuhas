import { useState, useEffect, useCallback } from 'react';

/**
 * useScrollPosition - Returns the current window scroll Y position,
 * throttled via requestAnimationFrame to prevent excessive re-renders.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    let rafId;
    const throttled = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', throttled, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttled);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return scrollY;
}
