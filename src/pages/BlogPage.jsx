import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, X, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { getBlogsAsync } from '../utils/adminStorage';

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
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    getBlogsAsync().then((posts) => {
      if (mounted) {
        setBlogPosts(posts || []);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    if (selectedPost) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  return (
    <PageWrapper>
      <SEO
        title="Medical Articles & Surgical Guides"
        description="Articles and patient guides on laparoscopic surgery, hernia care, diabetic foot, and recovery by Dr. Suhas S Kumar."
        pathname="/blog"
        schema={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Blog', item: `${siteSettings.siteUrl}/blog` }
          ])
        ]}
      />
      <style>{`
        @keyframes pulseShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <section className="section" style={{ paddingTop: '160px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
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
              {blogPosts.map((post) => (
                <motion.article 
                  key={post.id || post.slug}
                  variants={cardVariants}
                  className="editorial-card"
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPost(post);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read full article: ${post.title}`}
                  style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', cursor: 'pointer' }}
                >
                  {/* Image Frame */}
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={post.image || 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80'} 
                      alt={post.title} 
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
                      {post.category || 'Medical'}
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
                        <User size={14} /> {post.author}
                      </span>
                    </div>

                    <h3 className="h-3" style={{ marginBottom: '1rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    
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
                </motion.article>
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '24px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                <img
                  src={selectedPost.image || 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} /> {selectedPost.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} /> {selectedPost.author}
                  </span>
                </div>

                <h2 className="h-2" style={{ marginBottom: '2rem' }}>{selectedPost.title}</h2>

                <div
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {selectedPost.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
