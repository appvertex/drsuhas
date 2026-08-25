import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LoadingFallback } from './components/common';
import { NotFound } from './components/common';
import SEO from './components/SEO';

/**
 * Route-level code splitting with React.lazy.
 * Each page is a separate JS chunk, loaded only when navigated to.
 * This dramatically reduces initial bundle size and improves LCP.
 */
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

/* Admin pages inside head folder */
const AdminLogin = lazy(() => import('./pages/head/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/head/AdminDashboard'));
const AdminBlog = lazy(() => import('./pages/head/AdminBlog'));
const AdminGallery = lazy(() => import('./pages/head/AdminGallery'));

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
        {/* Admin Routes (Custom standalone layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />

        {/* Website Routes */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Catch-all 404 route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}
