import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { isAdminAuthed, setAdminAuth } from '../../utils/adminStorage';
import {
  Activity, Image as ImageIcon, BookOpen, Settings,
  ChevronLeft, ChevronRight, LogOut, ExternalLink, Menu, X
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  {
    group: 'CONTENT MANAGEMENT',
    items: [
      { to: '/head/admin/blog',     id: 'admin-blog',     label: 'Manage Blog Posts',    icon: BookOpen   },
      { to: '/head/admin/gallery',  id: 'admin-gallery',  label: 'Manage Gallery Images', icon: ImageIcon  },
      { to: '/head/admin/settings', id: 'admin-settings', label: 'Site Settings',         icon: Settings   },
    ]
  }
];

export default function AdminLayout({ children }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed,    setCollapsed]    = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [isMobile,     setIsMobile]     = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Inject admin-wide responsive CSS
  useEffect(() => {
    const id = 'admin-mobile-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = `
        /* Admin page containers */
        .admin-page { padding: clamp(1rem, 4vw, 2.5rem); max-width: 1100px; margin: 0 auto; position: relative; }
        .admin-settings-container { padding: clamp(1rem, 4vw, 2rem) !important; }
        /* Admin grids: collapse to 1 col on mobile */
        @media (max-width: 600px) {
          [data-admin-grid] { grid-template-columns: 1fr !important; gap: 1rem !important; }
          [data-admin-fields] { grid-template-columns: 1fr !important; gap: 1rem !important; }
          [data-admin-header] { flex-direction: column !important; align-items: flex-start !important; }
          [data-admin-header] > * { width: 100% !important; }
          [data-admin-actions] { flex-wrap: wrap !important; gap: 0.5rem !important; }
          [data-admin-actions] button,
          [data-admin-actions] a { font-size: 0.82rem !important; padding: 0.6rem 1rem !important; }
          /* Blog/Gallery page padding */
          [data-admin-page] { padding: 1rem !important; }
          /* Wider cards on small screens */
          [data-admin-card] { padding: 1.25rem !important; border-radius: 14px !important; }
          /* Form fields single-column */
          [data-admin-fields-single] { max-width: 100% !important; }
          /* Stats cards row → stack */
          [data-stats-row] { flex-direction: column !important; gap: 0.75rem !important; }
          /* Image upload grid */
          [data-upload-grid] { grid-template-columns: repeat(2, 1fr) !important; }
          /* Blog cards */
          [data-blog-card] { padding: 1rem !important; }
          /* Action buttons in blog/gallery cards */
          [data-card-actions] { flex-direction: row !important; flex-wrap: wrap !important; gap: 0.4rem !important; }
          /* Settings preview sidebar: unstick on mobile */
          [data-admin-preview] { position: static !important; }
          /* Settings page title */
          [data-admin-page] h1 { font-size: 1.3rem !important; }
        }
        @media (max-width: 400px) {
          [data-upload-grid] { grid-template-columns: 1fr !important; }
        }
      `;
      document.head.appendChild(el);
    }
    return () => {};
  }, []);

  if (!isAdminAuthed()) {
    return <Navigate to="/head/admin/login" replace />;
  }

  function handleLogout() {
    setAdminAuth(false);
    navigate('/head/admin/login');
  }

  const sidebarWidth = isMobile ? '260px' : (collapsed ? '70px' : '260px');

  /* ── Sidebar content (shared between desktop sidebar & mobile drawer) ── */
  const SidebarContent = () => (
    <div style={s.sidebarInner}>
      {/* Brand */}
      <div style={s.brandRow}>
        <div style={s.brandIcon}>
          <Activity size={22} style={{ color: '#c9a96e' }} />
        </div>
        {(!collapsed || isMobile) && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={s.brandName}>Admin Portal</div>
            <div style={s.brandSub}>Dr. Suhas S Kumar</div>
          </div>
        )}
        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            style={s.collapseBtn}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
        {/* Mobile close button */}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={s.collapseBtn}>
            <X size={16} />
          </button>
        )}
      </div>

      <div style={s.divider} />

      {/* Nav */}
      <nav style={s.navScroll}>
        {ADMIN_NAV_ITEMS.map((grp, gIdx) => (
          <div key={gIdx} style={{ marginBottom: '1.25rem' }}>
            {(!collapsed || isMobile) && (
              <div style={s.navGroupTitle}>{grp.group}</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {grp.items.map((item) => {
                const Icon     = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.to)}
                    title={(collapsed && !isMobile) ? item.label : undefined}
                    style={{
                      ...s.navItem,
                      ...(isActive ? s.navItemActive : {}),
                      justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
                      padding:        (collapsed && !isMobile) ? '0.65rem' : '0.65rem 0.75rem',
                    }}
                  >
                    <Icon size={18} style={{ opacity: isActive ? 1 : 0.75, flexShrink: 0 }} />
                    {(!collapsed || isMobile) && (
                      <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {item.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div style={{ flex: 1 }} />
      <div style={s.divider} />

      {/* Footer actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...s.siteLink, justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start' }}
          title={(collapsed && !isMobile) ? 'View Website' : undefined}
        >
          <ExternalLink size={16} />
          {(!collapsed || isMobile) && <span>View Website</span>}
        </a>
        <button
          onClick={handleLogout}
          style={{ ...s.logoutBtn, justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start' }}
          title={(collapsed && !isMobile) ? 'Log Out' : undefined}
        >
          <LogOut size={16} />
          {(!collapsed || isMobile) && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div style={s.shell}>
      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      {!isMobile && (
        <aside style={{ ...s.sidebar, width: sidebarWidth }}>
          <SidebarContent />
        </aside>
      )}

      {/* ── Mobile: Top Bar + Drawer ────────────────────────── */}
      {isMobile && (
        <>
          {/* Top bar */}
          <div style={s.mobileTopBar}>
            <button onClick={() => setMobileOpen(true)} style={s.hamburger}>
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ ...s.brandIcon, width: '30px', height: '30px', borderRadius: '8px' }}>
                <Activity size={16} style={{ color: '#c9a96e' }} />
              </div>
              <div style={s.brandName}>Admin Portal</div>
            </div>
            <button onClick={handleLogout} style={s.mobileLogoutBtn}>
              <LogOut size={18} />
            </button>
          </div>

          {/* Drawer overlay */}
          {mobileOpen && (
            <div
              style={s.drawerOverlay}
              onClick={() => setMobileOpen(false)}
            />
          )}

          {/* Drawer */}
          <aside style={{
            ...s.sidebar,
            width: '260px',
            position: 'fixed',
            top: 0, left: 0, bottom: 0,
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            zIndex: 1001,
          }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Content ─────────────────────────────────────── */}
      <main style={{
        ...s.main,
        paddingTop: isMobile ? '56px' : 0,
      }}>
        {children}
      </main>
    </div>
  );
}

const s = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0a0a12',
    color: '#fff',
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
  },
  sidebar: {
    flexShrink: 0,
    background: 'rgba(15,15,26,0.98)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    position: 'sticky',
    top: 0,
    height: '100vh',
    transition: 'width 0.25s ease',
    zIndex: 100,
    overflowY: 'auto',
  },
  sidebarInner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1.25rem 0.85rem',
    boxSizing: 'border-box',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.2rem 0.2rem 0.6rem',
  },
  brandIcon: {
    width: '38px', height: '38px',
    borderRadius: '10px',
    background: 'rgba(201,169,110,0.12)',
    border: '1px solid rgba(201,169,110,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  brandName: { color: '#fff', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 },
  brandSub:  { color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' },
  collapseBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.6)',
    width: '28px', height: '28px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  },
  divider: { height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0.75rem 0' },
  navScroll: { overflowY: 'auto', flex: 1, paddingRight: '2px' },
  navGroupTitle: {
    fontSize: '0.65rem', fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'rgba(201,169,110,0.85)',
    padding: '0 0.5rem', marginBottom: '0.4rem',
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '0.65rem',
    width: '100%', background: 'transparent', border: 'none',
    borderRadius: '10px', color: 'rgba(255,255,255,0.65)',
    fontSize: '0.88rem', fontWeight: 500, cursor: 'pointer',
    textAlign: 'left', transition: 'all 0.15s ease',
    minHeight: '44px',
  },
  navItemActive: {
    background: 'rgba(201,169,110,0.18)',
    color: '#c9a96e', fontWeight: 600,
  },
  siteLink: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 0.75rem', borderRadius: '10px',
    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
    fontSize: '0.84rem', fontWeight: 500, minHeight: '44px',
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.65rem 0.75rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171', cursor: 'pointer',
    fontSize: '0.84rem', fontWeight: 600,
    width: '100%', minHeight: '44px',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    background: '#0a0a12',
    minHeight: '100vh',
    minWidth: 0,
  },
  /* Mobile-specific */
  mobileTopBar: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    height: '56px',
    background: 'rgba(15,15,26,0.98)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  },
  hamburger: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.8)',
    width: '40px', height: '40px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  mobileLogoutBtn: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    color: '#f87171',
    width: '40px', height: '40px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  drawerOverlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(2px)',
    zIndex: 1000,
  },
};
