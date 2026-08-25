import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const specialties = [
  'Laparoscopic Surgery Basic and Advanced',
  'Gastrointestinal Surgery',
  'Breast Surgery & Breast Onco Surgery',
  'Hernia Surgery',
  'Gall Bladder Surgery',
  'Thyroid Surgery',
  'Varicose Vein Surgery',
  'Laser Procedures (Piles, Fissure, Fistula)',
  'Piles, Fissure, Fistula & Pilonidal Sinus',
  'Diabetic Foot Surgery',
  'Amputations, Excision & Circumcision',
  'Trauma & Emergency Surgery'
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function WhyChoose() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Content Pane */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Specialization</div>
            <h2 className="h-2" style={{ marginBottom: '2rem', lineHeight: 1.2 }}>
              Expert in <span className="text-gradient">advanced surgery</span> techniques.
            </h2>
            <p className="text-lead" style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
              Dr. Suhas S. Kumar, MS (Gen Surg), FIAGES, FALS, Dip Lap, is an experienced Consultant General and Laparoscopic Surgeon. His practice is defined by surgical precision, state-of-the-art methods, and a dedicated path toward safe, quick recovery.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/contact" className="btn btn-premium">
                Book Appointment
              </Link>
              <Link to="/about" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Read Biography <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* List Pane */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              background: 'var(--bg-card)',
              padding: '2.5rem',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <h3 className="h-3" style={{ marginBottom: '2rem', color: 'var(--accent-gold)' }}>Clinical Offerings</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
              {specialties.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                >
                  <div style={{
                    background: 'var(--accent-gold-dim)',
                    padding: '0.25rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Check size={14} />
                  </div>
                  <span className="text-body" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
