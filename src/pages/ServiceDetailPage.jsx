import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageWrapper, NotFound } from '../components/common';
import { serviceCatalog, organizationSchema, buildServiceSchema, breadcrumbSchema } from '../data/content';
import { siteSettings } from '../config/siteSettings';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceCatalog.find(s => s.slug === slug);

  if (!service) {
    return (
      <PageWrapper>
        <SEO
          title="Service Not Found"
          description="The requested surgical service could not be found."
          pathname={`/services/${slug || 'unknown'}`}
          robots="noindex,nofollow"
        />
        <NotFound />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <SEO
        title={`${service.title} in Bangalore – Dr. Suhas S Kumar`}
        description={`${service.summary} Expert ${service.title} by Dr. Suhas S Kumar, General & Laparoscopic Surgeon in Bangalore, Karnataka at Deepak Hospital Jayanagar and Hemalatha Hospital Neelasandra.`}
        keywords={`${service.title} Bangalore, ${service.title} in Bangalore, Dr Suhas S Kumar, Laparoscopic Surgeon Bangalore, Surgery Bangalore, Deepak Hospital Jayanagar, Hemalatha Hospital Neelasandra`}
        pathname={`/services/${service.slug}`}
        image={service.image}
        schema={[
          organizationSchema,
          buildServiceSchema(service),
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Services', item: `${siteSettings.siteUrl}/services` },
            { name: service.title, item: `${siteSettings.siteUrl}/services/${service.slug}` },
          ]),
        ]}
      />
      <section style={{ position: 'relative', height: '60vh', minHeight: '500px', display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} fetchPriority="high" decoding="async" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(10,10,10,0.4) 100%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Service Detail</div>
            <h1 className="h-display" style={{ marginBottom: '1.5rem' }}>{service.title}</h1>
            <p className="text-lead" style={{ maxWidth: '600px' }}>{service.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{ position: 'relative', height: '55vh', minHeight: '440px', display: 'flex', alignItems: 'flex-end', paddingBottom: '3.5rem' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={service.image} alt={`${service.title} in Bangalore`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} fetchPriority="high" decoding="async" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(10,10,10,0.45) 100%)' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Surgical Specialty in Bangalore</div>
            <h1 className="h-display" style={{ marginBottom: '1.25rem' }}>{service.title}</h1>
            <p className="text-lead" style={{ maxWidth: '680px' }}>{service.summary}</p>
          </motion.div>
        </div>
      </section>

      {/* GEO AI Search Takeaways Box */}
      {service.geoSummary && (
        <section style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem', backgroundColor: 'var(--bg-primary)' }}>
          <div className="container">
            <div style={{
              background: 'rgba(201, 169, 110, 0.06)',
              border: '1.5px solid var(--accent-gold)',
              borderRadius: '20px',
              padding: '2rem 2.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>💡</span>
                <h2 className="h-4" style={{ color: 'var(--accent-gold)', margin: 0, fontSize: '1.15rem' }}>
                  {service.geoSummary.headline}
                </h2>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {service.geoSummary.points.map((pt, idx) => (
                  <li key={idx} style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Conditions, Symptoms & Causes */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {service.conditionsTreated && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="h-3" style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Conditions Treated</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {service.conditionsTreated.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>✓</span>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {service.symptoms && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="h-3" style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Symptoms & Warning Signs</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {service.symptoms.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>•</span>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {service.diagnosis && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h2 className="h-3" style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Diagnostic Tests</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {service.diagnosis.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>🔍</span>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

        </div>
      </section>

      {/* Laparoscopic vs Open Comparison Table */}
      {service.lapVsOpenTable && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
          <div className="container">
            <h2 className="h-2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Comparison: <span className="text-gradient-gold">Laparoscopic vs Open Surgery</span>
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                background: 'var(--bg-card, rgba(255,255,255,0.03))',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
              }}>
                <thead>
                  <tr style={{ background: 'rgba(201, 169, 110, 0.15)', color: 'var(--text-primary)', textAlign: 'left' }}>
                    <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.95rem' }}>Feature</th>
                    <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.95rem', color: 'var(--accent-gold)' }}>Laparoscopic Surgery</th>
                    <th style={{ padding: '1.1rem 1.5rem', fontSize: '0.95rem' }}>Traditional Open Surgery</th>
                  </tr>
                </thead>
                <tbody>
                  {service.lapVsOpenTable.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.06))' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{row.feature}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--accent-gold)', fontWeight: 500 }}>{row.lap}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{row.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Recovery Timeline & Aftercare */}
      {service.recoveryTimeline && (
        <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="container">
            <h2 className="h-2" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Recovery Timeline & <span className="text-gradient-gold">Aftercare</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {service.recoveryTimeline.map((step, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card, rgba(255,255,255,0.03))',
                  border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
                  borderRadius: '16px',
                  padding: '1.5rem',
                }}>
                  <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {step.day}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {step.guidance}
                  </div>
                </div>
              ))}
            </div>

            {service.aftercare && (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed var(--border-subtle)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '800px',
                margin: '0 auto',
              }}>
                <h3 className="h-4" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Key Post-Op Aftercare Instructions</h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {service.aftercare.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Procedural FAQs */}
      {service.serviceFaqs && service.serviceFaqs.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 className="h-2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              Frequently Asked Questions on <span className="text-gradient-gold">{service.title}</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {service.serviceFaqs.map((faq, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                }}>
                  <h3 className="h-4" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    Q: {faq.q}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container">
          <div className="editorial-card" style={{ padding: '3.5rem 2rem', maxWidth: '750px', margin: '0 auto' }}>
            <h2 className="h-2" style={{ marginBottom: '1rem' }}>Consult Dr. Suhas S Kumar in Bangalore</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
              Schedule a clinical evaluation for {service.title.toLowerCase()} at Deepak Hospital Jayanagar or Hemalatha Hospital Neelasandra, Bangalore.
            </p>
            <a href="/contact" className="btn btn-premium" style={{ padding: '0.85rem 2rem' }}>
              Book Consultation Now
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

