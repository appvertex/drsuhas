import React, { useState } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { isAdminAuthed, setAdminAuth } from '../../utils/adminStorage';
import {
  LayoutDashboard, Activity, Users, Globe, FileText, Stethoscope,
  Image as ImageIcon, BookOpen, Calendar, Mail, Search,
  Zap, Smartphone, MapPin, Layers, Target, BarChart2, Settings,
  ChevronLeft, ChevronRight, LogOut, ExternalLink
} from 'lucide-react';

export const ADMIN_NAV_ITEMS = [
  {
    group: 'CONTENT MANAGEMENT',
    items: [
      { to: '/admin/blog', id: 'admin-blog', label: 'Manage Blog Posts', icon: BookOpen },
      { to: '/admin/gallery', id: 'admin-gallery', label: 'Manage Gallery Images', icon: ImageIcon },
    ]
  },
  {
    group: 'ANALYTICS & TELEMETRY',
    items: [
      { to: '/admin', id: 'overview', end: true, label: 'Dashboard Overview', icon: LayoutDashboard },
      { to: '/admin?tab=realtime', id: 'realtime', label: 'Realtime Telemetry', icon: Activity, badge: 'Live' },
      { to: '/admin?tab=visitors', id: 'visitors', label: 'Visitors & Cohorts', icon: Users },
      { to: '/admin?tab=traffic', id: 'traffic', label: 'Traffic Channels', icon: Globe },
      { to: '/admin?tab=pages', id: 'pages', label: 'Top Pages', icon: FileText },
      { to: '/admin?tab=services', id: 'services', label: 'Surgical Services', icon: Stethoscope },
      { to: '/admin?tab=appointments-analytics', id: 'appointments-analytics', label: 'Appointments Log', icon: Calendar },
      { to: '/admin?tab=contact-analytics', id: 'contact-analytics', label: 'Contact Messages', icon: Mail },
      { to: '/admin?tab=seo', id: 'seo', label: 'Search Console & SEO', icon: Search },
      { to: '/admin?tab=performance', id: 'performance', label: 'Core Web Vitals', icon: Zap },
      { to: '/admin?tab=devices', id: 'devices', label: 'Devices & Browsers', icon: Smartphone },
      { to: '/admin?tab=countries', id: 'countries', label: 'Visitor Locations', icon: MapPin },
      { to: '/admin?tab=events', id: 'events', label: 'Event Log Stream', icon: Layers },
      { to: '/admin?tab=conversions', id: 'conversions', label: 'Conversions & Funnel', icon: Target },
      { to: '/admin?tab=reports', id: 'reports', label: 'Reports', icon: BarChart2 },
      { to: '/admin?tab=settings', id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function AdminLayout({ children, currentTab, onTabSelect }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" replace />;
  }

  function handleLogout() {
    setAdminAuth(false);
    navigate('/admin/login');
  }

  return (
    <div style={s.shell}>
      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside style={{ ...s.sidebar, width: collapsed ? '70px' : '260px' }}>
        <div style={s.sidebarInner}>
          
          {/* Header & Brand */}
          <div style={s.brandRow}>
            <div style={s.brandIcon}>
              <Activity size={22} style={{ color: '#c9a96e' }} />
            </div>
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.brandName}>Admin Portal</div>
                <div style={s.brandSub}>Dr. Suhas S Kumar</div>
              </div>
            )}
            <button
              onClick={() => setCollapsed(c => !c)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              style={s.collapseBtn}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <div style={s.divider} />

          {/* Navigation Groups */}
          <nav style={s.navScroll}>
            {ADMIN_NAV_ITEMS.map((grp, gIdx) => (
              <div key={gIdx} style={{ marginBottom: '1.25rem' }}>
                {!collapsed && <div style={s.navGroupTitle}>{grp.group}</div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isPageLink = item.to.startsWith('/admin/blog') || item.to.startsWith('/admin/gallery');
                    const isActive = isPageLink
                      ? window.location.pathname === item.to
                      : onTabSelect
                      ? currentTab === item.id
                      : window.location.pathname === item.to;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (isPageLink) {
                            navigate(item.to);
                          } else if (onTabSelect && item.to.startsWith('/admin?tab=')) {
                            onTabSelect(item.id);
                          } else {
                            navigate(item.to);
                          }
                        }}
                        title={collapsed ? item.label : undefined}
                        style={{
                          ...s.navItem,
                          ...(isActive ? (isPageLink ? s.navItemContentActive : s.navItemActive) : {}),
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          padding: collapsed ? '0.65rem' : '0.6rem 0.75rem',
                        }}
                      >
                        <Icon size={18} style={{ opacity: isActive ? 1 : 0.75, flexShrink: 0 }} />
                        {!collapsed && (
                          <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        )}
                        {!collapsed && item.badge && (
                          <span style={s.liveBadge}>{item.badge}</span>
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

          {/* Footer Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...s.siteLink, justifyContent: collapsed ? 'center' : 'flex-start' }}
              title={collapsed ? 'View Website' : undefined}
            >
              <ExternalLink size={16} />
              {!collapsed && <span>View Website</span>}
            </a>

            <button
              onClick={handleLogout}
              style={{ ...s.logoutBtn, justifyContent: collapsed ? 'center' : 'flex-start' }}
              title={collapsed ? 'Log Out' : undefined}
            >
              <LogOut size={16} />
              {!collapsed && <span>Log Out</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* ── Main Area ──────────────────────────────────────── */}
      <main style={s.main}>
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
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'rgba(201,169,110,0.12)',
    border: '1px solid rgba(201,169,110,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: 'rgba(201,169,110,0.85)',
    padding: '0 0.5rem',
    marginBottom: '0.4rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  navItemActive: {
    background: 'rgba(59,130,246,0.18)',
    color: '#60a5fa',
    fontWeight: 600,
  },
  navItemContentActive: {
    background: 'rgba(201,169,110,0.18)',
    color: '#c9a96e',
    fontWeight: 600,
  },
  liveBadge: {
    background: 'rgba(16,185,129,0.15)',
    color: '#10b981',
    border: '1px solid rgba(16,185,129,0.3)',
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '0.1rem 0.4rem',
    borderRadius: '999px',
    textTransform: 'uppercase',
  },
  siteLink: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.6rem 0.75rem', borderRadius: '10px',
    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
    fontSize: '0.82rem', fontWeight: 500,
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.6rem 0.75rem', borderRadius: '10px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171', cursor: 'pointer',
    fontSize: '0.82rem', fontWeight: 600,
    width: '100%',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    background: '#0a0a12',
    minHeight: '100vh',
  },
};
