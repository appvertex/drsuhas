import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ParallaxCTA() {
  const ctaRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      style={{ 
        position: 'relative', 
        padding: '6rem 0', 
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Pattern - Animated */}
      <motion.div 
        animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage: `radial-gradient(var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }}
      />
      {/* Soft Glow - Animated */}
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(45,107,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '700px', perspective: '1200px' }}>
        <motion.div 
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.98 },
            show: { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              transition: { 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.15,
                delayChildren: 0.2
              } 
            }
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            background: 'var(--bg-primary)',
            padding: '4rem 2rem',
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 2px 10px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Inner accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent-gold), var(--primary-blue))', borderRadius: '24px 24px 0 0' }} />

          <motion.div style={{ transform: "translateZ(50px)", width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} 
              className="h-2" 
              style={{ marginBottom: '1.25rem' }}
            >
              Ready to discuss <span className="text-gradient">your care?</span>
            </motion.h2>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="text-lead" 
              style={{ marginBottom: '2.5rem', maxWidth: '480px' }}
            >
              Schedule a consultation with Dr. Suhas for personalised surgical advice and compassionate support.
            </motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <motion.div whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(212,175,55,0.3)' }} whileTap={{ scale: 0.95 }} style={{ borderRadius: '99px' }}>
                <Link to="/contact" className="btn btn-premium" style={{ padding: '0.85rem 2.2rem', fontSize: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  Book a Consultation <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
