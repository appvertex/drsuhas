import React from 'react';

export function CardIcon({ index, color, isNavy }) {
  const primaryGradientId = `icon-primary-grad-${index}`;
  const glowGradientId = `icon-glow-grad-${index}`;
  const accentColor = color || (isNavy ? '#5AAEFF' : '#2D6BFF');
  const secondaryColor = isNavy ? '#80C2FF' : '#00C6FF';

  switch (index) {
    case 0:
      // Minimally Invasive Surgery (Precision Reticle & Laser Focus Core)
      return (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={primaryGradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} />
              <stop offset="1" stopColor={secondaryColor} />
            </linearGradient>
            <radialGradient id={glowGradientId} cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="24" cy="24" r="20" fill={`url(#${glowGradientId})`} />

          {/* Outer Precision Reticle Ring */}
          <circle cx="24" cy="24" r="19" stroke={`url(#${primaryGradientId})`} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.45" />
          <circle cx="24" cy="24" r="14" stroke={`url(#${primaryGradientId})`} strokeWidth="1.5" opacity="0.85" />
          
          {/* Corner Precision Target Brackets */}
          <path d="M14 10H10V14" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 10H38V14" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 38H10V34" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 38H38V34" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Precision Crosshairs */}
          <line x1="24" y1="4" x2="24" y2="10" stroke={`url(#${primaryGradientId})`} strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="38" x2="24" y2="44" stroke={`url(#${primaryGradientId})`} strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="24" x2="10" y2="24" stroke={`url(#${primaryGradientId})`} strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="24" x2="44" y2="24" stroke={`url(#${primaryGradientId})`} strokeWidth="2" strokeLinecap="round" />

          {/* Core Lens & Laser Point */}
          <circle cx="24" cy="24" r="6" fill={accentColor} fillOpacity="0.15" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" />
          <circle cx="24" cy="24" r="2.5" fill={`url(#${primaryGradientId})`} />
        </svg>
      );

    case 1:
      // Advanced Surgical Innovation (Quantum Atomic Tech & Innovation Star Core)
      return (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={primaryGradientId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} />
              <stop offset="1" stopColor={secondaryColor} />
            </linearGradient>
            <radialGradient id={glowGradientId} cx="24" cy="24" r="22" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} stopOpacity="0.35" />
              <stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Aura */}
          <circle cx="24" cy="24" r="22" fill={`url(#${glowGradientId})`} />

          {/* Tech Orbits */}
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(35 24 24)" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(-35 24 24)" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(90 24 24)" stroke={`url(#${primaryGradientId})`} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />

          {/* Innovation Sparkle Node at Center */}
          <path d="M24 15L25.8 22.2L33 24L25.8 25.8L24 33L22.2 25.8L15 24L22.2 22.2L24 15Z" fill={`url(#${primaryGradientId})`} />
          <circle cx="24" cy="24" r="2.8" fill="#FFFFFF" opacity="0.95" />
        </svg>
      );

    case 2:
      // Comprehensive Clinical Expertise (Surgical Shield of Mastery & Emblem)
      return (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={primaryGradientId} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} />
              <stop offset="1" stopColor={secondaryColor} />
            </linearGradient>
            <radialGradient id={glowGradientId} cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Shield Glow */}
          <path d="M24 4L9 9.5V21C9 31.8 15.6 40.5 24 44C32.4 40.5 39 31.8 39 21V9.5L24 4Z" fill={`url(#${glowGradientId})`} />

          {/* Outer Shield Outline */}
          <path d="M24 5.5L10.5 10.5V20.5C10.5 30.2 16.4 38 24 41.2C31.6 38 37.5 30.2 37.5 20.5V10.5L24 5.5Z" stroke={`url(#${primaryGradientId})`} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M24 9.5L14 13.5V20.5C14 27.8 18.5 33.8 24 36.3C29.5 33.8 34 27.8 34 20.5V13.5L24 9.5Z" stroke={`url(#${primaryGradientId})`} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 2" />

          {/* Medical Cross + Checkmark Emblem */}
          <path d="M24 15V27M18 21H30" stroke={`url(#${primaryGradientId})`} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M17 23.5L21.5 28L31 18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      );

    case 3:
      // Patient-First Philosophy (Compassionate Heart & Vital Lifeline Wave)
      return (
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={primaryGradientId} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} />
              <stop offset="1" stopColor={secondaryColor} />
            </linearGradient>
            <radialGradient id={glowGradientId} cx="24" cy="22" r="18" gradientUnits="userSpaceOnUse">
              <stop stopColor={accentColor} stopOpacity="0.35" />
              <stop offset="1" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow Backdrop */}
          <path d="M24 40S7 27 7 16C7 9.5 12 5 18 5C21.8 5 24 7.2 24 7.2C24 7.2 26.2 5 30 5C36 5 41 9.5 41 16C41 27 24 40 24 40Z" fill={`url(#${glowGradientId})`} />

          {/* Outer Premium Heart Path */}
          <path d="M24 39.5S7.5 26.8 7.5 16.2C7.5 10 12.2 5.5 18 5.5C21.6 5.5 24 7.8 24 7.8C24 7.8 26.4 5.5 30 5.5C35.8 5.5 40.5 10 40.5 16.2C40.5 26.8 24 39.5 24 39.5Z" stroke={`url(#${primaryGradientId})`} strokeWidth="2" strokeLinejoin="round" />

          {/* ECG Vital Wave */}
          <path d="M10 20.5H16L19 12L23 29L27 17L30 22H38" stroke={`url(#${primaryGradientId})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Care Sparkle Flare */}
          <circle cx="34" cy="11" r="2.2" fill={`url(#${primaryGradientId})`} />
        </svg>
      );

    default:
      return null;
  }
}
