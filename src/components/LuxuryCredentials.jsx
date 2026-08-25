import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Scissors, BookOpen, CheckCircle2 } from 'lucide-react';

/* ── Credentials Data ─────────────────────────────────────────────────── */
const credentials = [
  {
    abbr: 'MS (Gen Surg)',
    category: 'Professional Qualification',
    desc: 'Master of Surgery — General Surgery',
    status: 'Medical Board Verified',
    icon: GraduationCap,
    delay: 0.08,
  },
  {
    abbr: 'FIAGES',
    category: 'Board Certified Fellowship',
    desc: 'Fellow of Indian Association of Gastrointestinal Endo-Surgeons',
    status: 'Surgical Fellowship',
    icon: Award,
    delay: 0.16,
  },
  {
    abbr: 'FALS',
    category: 'Advanced Surgical Fellowship',
    desc: 'Fellow of Advanced Laparoscopic Surgery',
    status: 'Advanced Accreditation',
    icon: Scissors,
    delay: 0.24,
  },
  {
    abbr: 'Dip Lap',
    category: 'Postgraduate Diploma',
    desc: 'Diploma in Laparoscopic Surgery',
    status: 'Specialized Diploma',
    icon: BookOpen,
    delay: 0.32,
  },
];

/* ── Main Component ─────────────────────────────────────────────────── */
export default function LuxuryCredentials() {
  const sectionRef = useRef(null);

  return (
    <section className="lux-credentials-section" aria-label="Professional Credentials" ref={sectionRef}>
      {/* ── Minimal Background ── */}
      <div className="lux-bg-layer" aria-hidden="true">
        <div className="lux-bg-radial" />
      </div>

      {/* ── Content ── */}
      <div className="container lux-container">
        {/* Section Header */}
        <motion.div
          className="lux-heading-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="lux-eyebrow">Qualifications</span>
          <h2 className="lux-h2">Professional Credentials</h2>
          <p className="lux-subtitle">
            Advanced training and internationally recognized certifications in surgical excellence.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="lux-cards-grid">
          {credentials.map((cred, i) => {
            const IconComp = cred.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: cred.delay, ease: [0.16, 1, 0.3, 1] }}
                className="lux-card-wrapper"
              >
                <div className="lux-plaque">
                  {/* Category Ribbon Pill */}
                  <div className="lux-ribbon-pill">
                    <span>{cred.category}</span>
                  </div>

                  {/* Double Ring Icon Frame */}
                  <div className="lux-icon-ring-wrapper">
                    <div className="lux-icon-ring-outer" />
                    <div className="lux-icon-circle">
                      <IconComp size={24} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lux-plaque-body">
                    <h3 className="lux-abbr">{cred.abbr}</h3>
                    <p className="lux-desc">{cred.desc}</p>
                  </div>

                  {/* Footer Status Verification Badge */}
                  <div className="lux-card-footer">
                    <div className="lux-card-divider" />
                    <div className="lux-card-status">
                      <CheckCircle2 size={13} className="lux-status-check" aria-hidden="true" />
                      <span>{cred.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
