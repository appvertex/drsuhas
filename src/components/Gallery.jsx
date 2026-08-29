import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGalleryImages, getGalleryImagesAsync } from '../utils/adminStorage';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

/* ─────────────────────────────────────────────────────────────── */
/*  PROGRESSIVE OPTIMIZED IMAGE                                     */
/* ─────────────────────────────────────────────────────────────── */
function ProgressiveImage({ src, alt, width = 600, quality = 75, style, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, width, quality);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Skeleton shimmer layer while downloading */}
      {!loaded && !error && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(201,169,110,0.08) 50%, rgba(255,255,255,0.03) 100%)',
          backgroundSize: '200% 100%',
          animation: 'pulseShimmer 1.5s infinite ease-in-out',
        }} />
      )}
      <img
        src={error ? 'https://placehold.co/600x400/1a1a2e/555?text=Image+Unavailable' : optimizedSrc}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.35s ease',
          ...style,
        }}
        {...props}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  LIGHTBOX                                                        */
/* ─────────────────────────────────────────────────────────────── */
function Lightbox({ img, images = [], onClose, onNext, onPrev }) {
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50 && onNext) onNext();
    if (diff < -50 && onPrev) onPrev();
    setTouchStart(null);
  };

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          key="lb-backdrop"
          role="dialog"
          aria-label={`Image detail: ${img.title}`}
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(3,3,7,0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            key={img.id || img.src}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative', maxWidth: '900px', width: '100%',
              borderRadius: '24px', overflow: 'hidden',
              boxShadow: '0 60px 120px rgba(0,0,0,0.8)',
              maxHeight: '82vh',
            }}
          >
            <ProgressiveImage
              src={img.src}
              alt={img.title || 'Clinic gallery detail image'}
              width={1200}
              quality={85}
              style={{ maxHeight: '82vh' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}>
              {img.label && (
                <div style={{ color: 'var(--accent-gold,#c9a96e)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {img.label}
                </div>
              )}
              <div style={{ color: '#fff', fontFamily: 'var(--font-display,Georgia,serif)', fontSize: '1.35rem', fontWeight: 500 }}>
                {img.title}
              </div>
            </div>

            {/* Close Button */}
            <button onClick={onClose} aria-label="Close lightbox" style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', backdropFilter: 'blur(8px)', zIndex: 10,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%', width: '44px', height: '44px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', backdropFilter: 'blur(8px)', zIndex: 10,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  aria-label="Next image"
                  style={{
                    position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%', width: '44px', height: '44px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', backdropFilter: 'blur(8px)', zIndex: 10,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  MAGNETIC CARD (DESKTOP)                                        */
/* ─────────────────────────────────────────────────────────────── */
function MagneticCard({ img, index, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const rectRef = useRef(null);
  const [isLifted, setIsLifted] = useState(false);

  const onMouseEnter = () => {
    setIsLifted(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
      cardRef.current.style.transition = 'transform 0.1s ease-out';
    }
  };

  const onMouseMove = (e) => {
    if (!rectRef.current || !cardRef.current) return;
    const { left, top, width, height } = rectRef.current;
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top) / height;
    const rx = (py - 0.5) * -16;
    const ry = (px - 0.5) * 16;
    cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.15) 0%, transparent 65%)`;
    }
  };

  const reset = () => {
    setIsLifted(false);
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  const gridColSpan = img.span === 'wide' ? 2 : 1;
  const gridRowSpan = img.span === 'tall' ? 2 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: `span ${gridColSpan}`, gridRow: `span ${gridRowSpan}`, minHeight: img.span === 'tall' ? '460px' : '250px' }}
    >
      <div
        style={{ width: '100%', height: '100%', perspective: '800px', cursor: 'pointer' }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        onClick={() => onClick(img)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(img);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View image: ${img.title}`}
      >
        <div ref={cardRef} style={{
          width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden',
          position: 'relative', transformStyle: 'preserve-3d',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        }}>
          <ProgressiveImage
            src={img.src}
            alt={img.title}
            width={600}
            quality={75}
            draggable={false}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
          <div ref={glowRef} style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen',
            opacity: 0, transition: 'opacity 0.3s ease',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(5,5,10,0.88) 0%, rgba(5,5,10,0.2) 45%, transparent 70%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '1.75rem', opacity: isLifted ? 1 : 0.72, transition: 'opacity 0.3s ease',
          }}>
            <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold,#c9a96e)', marginBottom: '0.4rem' }}>
              {img.label}
            </span>
            <span style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontWeight: 500, fontSize: '1.15rem', color: '#fff', lineHeight: 1.25 }}>
              {img.title}
            </span>
          </div>
          <div style={{
            position: 'absolute', inset: -1, borderRadius: '28px', pointerEvents: 'none',
            border: `1px solid rgba(201,169,110,${isLifted ? 0.35 : 0})`,
            transition: 'border-color 0.3s ease',
          }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  MOBILE – NATIVE CSS SCROLL RIVER                               */
/* ─────────────────────────────────────────────────────────────── */
function MobileScrollRiver({ images, onCardClick }) {
  return (
    <div style={{ width: '100%', padding: '0 1rem' }}>
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        paddingBottom: '2rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }} className="hide-scrollbar">
        {images.map((img, i) => (
          <div
            key={img.id || i}
            onClick={() => onCardClick(img)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(img);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View image: ${img.title}`}
            style={{
              flexShrink: 0,
              width: '85vw',
              maxWidth: '320px',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              scrollSnapAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <ProgressiveImage
              src={img.src}
              alt={img.title}
              width={500}
              quality={75}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(3,3,10,0.92) 0%, transparent 100%)',
              padding: '1.4rem 1.2rem 1.1rem',
              pointerEvents: 'none',
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-gold,#c9a96e)', marginBottom: '0.3rem' }}>
                {img.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontWeight: 500, fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>
                {img.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  SKELETON GRID                                                  */
/* ─────────────────────────────────────────────────────────────── */
function GallerySkeletonGrid() {
  return (
    <div className="container">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            style={{
              height: n % 2 === 0 ? '340px' : '260px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(201,169,110,0.08) 50%, rgba(255,255,255,0.03) 100%)',
              backgroundSize: '200% 100%',
              animation: 'pulseShimmer 1.5s infinite ease-in-out',
              border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  ROOT EXPORT                                                    */
/* ─────────────────────────────────────────────────────────────── */
export default function Gallery() {
  const [images, setImages]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [active, setActive]     = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1. Instantly display cached images from localStorage/memory
    const localGallery = getGalleryImages();
    if (localGallery && Array.isArray(localGallery) && localGallery.length > 0) {
      setImages(localGallery);
      setLoading(false);
    }

    // 2. Sync with Cloudflare Workers / D1 API in background
    getGalleryImagesAsync().then((gallery) => {
      if (mounted && gallery && Array.isArray(gallery) && gallery.length > 0) {
        setImages(gallery);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="gallery" style={{
      padding: 'clamp(5rem, 10vw, 9rem) 0',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes pulseShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div aria-hidden style={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '700px', height: '700px', borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 4.5rem)', padding: '0 1.5rem' }}
        >
          <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Clinic & Care</div>
          <h1 className="h-2">
            A visual narrative of<br />
            <span className="text-gradient">technology and calm.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1.2rem', letterSpacing: '0.04em' }}>
            {isMobile ? 'Swipe to explore' : 'Hover to feel the pull'}
          </p>
        </motion.div>

        {loading ? (
          <GallerySkeletonGrid />
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              borderRadius: '24px',
              border: '1px dashed var(--border-subtle, rgba(255,255,255,0.15))',
              background: 'var(--bg-card, rgba(255,255,255,0.02))',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📷</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              No Gallery Photos Uploaded Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Images uploaded through the Admin Panel will automatically appear here. Log into the secret admin portal to upload your first image!
            </p>
          </motion.div>
        ) : isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MobileScrollRiver images={images} onCardClick={setActive} />
          </motion.div>
        ) : (
          <div className="container">
            <div className="mag-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '260px',
              gap: '1.25rem',
            }}>
              {images.map((img, i) => (
                <MagneticCard key={img.id || i} img={img} index={i} onClick={setActive} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Lightbox
        img={active}
        images={images}
        onClose={() => setActive(null)}
        onNext={() => {
          if (!active || images.length === 0) return;
          const currentIndex = images.findIndex((item) => item.id === active.id || item.src === active.src);
          const nextIndex = (currentIndex + 1) % images.length;
          setActive(images[nextIndex]);
        }}
        onPrev={() => {
          if (!active || images.length === 0) return;
          const currentIndex = images.findIndex((item) => item.id === active.id || item.src === active.src);
          const prevIndex = (currentIndex - 1 + images.length) % images.length;
          setActive(images[prevIndex]);
        }}
      />
    </section>
  );
}
