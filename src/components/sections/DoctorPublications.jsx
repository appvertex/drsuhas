import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react';
import { publications } from '../../data/content';

export function DoctorPublications() {
  const [expandedPubIndex, setExpandedPubIndex] = useState(null);

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <BookOpen size={28} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
          <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Research & Publications</div>
          <h2 className="h-2">Published <span className="text-gradient">contributions</span></h2>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {publications.map((pub, i) => {
            const isExpanded = expandedPubIndex === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <button
                  onClick={() => setExpandedPubIndex(isExpanded ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    backgroundColor: isExpanded ? 'rgba(0,0,0,0.015)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', flexShrink: 0 }}>
                    0{i + 1}
                  </span>
                  <h4 style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    color: isExpanded ? 'var(--accent-gold)' : 'var(--text-primary)', 
                    margin: 0, 
                    flex: 1,
                    transition: 'color 0.3s ease'
                  }}>
                    {pub.title}
                  </h4>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} style={{ color: 'var(--text-secondary)' }} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ 
                        padding: '0 1rem 1.75rem 4.1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                        background: 'rgba(0,0,0,0.015)'
                      }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-secondary)', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', alignSelf: 'flex-start', border: '1px solid var(--border-subtle)' }}>
                          YEAR: {pub.year}
                        </div>
                        <p className="text-body" style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                          {pub.abstract}
                        </p>
                        {pub.link && pub.link !== '#' ? (
                          <a 
                            href={pub.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', alignSelf: 'flex-start', transition: 'opacity 0.2s', paddingBottom: '0.2rem', borderBottom: '1px solid var(--accent-gold)' }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                          >
                            Read Full Paper <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', alignSelf: 'flex-start' }}>
                            Peer-Reviewed Publication &bull; Medical Journal
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
