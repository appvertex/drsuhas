import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 11, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Surgeries Performed" },
  { value: 2500, suffix: "+", label: "Patients Treated" },
  { value: 10, suffix: "+", label: "Publications Authored" },
];

const DURATION = 2000;

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target, trigger) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const animate = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOutExpo(progress);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [target]
  );

  useEffect(() => {
    if (trigger) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, animate]);

  return count;
}

function StatItem({ value, suffix, label, index, inView }) {
  const count = useCountUp(value, inView);

  return (
    <motion.div
      className="stats-counter__item"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="stats-counter__number">
        {count.toLocaleString()}
        <span className="stats-counter__suffix">{suffix}</span>
      </span>
      <span className="stats-counter__label">{label}</span>
    </motion.div>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="stats-section-wrapper" ref={ref}>
      <div className="stats-counter__glow" />
      <div className="stats-counter">
        <div className="stats-counter__highlight" />
        <div className="stats-counter__grid">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
