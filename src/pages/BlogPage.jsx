import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { getBlogsAsync } from '../utils/adminStorage';

const DEFAULT_BLOG_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

/* ─── Skeleton Loading Cards Component ─────────────────────────── */
function BlogSkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="editorial-card"
          style={{
            height: '420px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--bg-card, rgba(255,255,255,0.03))',
            border: '1px solid var(--border-subtle, rgba(255,255,255,0.08))',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              height: '220px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(201,169,110,0.08) 50%, rgba(255,255,255,0.03) 100%)',
              backgroundSize: '200% 100%',
              animation: 'pulseShimmer 1.8s infinite ease-in-out',
            }}
          />
          <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '40%', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', animation: 'pulseShimmer 1.8s infinite' }} />
            <div style={{ width: '85%', height: '24px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', animation: 'pulseShimmer 1.8s infinite' }} />
            <div style={{ width: '100%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', animation: 'pulseShimmer 1.8s infinite' }} />
            <div style={{ width: '70%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', animation: 'pulseShimmer 1.8s infinite' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getBlogsAsync().then((posts) => {
      if (mounted) {
        // Filter out placeholder/draft content (e.g. title: 'hi', 'text', empty content)
        const validPosts = (posts || []).filter(p => {
          if (!p.title || !p.title.trim()) return false;
          const cleanTitle = p.title.trim().toLowerCase();
          if (['hi', 'text', 'test', '3t4wefq', 'fg', 'jhv'].includes(cleanTitle)) return false;
          if (p.status === 'draft') return false;
          return true;
        });
        setBlogPosts(validPosts);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <PageWrapper>
      <SEO
        title="Medical Articles & Surgical Guides | Dr. Suhas S Kumar Udupi"
        description="Articles and patient guides on laparoscopic surgery, hernia care, gallbladder treatment, diabetic foot, and recovery advice by Dr. Suhas S Kumar in Udupi."
        keywords="Medical Blog Udupi, Surgical Guides Udupi, Laparoscopic surgery advice Udupi, Hernia care tips Udupi, Dr Suhas S Kumar articles"
        pathname="/blog"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Medical Blog', item: `${siteSettings.siteUrl}/blog` }
          ])
        ]}
      />
      <style>{`
        @keyframes pulseShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <section className="section" style={{ paddingTop: 'clamp(6.5rem, 8vw, 7.5rem)', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="container">
          
          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <BookOpen size={36} style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }} />
            <div className="text-eyebrow" style={{ marginBottom: '1rem' }}>Knowledge & Resources</div>
            <h1 className="h-1" style={{ marginBottom: '1.5rem' }}>
              Medical Insights & <span className="text-gradient">Health Guides</span>
            </h1>
            <p className="text-lead" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
              Articles and guides on advanced surgical treatments, recovery tips, and clinical updates curated by Dr. Suhas S Kumar.
            </p>
          </div>

          {/* Content Loading Skeleton or Content */}
          {loading ? (
            <BlogSkeletonGrid />
          ) : blogPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                borderRadius: '24px',
                border: '1px dashed var(--border-subtle, rgba(255,255,255,0.15))',
                background: 'var(--bg-card, rgba(255,255,255,0.02))',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <BookOpen size={48} style={{ color: 'var(--accent-gold)', opacity: 0.5, marginBottom: '1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                No Articles Published Yet
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                Articles added through the Admin Panel will automatically appear here. Log in via the footer lock icon to publish your first post!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}
            >
              {blogPosts.map((post) => {
                const targetPath = `/blog/${post.slug || post.id}`;
                const imageUrl = (post.image && typeof post.image === 'string' && post.image.trim().length > 5)
                  ? post.image.trim()
                  : DEFAULT_BLOG_FALLBACK_IMAGE;

                return (
                  <motion.article 
                    key={post.id || post.slug}
                    variants={cardVariants}
                    style={{ height: '100%' }}
                  >
                    <Link
                      to={targetPath}
                      className="editorial-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                      aria-label={`Read full article: ${post.title}`}
                    >
                      {/* Image Frame */}
                      <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                        <img 
                          src={imageUrl} 
                          alt={post.title || 'Medical article'} 
                          loading="lazy"
                          width="800"
                          height="450"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = DEFAULT_BLOG_FALLBACK_IMAGE;
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span style={{
                          position: 'absolute',
                          top: '1.5rem',
                          left: '1.5rem',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase'
                        }}>
                          {post.category || 'General Surgery'}
                        </span>
                      </div>

                      {/* Text Body */}
                      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        
                        {/* Meta details */}
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={14} /> {post.date}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={14} /> {post.author || 'Dr. Suhas S Kumar'}
                          </span>
                        </div>

                        <h2 className="h-3" style={{ marginBottom: '1rem', lineHeight: 1.3, color: 'var(--text-primary)' }}>
                          {post.title}
                        </h2>
                        
                        <p className="text-body" style={{ flex: 1, marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
                          {post.excerpt}
                        </p>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: 'var(--accent-gold)',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '0.875rem'
                        }}>
                          Read Article <ArrowRight size={16} />
                        </div>

                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
}
