import React from 'react';

/**
 * SkipNav - Visually hidden accessibility skip link.
 * Becomes visible on keyboard focus (Tab key), allowing keyboard users
 * to bypass navigation and jump directly to main content.
 * Meets WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks).
 */
export const SkipNav = ({ targetId = 'main-content' }) => (
  <a
    href={`#${targetId}`}
    className="skip-nav"
    aria-label="Skip to main content"
  >
    Skip to main content
  </a>
);
