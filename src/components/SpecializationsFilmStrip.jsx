import React, { useState, useEffect } from 'react';
import { MobileFilmStrip } from './sections/MobileFilmStrip';
import { DesktopFilmStrip } from './sections/DesktopFilmStrip';

export default function SpecializationsFilmStrip() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileFilmStrip /> : <DesktopFilmStrip />;
}
