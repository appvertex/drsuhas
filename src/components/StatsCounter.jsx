import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from "framer-motion";
import { getSiteSettings, getSiteSettingsAsync } from '../utils/adminStorage';

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
  const [settings, setSettings] = useState(getSiteSettings);

  useEffect(() => {
    let mounted = true;
    const sync = () => {
      if (mounted) setSettings(getSiteSettings());
    };

    window.addEventListener('settings-changed', sync);
    window.addEventListener('storage', sync);

    getSiteSettingsAsync().then(latest => {
      if (mounted && latest) setSettings(latest);
    });

    return () => {
      mounted = false;
      window.removeEventListener('settings-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const statsList = [
    { value: Number(settings.yearsOfExperience || 11), suffix: settings.yearsSuffix || '+', label: "Years of Experience" },
    { value: Number(settings.surgeriesPerformed || 1000), suffix: settings.surgeriesSuffix || '+', label: "Surgeries Performed" },
    { value: Number(settings.patientsTreated || 2500), suffix: settings.patientsSuffix || '+', label: "Patients Treated" },
    { value: Number(settings.publicationsAuthored || 10), suffix: settings.publicationsSuffix || '+', label: "Publications Authored" },
  ];

  // Filter valid stats with real positive numbers > 0
  const validStats = statsList.filter(s => typeof s.value === 'number' && s.value > 0);

  if (validStats.length === 0) {
    return null;
  }

  return (
    <section className="stats-section-wrapper" ref={ref}>
      <div className="stats-counter__glow" />
      <div className="stats-counter">
        <div className="stats-counter__highlight" />
        <div className="stats-counter__grid">
          {validStats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
