import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Menu, X, ArrowRight, MapPin, Phone, Mail,
  Moon, Sun, Home, Image as ImageIcon, User, Stethoscope,
  GalleryHorizontalEnd, FileText, ChevronRight, Lock,
} from 'lucide-react';
import FloatingWhatsApp from './FloatingWhatsApp';
import ScrollToTopButton from './ScrollToTop';
import { siteSettings } from '../config/siteSettings';
import { useScrollPosition, useTheme } from '../hooks';
import { getSiteSettings, getSiteSettingsAsync } from '../utils/adminStorage';

/* ─── Static navigation config (defined outside component to prevent re-creation) ─── */
const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/about', label: 'Doctor', icon: User },
  { to: '/services', label: 'Services', icon: Stethoscope },
  { to: '/gallery', label: 'Gallery', icon: GalleryHorizontalEnd },
  { to: '/blog', label: 'Blog', icon: FileText },
  { to: '/contact', label: 'Contact', icon: Phone },
];

const BOTTOM_NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/services', label: 'Services', icon: Activity },
  { to: '/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/contact', label: 'Contact', icon: Phone },
];

const SOCIAL_ICONS = [
  {
    label: 'Facebook',
    href: siteSettings.socials.facebook,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: siteSettings.socials.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: siteSettings.socials.twitter,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: siteSettings.socials.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

/* ─── Sub-components ───────────────────────────────────────────── */

/** Memoized desktop nav link to prevent re-renders on scroll */
const DesktopNavLink = memo(({ item }) => (
  <NavLink
    to={item.to}
    end={item.end}
    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
  >
    {item.label}
  </NavLink>
));
DesktopNavLink.displayName = 'DesktopNavLink';

/** Mobile command center nav item */
const MobileNavItem = memo(({ item, onClose }) => {
  const IconComponent = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) => `cc-nav-item${isActive ? ' active' : ''}`}
      onClick={onClose}
    >
      <span className="cc-nav-icon" aria-hidden="true">
        <IconComponent size={22} strokeWidth={1.8} />
      </span>
      <span className="cc-nav-label">{item.label}</span>
      <span className="cc-nav-arrow" aria-hidden="true">
        <ChevronRight size={18} strokeWidth={2} />
      </span>
    </NavLink>
  );
});
MobileNavItem.displayName = 'MobileNavItem';

/** Footer social button */
const SocialButton = memo(({ social }) => (
  <motion.a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    className="footer-social-btn"
    aria-label={`Follow on ${social.label}`}
    whileHover={{ scale: 1.15, y: -4 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
  >
    {social.icon}
  </motion.a>
));
SocialButton.displayName = 'SocialButton';

/* ─── Main Layout ──────────────────────────────────────────────── */

import { SkipNav } from './common';

export default function Layout({ children }) {
  const scrollY = useScrollPosition();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appSettings, setAppSettings] = useState(getSiteSettings);
  const location = useLocation();

  const isScrolled = scrollY > 50;

  useEffect(() => {
    let mounted = true;
    const sync = () => {
      if (mounted) setAppSettings(getSiteSettings());
    };
    window.addEventListener('settings-changed', sync);
    window.addEventListener('storage', sync);
    getSiteSettingsAsync().then(latest => {
      if (mounted && latest) setAppSettings(latest);
    });
    return () => {
      mounted = false;
      window.removeEventListener('settings-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Close mobile menu and track pageview in Google Analytics on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-ZD30GD9423', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMenuClose = useCallback(() => setMobileMenuOpen(false), []);
  const handleMenuToggle = useCallback(() => setMobileMenuOpen(prev => !prev), []);

  return (
    <div className="app-container">
      <SkipNav />
      {/* ─── Header / Navbar ─────────────────────────────────────── */}
      <header
        className={`navbar${isScrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="container nav-container">
          <Link className="nav-brand" to="/" aria-label="Dr. Suhas S Kumar – Home">
            <Activity className="nav-brand-icon" size={24} aria-hidden="true" />
            <span>Dr. Suhas</span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map(item => (
              <DesktopNavLink key={item.to} item={item} />
            ))}
            <Link to="/contact" className="btn btn-premium" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
              Book Visit
            </Link>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={handleMenuToggle}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Command Center ────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="cc-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleMenuClose}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="cc-panel"
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cc-noise" aria-hidden="true" />
              <div className="cc-glow" aria-hidden="true" />
              <div className="cc-inner-highlight" aria-hidden="true" />

              <div className="cc-header">
                <div className="cc-brand" aria-hidden="true">
                  <Activity size={22} strokeWidth={2.2} />
                  <span>Dr. Suhas</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={toggleTheme}
                    className="theme-switch"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    style={{ transform: 'scale(0.85)' }}
                  >
                    <div className="theme-switch-thumb" />
                    <div className="theme-switch-icon sun"><Sun size={18} aria-hidden="true" /></div>
                    <div className="theme-switch-icon moon"><Moon size={18} aria-hidden="true" /></div>
                  </button>
                  <motion.button
                    className="cc-close-btn"
                    onClick={handleMenuClose}
                    aria-label="Close menu"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={18} strokeWidth={2.5} aria-hidden="true" />
                  </motion.button>
                </div>
              </div>

              <nav className="cc-nav" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MobileNavItem item={item} onClose={handleMenuClose} />
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="cc-cta-wrap"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.06 + NAV_ITEMS.length * 0.04, duration: 0.3 }}
              >
                <Link to="/contact" className="cc-cta-btn" onClick={handleMenuClose}>
                  <span>Book Consultation</span>
                  <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─────────────────────────────────────────── */}
      <main id="main-content" className="main-content" role="main" tabIndex={-1}>
        {children}
      </main>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer
        className="site-footer"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)' }} aria-hidden="true" />

        <motion.div
          className="container footer-top"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
        >
          {/* Brand Column */}
          <motion.div
            className="footer-brand-col"
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Activity size={22} style={{ color: 'var(--accent-gold)' }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                Dr. Suhas S Kumar
              </span>
            </div>
            <p className="text-body" style={{ marginBottom: '1.75rem', maxWidth: '340px', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Advanced surgical care with compassion. Specialising in laparoscopy, hernia repair, and complex abdominal procedures.
            </p>
            <Link to="/contact" className="btn btn-premium" style={{ fontSize: '0.875rem', padding: '0.65rem 1.4rem' }}>
              Book Consultation <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Contact & Locations Column */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            <address style={{ fontStyle: 'normal' }}>
              <div className="footer-section-label">Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a href={`https://wa.me/${(appSettings.floatingWhatsApp || '919538765487').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                  <span className="footer-icon-wrap" aria-hidden="true"><Phone size={15} /></span>
                  <span className="footer-link-text">{appSettings.phone || siteSettings.phone}</span>
                </a>
                <a href={`mailto:${appSettings.email || siteSettings.email}`} className="footer-contact-link">
                  <span className="footer-icon-wrap" aria-hidden="true"><Mail size={15} /></span>
                  <span className="footer-link-text">{appSettings.email || siteSettings.email}</span>
                </a>
                {appSettings.email2 && (
                  <a href={`mailto:${appSettings.email2}`} className="footer-contact-link">
                    <span className="footer-icon-wrap" aria-hidden="true"><Mail size={15} /></span>
                    <span className="footer-link-text">{appSettings.email2}</span>
                  </a>
                )}
              </div>
            </address>

            <div>
              <div className="footer-section-label">Locations</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {siteSettings.locations.map((loc, i) => (
                  <a
                    key={i}
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                    style={{ alignItems: 'flex-start', textDecoration: 'none', cursor: 'pointer' }}
                    aria-label={`Open ${loc.name} in Google Maps`}
                  >
                    <span className="footer-icon-wrap" style={{ marginTop: '2px' }} aria-hidden="true"><MapPin size={15} /></span>
                    <span>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{loc.name}</strong>
                      <br />
                      <span className="footer-link-text">{loc.address.split(',')[0]}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Social Column - Only shown if verified profiles exist */}
          {(() => {
            const genericUrls = ['https://facebook.com', 'https://instagram.com', 'https://twitter.com', 'https://linkedin.com', ''];
            const activeSocials = SOCIAL_ICONS.filter(s => s.href && !genericUrls.includes(s.href.replace(/\/$/, '')));
            if (activeSocials.length === 0) return null;
            return (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              >
                <div className="footer-section-label">Follow Us</div>
                <p className="text-body" style={{ marginBottom: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Stay connected for surgical updates and patient stories.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {activeSocials.map(social => (
                    <SocialButton key={social.label} social={social} />
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </motion.div>

        {/* Footer bottom bar */}
        <div className="footer-bottom-bar">
          <div className="container footer-bottom">
            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <span className="footer-copyright">
                &copy; {appSettings.copyrightYear || '2026'} Dr. Suhas S Kumar.
              </span>
              <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <Link to="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
                <span>·</span>
                <Link to="/terms-and-conditions" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
                <span>·</span>
                <Link to="/disclaimer" style={{ color: 'inherit', textDecoration: 'none' }}>Disclaimer</Link>
              </div>
            </div>
            <div className="footer-credits-wrapper" style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
              <a href="https://appvertex.in" target="_blank" rel="noopener noreferrer" className="footer-credits credit-line" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>Powered by</span>
                <span className="appvertex-badge" aria-label="Appvertex">A</span>
                <span style={{ fontWeight: 600 }}>Appvertex</span>
              </a>
            </div>
            <div style={{ flex: '1 1 0%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={toggleTheme}
                className="theme-switch"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="theme-switch-thumb" />
                <div className="theme-switch-icon sun"><Sun size={18} aria-hidden="true" /></div>
                <div className="theme-switch-icon moon"><Moon size={18} aria-hidden="true" /></div>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Bottom Navigation ─────────────────────────────── */}
      <nav
        className="bottom-nav"
        style={{ zIndex: 100 }}
        aria-label="Mobile bottom navigation"
      >
        {BOTTOM_NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
              aria-label={item.label}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ─── Floating Widgets ─────────────────────────────────────── */}
      <div style={{ zIndex: 100, position: 'relative' }}>
        <FloatingWhatsApp />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
