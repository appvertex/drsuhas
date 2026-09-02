import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, BookOpen, Share2, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { PageWrapper, LoadingFallback, NotFound } from '../components/common';
import { siteSettings } from '../config/siteSettings';
import { organizationSchema, breadcrumbSchema } from '../data/content';
import { getBlogsAsync } from '../utils/adminStorage';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    getBlogsAsync().then((posts) => {
      if (!mounted) return;
      const found = (posts || []).find(
        (p) => p.slug === slug || p.id === slug || String(p.id) === String(slug)
      );
      setPost(found || null);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '80vh' }}>
          <LoadingFallback />
        </div>
      </PageWrapper>
    );
  }

  if (!post) {
    return (
      <PageWrapper>
        <SEO
          title="Article Not Found"
          description="The requested medical article could not be found."
          pathname={`/blog/${slug}`}
          robots="noindex,nofollow"
        />
        <div style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center' }}>
          <NotFound />
          <div style={{ marginTop: '2rem' }}>
            <Link to="/blog" className="btn btn-premium">
              ← Back to Medical Articles
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image || 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1200&q=80',
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Dr. Suhas S Kumar',
    },
    publisher: organizationSchema,
  };

  return (
    <PageWrapper>
      <SEO
        title={`${post.title} | Medical Article by Dr. Suhas S Kumar`}
        description={post.excerpt || `Read medical article on ${post.title} by Dr. Suhas S Kumar, General & Laparoscopic Surgeon in Udupi.`}
        keywords={`${post.title}, ${post.category || 'Surgery'} Udupi, Dr Suhas S Kumar, Surgeon Udupi, Medical Guide Udupi`}
        pathname={`/blog/${post.slug || post.id}`}
        image={post.image || 'https://www.surgeonsuhas.in/images/drsuhas.webp'}
        ogType="article"
        schema={[
          organizationSchema,
          articleSchema,
          breadcrumbSchema([
            { name: 'Home', item: `${siteSettings.siteUrl}/` },
            { name: 'Blog', item: `${siteSettings.siteUrl}/blog` },
            { name: post.title, item: `${siteSettings.siteUrl}/blog/${post.slug || post.id}` },
          ]),
        ]}
      />

      <article style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          
          {/* Navigation Back Link */}
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              to="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-gold)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                marginBottom: '2rem',
              }}
            >
              <ArrowLeft size={18} /> Back to Articles
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(201,169,110,0.12)',
                border: '1px solid rgba(201,169,110,0.3)',
                padding: '0.3rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--accent-gold)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              {post.category || 'General Surgery'}
            </span>
          </motion.div>

          {/* Title - H1 */}
          <motion.h1
            className="h-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '1.5rem', lineHeight: 1.25 }}
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1.75rem',
              marginBottom: '2.5rem',
              borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} style={{ color: 'var(--accent-gold)' }} /> {post.author || 'Dr. Suhas S Kumar'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} style={{ color: 'var(--accent-gold)' }} /> {post.date}
              </span>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--bg-secondary, rgba(255,255,255,0.04))',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                borderRadius: '10px',
                padding: '0.5rem 0.9rem',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? <Check size={16} style={{ color: '#4ade80' }} /> : <Share2 size={16} />}
              {copied ? 'Link Copied!' : 'Share'}
            </button>
          </motion.div>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '3rem',
                border: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
                maxHeight: '440px',
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          )}

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              color: 'var(--text-primary)',
              lineHeight: 1.85,
              fontSize: '1.05rem',
              whiteSpace: 'pre-line',
            }}
          >
            {post.content}
          </motion.div>

          {/* Footer Consultation CTA */}
          <div
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(10,10,20,0.5) 100%)',
              border: '1px solid rgba(201,169,110,0.25)',
              textAlign: 'center',
            }}
          >
            <BookOpen size={32} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
            <h3 className="h-3" style={{ marginBottom: '0.75rem' }}>Have Questions About Surgery?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 1.5rem' }}>
              Schedule a personalized consultation with Dr. Suhas S Kumar at Deepak Hospital, Bengaluru.
            </p>
            <Link to="/contact" className="btn btn-premium">
              Book a Consultation
            </Link>
          </div>

        </div>
      </article>
    </PageWrapper>
  );
}
