import React, { Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LoadingFallback } from './components/common';
import { NotFound } from './components/common';
import SEO from './components/SEO';

/**
 * Route-level code splitting with React.lazy.
 * Each page is a separate JS chunk, loaded only when navigated to.
 * This dramatically reduces initial bundle size and improves LCP.
 */
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));

/* Admin pages inside head folder */
const AdminLogin = lazy(() => import('./pages/head/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/head/AdminDashboard'));
const AdminBlog = lazy(() => import('./pages/head/AdminBlog'));
const AdminGallery = lazy(() => import('./pages/head/AdminGallery'));
const AdminSettings = lazy(() => import('./pages/head/AdminSettings'));

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
  );
}
