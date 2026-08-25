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
        title={service.title}
        description={service.summary}
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

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="h-3" style={{ marginBottom: '2rem' }}>What this service includes</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.highlights.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-gold)', marginTop: '4px' }}>&bull;</span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="h-3" style={{ marginBottom: '2rem' }}>Common areas of care</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.coverage.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ color: 'var(--accent-gold)', marginTop: '4px' }}>&bull;</span>
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="editorial-card" style={{ padding: '4rem', background: 'var(--bg-secondary)', border: 'none' }}>
            <h3 className="h-3" style={{ marginBottom: '2rem', textAlign: 'center' }}>Why patients choose this care</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {service.whyChoose.map((item, i) => (
                <span key={i} style={{ padding: '0.75rem 1.5rem', background: 'var(--border-subtle)', borderRadius: '999px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
