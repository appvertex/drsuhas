import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "I felt informed, calm and supported throughout the entire process. Dr. Kumar made a difficult decision feel manageable and clear.",
    author: 'Priya N.',
    meta: 'Gallbladder surgery · Bengaluru',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote: "The recovery was smoother than expected, and the guidance made a difficult decision feel manageable. A truly premium experience.",
    author: 'Raghav M.',
    meta: 'Hernia repair · Jayanagar',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote: "From the very first consultation, I knew I was in the hands of a master. The attention to detail and personal care is unmatched.",
    author: 'Anita S.',
    meta: 'Thyroid care · Indiranagar',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  }
];

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="section" aria-label="Patient Testimonials" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '48px', margin: '0 1rem', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', padding: '4rem 0' }}>
        
        <Quote size={120} color="var(--border-subtle)" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="text-eyebrow" style={{ marginBottom: '3rem' }}>Patient Stories</div>
          
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <h3 className="h-2" style={{ fontWeight: 400, lineHeight: 1.4, marginBottom: '2rem' }}>
                  "{testimonials[index].quote}"
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    minWidth: '72px',
                    borderRadius: '50%',
                    background: testimonials[index].image
                      ? `url(${testimonials[index].image}) center/cover no-repeat`
                      : 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#F8F9FA',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    boxShadow: '0 18px 45px rgba(0,0,0,0.2)',
                  }}>
                    {!testimonials[index].image && getInitials(testimonials[index].author)}
                  </div>
                  <div style={{ textAlign: 'left', minWidth: '180px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem' }}>{testimonials[index].author}</div>
                    <div className="text-body" style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>{testimonials[index].meta}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={prev} aria-label="Previous testimonial" className="btn-secondary" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid var(--border-strong)', background: 'transparent', color: 'var(--text-primary)' }}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} aria-label="Next testimonial" className="btn-secondary" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid var(--border-strong)', background: 'transparent', color: 'var(--text-primary)' }}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
