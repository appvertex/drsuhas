import React from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { isAdminAuthed, setAdminAuth } from '../../utils/adminStorage';

const NAV = [
  {
    to: '/admin',
    end: true,
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    to: '/admin/blog',
    label: 'Blog Posts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    to: '/admin/gallery',
    label: 'Gallery',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }

  function handleLogout() {
    setAdminAuth(false);
    navigate('/admin/login');
  }

  return (
    <div style={styles.shell}>
      {/* ─── Sidebar ────────────────────────────────── */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarInner}>
          {/* Brand */}
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style={styles.brandName}>Admin Portal</div>
              <div style={styles.brandSub}>Dr. Suhas S Kumar</div>
            </div>
          </div>

          <div style={styles.divider} />

          {/* Nav */}
          <nav style={styles.nav}>
            <div style={styles.navLabel}>Content</div>
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.navLinkActive : {}),
                })}
              >
                <span style={{ opacity: 0.8 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* View Site link */}
          <a href="/" target="_blank" rel="noopener noreferrer" style={styles.siteLink}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Website
          </a>

          {/* Logout */}
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* ─── Main area ──────────────────────────────── */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  shell: {
    display: 'flex', minHeight: '100vh',
    background: '#0d0d14',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  sidebar: {
    width: '260px', flexShrink: 0,
    background: 'rgba(255,255,255,0.03)',
    borderRight: '1px solid rgba(255,255,255,0.07)',
    position: 'sticky', top: 0, height: '100vh',
    overflowY: 'auto',
  },
  sidebarInner: {
    display: 'flex', flexDirection: 'column',
    height: '100%', padding: '1.5rem 1rem',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.5rem 0.5rem 1rem',
  },
  brandIcon: {
    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
    background: 'rgba(201,169,110,0.12)',
    border: '1px solid rgba(201,169,110,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  brandName: { color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 },
  brandSub: { color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: '2px' },
  divider: {
    height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0.5rem 0 1rem',
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  navLabel: {
    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
    padding: '0 0.5rem', marginBottom: '0.25rem',
  },
  navLink: {
    display: 'flex', alignItems: 'center', gap: '0.65rem',
    padding: '0.7rem 0.75rem', borderRadius: '10px',
    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
    fontSize: '0.88rem', fontWeight: 500,
    transition: 'background 0.15s, color 0.15s',
  },
  navLinkActive: {
    background: 'rgba(201,169,110,0.12)',
    color: '#c9a96e',
  },
  siteLink: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.6rem 0.75rem', borderRadius: '10px',
    color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
    fontSize: '0.8rem', marginBottom: '0.5rem',
    transition: 'color 0.15s',
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.7rem 0.75rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.15)',
    color: '#f87171', cursor: 'pointer',
    fontSize: '0.85rem', fontWeight: 500,
    transition: 'background 0.15s',
    width: '100%',
  },
  main: {
    flex: 1, overflowY: 'auto',
    background: '#0d0d14',
  },
};
