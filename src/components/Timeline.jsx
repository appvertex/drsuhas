import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const timelineData = [
  { year: "2010", title: "Medical Foundation", desc: "Graduated with honors, establishing a strong foundation in comprehensive medical care." },
  { year: "2014", title: "Surgical Specialization", desc: "Completed advanced surgical training, focusing on minimally invasive techniques." },
  { year: "2017", title: "Advanced Laparoscopy", desc: "Pioneered new laparoscopic procedures at leading healthcare institutions." },
  { year: "2020", title: "Consultant Role", desc: "Appointed as Senior Consultant Surgeon, leading a team of dedicated surgical professionals." },
  { year: "Present", title: "Private Practice", desc: "Delivering premium, patient-centric surgical care with a focus on holistic recovery." }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>The Journey</div>
          <h2 className="h-2">A legacy of <span className="text-gradient">excellence.</span></h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Background Line */}
          <div style={{ position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px', background: 'var(--border-subtle)' }} />
          
          {/* Animated Line */}
          <motion.div style={{ position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px', background: 'var(--accent-gold)', scaleY, transformOrigin: 'top' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"]
  });

  return (
    <motion.div 
      ref={ref}
      style={{ position: 'relative', paddingLeft: '5rem', opacity: scrollYProgress }}
    >
      <div style={{ position: 'absolute', left: '19px', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--bg-primary)', border: '2px solid var(--accent-gold)', zIndex: 2 }} />
      
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
        {item.year}
      </div>
      <h3 className="h-3" style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
      <p className="text-body">{item.desc}</p>
    </motion.div>
  );
}
