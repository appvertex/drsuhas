import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getRealAnalyticsMetrics } from '../../utils/analyticsTracker';
import {
  MOCK_KPIS, MOCK_TIMESERIES_DAILY, MOCK_TRAFFIC_CHANNELS, MOCK_TOP_PAGES,
  MOCK_SERVICES_ANALYTICS, MOCK_DEVICES, DATE_RANGES
} from './analytics/analyticsData';
import { SparklineChart, LineAreaChart, HorizontalBarChart, DonutChart } from './analytics/AnalyticsCharts';
import {
  RealtimeView, VisitorsView, TrafficView, PagesView, ServicesView,
  AppointmentsView, SEOView, PerformanceView, DevicesView, CountriesView
} from './analytics/AnalyticsViews';
import {
  Search, Calendar as CalendarIcon, RefreshCw, Download, Sun, Moon,
  Bell, User, TrendingUp, TrendingDown, ArrowUpRight, CheckCircle2,
  Sliders, ShieldCheck, Zap, BarChart2
} from 'lucide-react';

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  // Real Telemetry Data
  const [realMetrics, setRealMetrics] = useState(getRealAnalyticsMetrics);

  useEffect(() => {
    const refreshData = () => setRealMetrics(getRealAnalyticsMetrics());
    window.addEventListener('storage', refreshData);
    const timer = setInterval(refreshData, 3500);
    return () => {
      window.removeEventListener('storage', refreshData);
      clearInterval(timer);
    };
  }, []);

  // Global Controls State
  const [dateRange, setDateRange]       = useState('30d');
  const [comparePrev, setComparePrev]   = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [theme, setTheme]               = useState('dark'); // 'dark' | 'light'
  const [autoRefresh, setAutoRefresh]   = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastMsg, setToastMsg]         = useState('');

  const isDark = theme === 'dark';

  const handleTabSelect = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('✓ Analytics data refreshed');
    }, 600);
  };

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  const handleGlobalExport = (type) => {
    showToast(`✓ Exported ${type.toUpperCase()} analytics report`);
  };

  return (
    <AdminLayout currentTab={currentTab} onTabSelect={handleTabSelect}>
      <div style={{ ...styles.page, background: isDark ? '#0a0a12' : '#f8fafc', color: isDark ? '#fff' : '#0f172a' }}>

        {/* ── Toast Notification ─────────────────────────────────────────────── */}
        {toastMsg && (
          <div style={styles.toast}>
            {toastMsg}
          </div>
        )}

        {/* ── Top Header Bar ──────────────────────────────────────────────────── */}
        <header style={{ ...styles.topHeader, background: isDark ? 'rgba(15,15,26,0.85)' : 'rgba(255,255,255,0.85)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
          
          {/* Global Search Input */}
          <div style={styles.searchWrap}>
            <Search size={16} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }} />
            <input
              type="text"
              placeholder="Search metrics, reports, services, or keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ ...styles.searchInput, color: isDark ? '#fff' : '#111', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
            />
          </div>

          {/* Action Toolbar */}
          <div style={styles.toolbar}>
            
            {/* Date Range Selector */}
            <div style={styles.dateSelectorWrap}>
              <CalendarIcon size={15} style={{ color: '#3b82f6' }} />
              <select
                value={dateRange}
                onChange={e => setDateRange(e.target.value)}
                style={{ ...styles.selectInput, color: isDark ? '#fff' : '#111', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                {DATE_RANGES.map(d => (
                  <option key={d.id} value={d.id} style={{ background: isDark ? '#12121e' : '#fff', color: isDark ? '#fff' : '#111' }}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Compare Toggle */}
            <button
              onClick={() => setComparePrev(c => !c)}
              style={{
                ...styles.toolBtn,
                background: comparePrev ? 'rgba(59,130,246,0.15)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                color: comparePrev ? '#60a5fa' : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'),
                border: `1px solid ${comparePrev ? 'rgba(59,130,246,0.3)' : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
              }}
              title="Compare with Previous Period"
            >
              <Sliders size={14} />
              <span>Compare</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              style={{ ...styles.toolBtn, color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
              title="Refresh Data"
            >
              <RefreshCw size={14} style={{ animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none' }} />
            </button>

            {/* Export Dropdown */}
            <button
              onClick={() => handleGlobalExport('csv')}
              style={styles.exportBtn}
              title="Export Report CSV"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} style={styles.iconBtn} title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
              {isDark ? <Sun size={17} style={{ color: '#f59e0b' }} /> : <Moon size={17} style={{ color: '#3b82f6' }} />}
            </button>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifications(s => !s)} style={styles.iconBtn} title="Notifications">
                <Bell size={17} />
                <span style={styles.notifBadge}>3</span>
              </button>

              {showNotifications && (
                <div style={{ ...styles.notifDropdown, background: isDark ? '#13131e' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}` }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, fontWeight: 700, fontSize: '0.85rem' }}>
                    Notifications
                  </div>
                  <div style={{ padding: '0.5rem 0' }}>
                    <div style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                      <strong style={{ color: '#10b981' }}>New Booking:</strong> Consultation for Hernia Surgery requested.
                    </div>
                    <div style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}` }}>
                      <strong style={{ color: '#3b82f6' }}>Traffic Spike:</strong> +34% visitors from Organic Search today.
                    </div>
                    <div style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                      <strong style={{ color: '#c9a96e' }}>SEO Ranking:</strong> Keyword "#1 laparoscopic surgeon" moved to #1.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div style={styles.adminProfile}>
              <div style={styles.avatar}>
                <User size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Dr. Suhas</span>
                <span style={{ fontSize: '0.68rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Administrator</span>
              </div>
            </div>

          </div>
        </header>

        {/* ── Main Dashboard Content ──────────────────────────────────────────── */}
        <div style={styles.contentBody}>

          {/* Tab Header Title */}
          <div style={styles.tabHeader}>
            <div>
              <h1 style={styles.tabTitle}>
                {currentTab === 'overview' ? 'Executive Analytics Dashboard' : currentTab.toUpperCase()}
              </h1>
              <p style={styles.tabSub}>
                Real-time patient traffic, surgical service performance, conversions, and SEO metrics.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={styles.livePulseDot} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#10b981' }}>Live Telemetry Active</span>
            </div>
          </div>

          {/* ── 1. OVERVIEW TAB VIEW ────────────────────────────────────────── */}
          {currentTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* KPI Cards Grid */}
              <div style={styles.kpiGrid}>
                {Object.entries(MOCK_KPIS).map(([key, kpi]) => {
                  let realVal = kpi.value;
                  if (key === 'activeUsers') realVal = realMetrics.activeUsers;
                  if (key === 'pageViews') realVal = realMetrics.totalPageViews;
                  if (key === 'sessions') realVal = realMetrics.uniqueSessions;
                  const isUp = kpi.change > 0;

                  return (
                    <div
                      key={key}
                      style={{
                        ...styles.kpiCard,
                        background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: isUp ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                            color: isUp ? '#10b981' : '#f87171',
                          }}
                        >
                          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {isUp ? `+${kpi.change}%` : `${kpi.change}%`}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                        <div>
                          <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>
                            {typeof realVal === 'number' ? realVal.toLocaleString() : realVal}
                          </div>
                          {comparePrev && (
                            <div style={{ fontSize: '0.72rem', color: isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)', marginTop: '0.35rem' }}>
                              vs {typeof kpi.prev === 'number' ? kpi.prev.toLocaleString() : kpi.prev} prev
                            </div>
                          )}
                        </div>

                        {kpi.trend && (
                          <SparklineChart data={kpi.trend} color={isUp ? '#10b981' : '#3b82f6'} height={32} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Main Charts Row */}
              <div style={styles.chartsGrid}>
                {/* Visitors & Sessions Area Chart */}
                <div style={{ ...styles.chartCard, background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Traffic & Sessions Trend</h3>
                      <p style={{ margin: '0.2.rem 0 0', fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Daily unique visitors and active sessions</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      <span style={{ color: '#3b82f6' }}>● Visitors</span>
                      <span style={{ color: '#10b981' }}>- - Sessions</span>
                    </div>
                  </div>
                  <LineAreaChart data={MOCK_TIMESERIES_DAILY} isDark={isDark} />
                </div>

                {/* Donut Device Share Chart */}
                <div style={{ ...styles.chartCard, background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                  <h3 style={{ margin: '0 0 0.3rem', fontSize: '1.05rem', fontWeight: 700 }}>Device Distribution</h3>
                  <p style={{ margin: '0 0 1.5rem', fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Mobile, Desktop, and Tablet user breakdown</p>
                  <DonutChart items={realMetrics.devices} size={180} isDark={isDark} />
                </div>
              </div>

              {/* Secondary Grid: Top Pages & Top Services */}
              <div style={styles.chartsGrid}>
                <div style={{ ...styles.chartCard, background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                  <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.05rem', fontWeight: 700 }}>Top Visited Pages</h3>
                  <HorizontalBarChart items={MOCK_TOP_PAGES.slice(0, 5)} isDark={isDark} />
                </div>

                <div style={{ ...styles.chartCard, background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                  <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.05rem', fontWeight: 700 }}>Surgical Service Interest</h3>
                  <HorizontalBarChart items={MOCK_SERVICES_ANALYTICS.slice(0, 5)} isDark={isDark} />
                </div>
              </div>

            </div>
          )}

          {/* ── 2. SUB VIEWS HANDLER ────────────────────────────────────────── */}
          {currentTab === 'realtime'               && <RealtimeView isDark={isDark} />}
          {currentTab === 'visitors'               && <VisitorsView isDark={isDark} />}
          {currentTab === 'traffic'                && <TrafficView isDark={isDark} />}
          {currentTab === 'pages'                  && <PagesView isDark={isDark} />}
          {currentTab === 'services'               && <ServicesView isDark={isDark} />}
          {currentTab === 'gallery-analytics'     && <PagesView isDark={isDark} />}
          {currentTab === 'blog-analytics'        && <PagesView isDark={isDark} />}
          {currentTab === 'appointments-analytics' && <AppointmentsView isDark={isDark} />}
          {currentTab === 'contact-analytics'      && <AppointmentsView isDark={isDark} />}
          {currentTab === 'seo'                    && <SEOView isDark={isDark} />}
          {currentTab === 'performance'            && <PerformanceView isDark={isDark} />}
          {currentTab === 'devices'                && <DevicesView isDark={isDark} />}
          {currentTab === 'countries'              && <CountriesView isDark={isDark} />}
          {currentTab === 'events'                 && <RealtimeView isDark={isDark} />}
          {currentTab === 'conversions'            && <VisitorsView isDark={isDark} />}
          {currentTab === 'reports'                && <PagesView isDark={isDark} />}
          {currentTab === 'settings'               && <PerformanceView isDark={isDark} />}

        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </AdminLayout>
  );
}

/* ── Dashboard Inline Styles ────────────────────────────────────────── */
const styles = {
  page: { minHeight: '100vh', transition: 'background 0.2s, color 0.2s' },
  toast: {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 2000,
    background: 'linear-gradient(135deg,#c9a96e,#e0c080)',
    color: '#0a0a0f', fontWeight: 700, padding: '0.8rem 1.5rem',
    borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', fontSize: '0.9rem',
  },
  topHeader: {
    position: 'sticky', top: 0, zIndex: 90,
    backdropFilter: 'blur(12px)',
    padding: '0.85rem 2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1.5rem', flexWrap: 'wrap',
  },
  searchWrap: { position: 'relative', flex: 1, maxWidth: '420px', minWidth: '220px' },
  searchInput: {
    width: '100%', padding: '0.6rem 1rem 0.6rem 2.4rem',
    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
    fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit',
  },
  toolbar: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' },
  dateSelectorWrap: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  selectInput: {
    padding: '0.55rem 0.85rem', borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.82rem',
    fontWeight: 600, outline: 'none', cursor: 'pointer',
  },
  toolBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.55rem 0.85rem', borderRadius: '10px',
    fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
  },
  exportBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.55rem 1.1rem', borderRadius: '10px',
    background: 'linear-gradient(135deg, #c9a96e, #e0c080)',
    color: '#0a0a0f', fontWeight: 700, border: 'none',
    fontSize: '0.82rem', cursor: 'pointer',
  },
  iconBtn: {
    width: '36px', height: '36px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', position: 'relative', color: '#fff',
  },
  notifBadge: {
    position: 'absolute', top: '-4px', right: '-4px',
    background: '#ef4444', color: '#fff', fontSize: '0.65rem',
    fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  notifDropdown: {
    position: 'absolute', top: '46px', right: 0, width: '280px',
    borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 200,
  },
  adminProfile: { display: 'flex', alignItems: 'center', gap: '0.6rem', paddingLeft: '0.5rem' },
  avatar: {
    width: '34px', height: '34px', borderRadius: '50%',
    background: 'rgba(201,169,110,0.2)', border: '1px solid rgba(201,169,110,0.4)',
    color: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  contentBody: { padding: '2rem' },
  tabHeader: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  tabTitle: { fontSize: '1.85rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' },
  tabSub: { fontSize: '0.88rem', opacity: 0.5, margin: '0.25rem 0 0' },
  livePulseDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' },
  kpiCard: { borderRadius: '16px', padding: '1.25rem', transition: 'transform 0.15s, border-color 0.15s' },
  chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' },
  chartCard: { borderRadius: '20px', padding: '1.5rem' },
};
