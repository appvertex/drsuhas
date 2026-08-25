import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen, X } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { getBlogs } from '../utils/adminStorage';

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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setBlogPosts(getBlogs());
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

          {/* Blog Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}
          >
            {blogPosts.map((post) => (
              <motion.article 
                key={post.slug}
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
                    src={post.image} 
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
                    {post.category}
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
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Read Full Article <ArrowRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Article Reader Modal */}
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
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)',
                maxWidth: '750px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                padding: '2.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                }}
              >
                <X size={20} />
              </button>

              <span style={{
                display: 'inline-block',
                background: 'var(--border-subtle)',
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                marginBottom: '1rem'
              }}>
                {selectedPost.category}
              </span>

              <h2 className="h-2" style={{ marginBottom: '1rem', lineHeight: 1.2 }}>
                {selectedPost.title}
              </h2>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> {selectedPost.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={14} /> {selectedPost.author}
                </span>
              </div>

              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }}
              />

              <div style={{ whiteSpace: 'pre-line', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem' }}>
                {selectedPost.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
