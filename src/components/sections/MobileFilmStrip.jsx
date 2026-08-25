import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { specializations } from '../../data/specializationsData';

const SCROLL_SPEED = 45;        // px/sec auto-scroll speed
const RESUME_DELAY_MS = 1200;   // ms after finger lifts before auto-scroll resumes
const INERTIA_FRICTION = 0.93;  // deceleration factor per frame (0–1)

export function MobileFilmStrip() {
  const trackRef   = useRef(null);
  const animRef    = useRef(null);
  const halfWidth  = useRef(0);

  // Shared scroll position (always within [0, halfWidth))
  const posRef     = useRef(0);

  // Auto-scroll state
  const autoActive = useRef(true);
  const lastTsRef  = useRef(null);
  const resumeTimer = useRef(null);

  // Touch / drag state
  const isDragging    = useRef(false);
  const touchStartX   = useRef(0);
  const touchStartPos = useRef(0);
  const velocity      = useRef(0);   // px/frame — for inertia after lift
  const lastTouchX    = useRef(0);

  const loopItems = [...specializations, ...specializations];

  // Clamp pos into [0, halfWidth) to keep the loop seamless
  const clamp = (p) => {
    const hw = halfWidth.current;
    if (!hw) return p;
    p = p % hw;
    if (p < 0) p += hw;
    return p;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure after first paint
    halfWidth.current = track.scrollWidth / 2;

    /* ── RAF animation loop ── */
    function step(ts) {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (isDragging.current) {
        // During drag: position is updated live by touchmove, nothing to do
      } else if (!autoActive.current) {
        // Inertia after drag release
        if (Math.abs(velocity.current) > 0.3) {
          posRef.current = clamp(posRef.current + velocity.current);
          velocity.current *= INERTIA_FRICTION;
          track.style.transform = `translateX(-${posRef.current}px)`;
        }
      } else {
        // Normal auto-scroll
        posRef.current = clamp(posRef.current + SCROLL_SPEED * dt);
        track.style.transform = `translateX(-${posRef.current}px)`;
      }

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);

    /* ── Touch handlers ── */
    const onTouchStart = (e) => {
      isDragging.current    = true;
      autoActive.current    = false;
      lastTsRef.current     = null;
      velocity.current      = 0;
      touchStartX.current   = e.touches[0].clientX;
      lastTouchX.current    = e.touches[0].clientX;
      touchStartPos.current = posRef.current;
      clearTimeout(resumeTimer.current);
    };

    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - lastTouchX.current;
      velocity.current  = -dx;                  // capture momentum direction
      lastTouchX.current = e.touches[0].clientX;

      const totalDelta = touchStartX.current - e.touches[0].clientX;
      posRef.current = clamp(touchStartPos.current + totalDelta);
      track.style.transform = `translateX(-${posRef.current}px)`;
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      // Let inertia run, then resume auto-scroll after delay
      resumeTimer.current = setTimeout(() => {
        velocity.current   = 0;
        autoActive.current = true;
        lastTsRef.current  = null; // reset dt so no jump on resume
      }, RESUME_DELAY_MS);
    };

    track.addEventListener('touchstart',  onTouchStart,  { passive: true });
    track.addEventListener('touchmove',   onTouchMove,   { passive: true });
    track.addEventListener('touchend',    onTouchEnd,    { passive: true });
    track.addEventListener('touchcancel', onTouchEnd,    { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resumeTimer.current);
      track.removeEventListener('touchstart',  onTouchStart);
      track.removeEventListener('touchmove',   onTouchMove);
      track.removeEventListener('touchend',    onTouchEnd);
      track.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0 3rem', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '0.5rem' }}>Clinical Specialties</div>
          <h2 className="h-2" style={{ fontSize: '1.75rem' }}>
            Our <span className="text-gradient">Specializations</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {specializations.length} specializations · swipe or auto-scroll
          </p>
        </div>
      </div>

      {/* Full-bleed track */}
      <div style={{ overflow: 'hidden', width: '100%' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1rem',
            width: 'max-content',
            willChange: 'transform',
            paddingLeft: '1rem',
            userSelect: 'none',
            cursor: 'grab',
          }}
        >
          {loopItems.map((spec, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: '80vw',
                maxWidth: '320px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              {/* Card Image */}
              <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
                <img
                  src={spec.image}
                  alt={spec.title}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.9) saturate(0.95)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'var(--card-image-overlay-frame)' }} />
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                  color: '#ffffff', fontFamily: 'monospace',
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  padding: '0.3rem 0.45rem', borderRadius: '4px',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}>
                  FRAME {spec.number} / 09
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.1rem 1.1rem 1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                  <div style={{ width: '18px', height: '1px', backgroundColor: spec.accent }} />
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: spec.accent,
                  }}>
                    {spec.subtitle}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem', fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 0.6rem', lineHeight: 1.2,
                }}>
                  {spec.title}
                </h3>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem', lineHeight: 1.55,
                  margin: '0 0 1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {spec.desc}
                </p>

                <Link
                  to="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    gap: '0.4rem', color: spec.accent,
                    fontWeight: 600, fontSize: '0.82rem',
                    letterSpacing: '0.03em', textDecoration: 'none',
                  }}
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
