import React, { Component, Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LoadingFallback, NotFound } from './components/common';
import SEO from './components/SEO';

import HomePage from './pages/HomePage';

/**
 * Robust lazy import with automatic retry and auto-reload on stale bundle deployment.
 * Prevents "Failed to fetch dynamically imported module" errors when a new site version is published.
 */
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageRefreshed = sessionStorage.getItem('chunk_refreshed') === '1';
    try {
      const component = await componentImport();
      sessionStorage.setItem('chunk_refreshed', '0');
      return component;
    } catch (error) {
      if (!pageRefreshed) {
        sessionStorage.setItem('chunk_refreshed', '1');
        window.location.reload();
      }
      throw error;
    }
  });
}

/**
 * Error boundary component to gracefully handle chunk load failures during deployments
 */
class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const errorMsg = error?.message || '';
    if (
      errorMsg.includes('dynamically imported module') ||
      errorMsg.includes('Loading chunk') ||
      errorMsg.includes('Failed to fetch')
    ) {
      const refreshed = sessionStorage.getItem('chunk_refreshed') === '1';
      if (!refreshed) {
        sessionStorage.setItem('chunk_refreshed', '1');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-primary)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Updating Application…</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>A new version of the site has been deployed.</p>
          <button
            onClick={() => {
              sessionStorage.setItem('chunk_refreshed', '0');
              window.location.reload();
            }}
            className="btn btn-premium"
          >
            Refresh Now
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ServicesPage = lazyWithRetry(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazyWithRetry(() => import('./pages/ServiceDetailPage'));
const GalleryPage = lazyWithRetry(() => import('./pages/GalleryPage'));
const BlogPage = lazyWithRetry(() => import('./pages/BlogPage'));
const BlogPostPage = lazyWithRetry(() => import('./pages/BlogPostPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage'));
const DisclaimerPage = lazyWithRetry(() => import('./pages/DisclaimerPage'));

/* Admin pages inside head folder */
const AdminLogin = lazyWithRetry(() => import('./pages/head/AdminLogin'));
const AdminDashboard = lazyWithRetry(() => import('./pages/head/AdminDashboard'));
const AdminBlog = lazyWithRetry(() => import('./pages/head/AdminBlog'));
const AdminGallery = lazyWithRetry(() => import('./pages/head/AdminGallery'));
const AdminSettings = lazyWithRetry(() => import('./pages/head/AdminSettings'));

function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The requested page could not be found."
        pathname="/404"
        robots="noindex,nofollow"
      />
      <NotFound />
    </>
  );
}

export default function App() {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Hidden Admin Routes */}
          <Route path="/head/admin/login" element={<AdminLogin />} />
          <Route path="/head/admin" element={<Navigate to="/head/admin/blog" replace />} />
          <Route path="/head/admin/blog" element={<AdminBlog />} />
          <Route path="/head/admin/gallery" element={<AdminGallery />} />
          <Route path="/head/admin/settings" element={<AdminSettings />} />

          {/* Public Website Routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/services/:slug" element={<Layout><ServiceDetailPage /></Layout>} />
          <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicyPage /></Layout>} />
          <Route path="/terms-and-conditions" element={<Layout><TermsPage /></Layout>} />
          <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />

          {/* Catch-all 404 route */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </Suspense>
    </ChunkErrorBoundary>
  );
}
