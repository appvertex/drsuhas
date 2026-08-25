import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { editorialServices } from '../data/editorialServicesData';
import { ImageCanvas } from './sections/ImageCanvas';

export default function ServicesEditorial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Clinical Specialties</div>
            <h2 className="h-2">A focused practice built for<br /><span className="text-gradient">clarity and confidence.</span></h2>
          </div>
          <Link to="/services" className="btn btn-secondary">
            View All Services <ArrowRight size={18} />
          </Link>
        </div>

        {!isMobile ? (
          /* ==================================================== */
          /* DESKTOP: Dynamic Hover Roster                        */
          /* ==================================================== */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            {/* LEFT: Roster List */}
            <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column' }}>
              {editorialServices.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{
                      textDecoration: 'none',
                      padding: '2.5rem 0',
                      borderBottom: '1px solid var(--border-subtle)',
                      borderTop: index === 0 ? '1px solid var(--border-subtle)' : 'none',
                      cursor: 'pointer',
                      display: 'block',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Animated background fill on hover */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(242,227,198,0.04) 0%, transparent 100%)' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
                        <motion.span
                          animate={{ 
                            color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
                            fontSize: isActive ? '0.9rem' : '0.8rem'
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.1em' }}
                        >
                          0{index + 1}
                        </motion.span>
                        <motion.h3
                          animate={{
                            color: isActive ? '#F8F9FA' : 'rgba(155,163,175,0.7)',
                            fontSize: isActive ? '3rem' : '2.2rem',
                          }}
                          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                          style={{
                            margin: 0,
                            fontFamily: 'var(--font-display)',
                            fontWeight: isActive ? 600 : 400,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                          }}
                        >
                          {service.title}
                        </motion.h3>
                      </div>

                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: 'var(--accent-gold)', flexShrink: 0 }}
                      >
                        <ArrowUpRight size={24} />
                      </motion.div>
                    </div>

                    {/* Tag pill below active item */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                          style={{ overflow: 'hidden', paddingLeft: '4rem' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <span style={{
                              display: 'inline-block',
                              background: 'rgba(242,227,198,0.1)',
                              border: '1px solid rgba(242,227,198,0.2)',
                              color: 'var(--accent-gold)',
                              borderRadius: '999px',
                              padding: '0.25rem 1rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase'
                            }}>
                              {service.tag}
                            </span>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '300px' }}>
                              {service.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: Image Canvas */}
            <div style={{ position: 'sticky', top: '120px' }}>
              <ImageCanvas activeIndex={activeIndex} />
            </div>

          </div>
        ) : (
          /* ==================================================== */
          /* MOBILE: Enhanced Accordion                           */
          /* ==================================================== */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {editorialServices.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={service.slug} style={{ borderBottom: '1px solid var(--border-subtle)', borderTop: index === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      padding: '2rem 0',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em' }}>0{index + 1}</span>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'all 0.3s ease' }}>
                        {service.title}
                      </h3>
                    </div>
                    <motion.div animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)', flexShrink: 0 }}>
                      <Plus size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ paddingBottom: '2rem' }}>
                          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.5rem', background: 'linear-gradient(to top, rgba(247,251,255,0.92), transparent)' }}>
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                                {service.tag}
                              </span>
                            </div>
                          </div>
                          <p className="text-lead" style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>{service.desc}</p>
                          <Link to={`/services/${service.slug}`} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            Explore {service.title} <ArrowRight size={16} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
