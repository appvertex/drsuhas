import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    num: "01",
    slug: "laparoscopic-surgery",
    title: "Advanced Laparoscopy",
    desc: "State-of-the-art minimally invasive procedures focusing on rapid recovery, minimal scarring, and precision outcomes. Dr. Suhas utilizes the latest endoscopic technology to ensure a safer surgical experience.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
  },
  {
    num: "02",
    slug: "hernia-repair",
    title: "Complex Hernia Repair",
    desc: "Comprehensive abdominal wall reconstruction and specialized hernia repair, tailored to your specific anatomy for lasting structural integrity.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "03",
    slug: "gallbladder-surgery",
    title: "Gallbladder Surgery",
    desc: "Safe and swift laparoscopic cholecystectomy for gallstone relief, ensuring you return to your normal life quickly and comfortably."
  },
  {
    num: "04",
    slug: "thyroid-surgery",
    title: "Thyroid & Parathyroid",
    desc: "Meticulous glandular surgery prioritizing nerve preservation and optimal functional recovery."
  },
  {
    num: "05",
    slug: "breast-surgery",
    title: "Breast Surgery",
    desc: "Compassionate, precision-driven surgical oncology and benign breast disease management."
  },
  {
    num: "06",
    slug: "proctology",
    title: "Laser Proctology",
    desc: "Advanced laser treatments for hemorrhoids, fissures, and fistulas offering virtually painless recovery."
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 100 } }
};

function StandardCard({ service }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        borderRadius: '24px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '380px',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease',
        borderColor: isHovered ? 'rgba(242, 227, 198, 0.3)' : 'var(--border-light)'
      }}
    >
      {/* Number Badge */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 300,
        color: isHovered ? 'var(--accent-gold)' : 'var(--text-secondary)',
        transition: 'color 0.4s ease',
        marginBottom: '2rem'
      }}>
        {service.num}
      </div>

      <div>
        <h3 className="h-3" style={{ marginBottom: '1rem', transition: 'color 0.4s ease', color: isHovered ? '#fff' : 'var(--text-primary)' }}>
          {service.title}
        </h3>
        <p className="text-body" style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
          {service.desc}
        </p>
      </div>

      <Link 
        to={`/services/${service.slug}`} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: isHovered ? 'var(--accent-gold)' : 'var(--text-primary)', 
          textDecoration: 'none',
          fontWeight: 500,
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.875rem',
          transition: 'all 0.3s ease'
        }}
      >
        Read Details
        <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ type: 'spring', stiffness: 300 }}>
          <ArrowRight size={16} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

function HeroCard({ service }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        minHeight: '480px',
        padding: '3rem',
        gridColumn: 'span 2'
      }}
    >
      {/* Background Image */}
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />
      
      {/* Dark Overlay Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--card-image-overlay-soft)',
        zIndex: 1,
        transition: 'background 0.5s ease',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4rem',
          fontWeight: 300,
          color: 'var(--accent-gold)',
          opacity: 0.8,
          marginBottom: '1rem',
          lineHeight: 1
        }}>
          {service.num}
        </div>
        
        <h2 className="h-2" style={{ marginBottom: '1rem', color: '#fff' }}>
          {service.title}
        </h2>
        
        <p className="text-lead" style={{ marginBottom: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>
          {service.desc}
        </p>

        <Link 
          to={`/services/${service.slug}`} 
          className="btn btn-premium"
        >
          Discover Specialty <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesMagazineGrid() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div style={{ maxWidth: '700px', marginBottom: '5rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '1.5rem' }}>Clinical Expertise</div>
          <h2 className="h-2" style={{ marginBottom: '1.5rem' }}>
            Precision care across <span className="text-gradient-gold">specialized disciplines.</span>
          </h2>
          <p className="text-lead">
            A comprehensive range of advanced surgical services delivered with uncompromising precision and deep compassion.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Desktop Grid Layout:
              Hero Card takes up 2 columns out of 3.
              We simulate this using CSS grid. 
          */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '2rem',
            width: '100%'
          }}>
            
            {/* Row 1 */}
            <div style={{ gridColumn: 'span 12', '@media(min-width: 992px)': { gridColumn: 'span 8' } }} className="lg-col-8">
              <HeroCard service={services[0]} />
            </div>
            <div style={{ gridColumn: 'span 12', '@media(min-width: 992px)': { gridColumn: 'span 4' } }} className="lg-col-4">
              <StandardCard service={services[1]} />
            </div>

            {/* Row 2 */}
            {services.slice(2).map((service, idx) => (
              <div key={idx} style={{ gridColumn: 'span 12', '@media(min-width: 992px)': { gridColumn: 'span 4' } }} className="lg-col-4 lg-col-md-6">
                <StandardCard service={service} />
              </div>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}
