import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { siteSettings } from '../../config/siteSettings';

export function DoctorLocations() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Practice Locations</div>
          <h2 className="h-2">Where to <span className="text-gradient">find us</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {siteSettings.locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ background: 'var(--bg-primary)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}
            >
              <iframe 
                title={loc.name} 
                src={loc.mapSrc} 
                width="100%" 
                height="250" 
                style={{ border: 0, display: 'block' }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {loc.name}
                  </h4>
                </div>
                <p className="text-body" style={{ margin: 0, fontSize: '0.9rem' }}>{loc.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
