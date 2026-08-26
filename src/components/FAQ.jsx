import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '../data/content';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="section" aria-label="Frequently Asked Questions" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Header Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Common Questions</div>
            <h2 className="h-2" style={{ marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Laparoscopic Surgery <span className="text-gradient">Q&A</span>
            </h2>
            <p className="text-body" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Laparoscopy has transformed modern surgery by prioritizing patient comfort and minimizing recovery times. Here are answers to questions patients frequently ask when preparing for surgery.
            </p>
          </motion.div>

          {/* Accordion Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqItems.map((item, index) => {
              const isOpen = activeIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease',
                    borderLeft: isOpen ? '3px solid var(--accent-gold)' : '1px solid var(--border-subtle)'
                  }}
                >
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingRight: '1rem' }}>
                      <span style={{ 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '0.9rem', 
                        color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)',
                        fontWeight: 600
                      }}>
                        0{index + 1}
                      </span>
                      <span style={{ 
                        fontSize: '1.05rem', 
                        fontWeight: 600,
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '-0.01em',
                        color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}>
                        {item.question}
                      </span>
                    </div>
                    <div style={{ color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        <div style={{ padding: '0 2rem 2rem 3.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
