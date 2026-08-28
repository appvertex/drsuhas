import { useState, useEffect } from 'react';

/**
 * useTheme - Manages the site theme (light/dark) with safe localStorage persistence,
 * system preference detection, and synchronized state across all components via
 * MutationObserver and custom events.
 */
export function useTheme() {
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = window.localStorage.getItem('site-theme');
      if (stored) return stored;
    } catch {/* storage restricted */}
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const syncTheme = () => {
      const current = document.documentElement.dataset.theme || getInitialTheme();
      setTheme(current);
    };

    // Ensure document attribute is initialized
    if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = theme;
    }

    // Listen for custom theme-change events across components
    window.addEventListener('theme-change', syncTheme);
    window.addEventListener('storage', syncTheme);

    // MutationObserver to watch attribute updates on <html> element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          syncTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('theme-change', syncTheme);
      window.removeEventListener('storage', syncTheme);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem('site-theme', nextTheme);
    } catch {/* storage restricted */}
    setTheme(nextTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  return { theme, toggleTheme };
}
