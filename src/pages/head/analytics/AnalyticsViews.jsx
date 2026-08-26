import React, { useState, useEffect } from 'react';
import {
  MOCK_LIVE_EVENTS, MOCK_TOP_PAGES, MOCK_SERVICES_ANALYTICS, MOCK_SEO_KEYWORDS,
  MOCK_CORE_WEB_VITALS, MOCK_DEVICES, MOCK_COUNTRIES, MOCK_TRAFFIC_CHANNELS, MOCK_APPOINTMENTS_LIST
} from './analyticsData';
import { DataTable } from './AnalyticsTables';
import { DonutChart, HorizontalBarChart, FunnelChart } from './AnalyticsCharts';
import { Activity, Clock, ShieldCheck, Zap, Globe, Smartphone, CheckCircle, AlertTriangle, FileText, Calendar } from 'lucide-react';

/**
 * 1. Realtime Analytics View
 */
export function RealtimeView({ isDark = true }) {
  const [liveUsers, setLiveUsers] = useState(24);
  const [events, setEvents] = useState(MOCK_LIVE_EVENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live jitter
      const change = Math.floor(Math.random() * 5) - 2;
      setLiveUsers(u => Math.max(12, u + change));

      // Occasional new event
      if (Math.random() > 0.6) {
        const types = ['Page View', 'Service Click', 'Gallery Open', 'Appointment Request'];
        const pages = ['/services/hernia-surgery', '/services/laparoscopic-surgery', '/contact', '/gallery'];
        const newEvt = {
          id: Date.now(),
          time: 'Just now',
          type: types[Math.floor(Math.random() * types.length)],
          desc: `Viewed ${pages[Math.floor(Math.random() * pages.length)]}`,
          location: 'Bengaluru, India',
          device: Math.random() > 0.5 ? 'Mobile' : 'Desktop',
        };
        setEvents(prev => [newEvt, ...prev.slice(0, 7)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Active Users Card */}
      <div
        style={{
          background: isDark ? 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(13,13,20,0.6) 100%)' : '#ecfdf5',
          border: `1px solid ${isDark ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.3)'}`,
          borderRadius: '20px',
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }} />
            Realtime Active Right Now
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 900, color: isDark ? '#fff' : '#111', lineHeight: 1, margin: '0.4rem 0' }}>
            {liveUsers}
          </div>
          <p style={{ margin: 0, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: '0.88rem' }}>
            Active users on website across desktop and mobile devices
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#fff' : '#111' }}>124 / min</div>
            <div style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Pageviews / Minute</div>
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#3b82f6' }}>78%</div>
            <div style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Mobile Share</div>
          </div>
        </div>
      </div>

      {/* Live Stream */}
      <div
        style={{
          background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: '16px',
          padding: '1.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, color: isDark ? '#fff' : '#111', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={18} style={{ color: '#10b981' }} /> Live User Activity Stream
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {events.map(e => (
            <div
              key={e.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                fontSize: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                  {e.type}
                </span>
                <span style={{ color: isDark ? '#fff' : '#111', fontWeight: 600 }}>{e.desc}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '0.8rem' }}>
                <span>{e.location}</span>
                <span>{e.device}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>{e.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Visitors & Cohorts View
 */
export function VisitorsView({ isDark = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', textTransform: 'uppercase' }}>New vs Returning</div>
          <div style={{ marginTop: '1.25rem' }}>
            <DonutChart items={[{ channel: 'New Visitors', percent: 68, color: '#3b82f6' }, { channel: 'Returning Visitors', percent: 32, color: '#10b981' }]} isDark={isDark} />
          </div>
        </div>

        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>User Retention Cohorts</div>
          <FunnelChart
            steps={[
              { label: 'Week 1 Active', value: 14280, percent: 100, color: '#3b82f6' },
              { label: 'Week 2 Retained', value: 9420, percent: 66, color: '#60a5fa' },
              { label: 'Week 3 Retained', value: 6850, percent: 48, color: '#10b981' },
              { label: 'Week 4 Loyal', value: 4560, percent: 32, color: '#8b5cf6' },
            ]}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Traffic Sources View
 */
export function TrafficView({ isDark = true }) {
  const columns = [
    { key: 'channel', label: 'Traffic Channel', render: (val, r) => <strong style={{ color: r.color }}>{val}</strong> },
    { key: 'users', label: 'Users', render: val => val.toLocaleString() },
    { key: 'percent', label: 'Share %', render: val => `${val}%` },
    { key: 'growth', label: 'Growth vs Prev Period', render: val => <span style={{ color: '#10b981', fontWeight: 700 }}>{val}</span> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DataTable title="Traffic Acquisition Breakdown" columns={columns} data={MOCK_TRAFFIC_CHANNELS} isDark={isDark} />
    </div>
  );
}

/**
 * 4. Pages View
 */
export function PagesView({ isDark = true }) {
  const columns = [
    { key: 'path', label: 'Page Path', render: (val, r) => <div><div style={{ fontWeight: 600 }}>{val}</div><div style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>{r.title}</div></div> },
    { key: 'views', label: 'Page Views', render: v => v.toLocaleString() },
    { key: 'users', label: 'Unique Users', render: v => v.toLocaleString() },
    { key: 'avgTime', label: 'Avg Time' },
    { key: 'bounce', label: 'Bounce Rate' },
    { key: 'conversion', label: 'Conversion %', render: v => <span style={{ color: '#10b981', fontWeight: 700 }}>{v}</span> },
  ];

  return <DataTable title="Top Performing Pages" description="Comprehensive views, session times, and conversion rates" columns={columns} data={MOCK_TOP_PAGES} isDark={isDark} exportFilename="top-pages.csv" />;
}

/**
 * 5. Services Analytics View
 */
export function ServicesView({ isDark = true }) {
  const columns = [
    { key: 'name', label: 'Surgical Service', render: v => <strong>{v}</strong> },
    { key: 'views', label: 'Page Views', render: v => v.toLocaleString() },
    { key: 'appointments', label: 'Consultations', render: v => <span style={{ color: '#c9a96e', fontWeight: 700 }}>{v}</span> },
    { key: 'ctr', label: 'CTR' },
    { key: 'avgTime', label: 'Avg Time' },
    { key: 'status', label: 'Performance Status', render: v => <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(201,169,110,0.15)', color: '#c9a96e' }}>{v}</span> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DataTable title="Surgical Services Analytics" description="Consultation click-through rates and patient engagement per service" columns={columns} data={MOCK_SERVICES_ANALYTICS} isDark={isDark} />
    </div>
  );
}

/**
 * 6. Appointments View
 */
export function AppointmentsView({ isDark = true }) {
  const columns = [
    { key: 'id', label: 'Booking ID', render: v => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{v}</span> },
    { key: 'name', label: 'Patient Name', render: v => <strong>{v}</strong> },
    { key: 'phone', label: 'Contact Phone' },
    { key: 'service', label: 'Service Requested' },
    { key: 'date', label: 'Date & Time', render: (v, r) => `${v} (${r.time})` },
    { key: 'source', label: 'Channel Source' },
    { key: 'status', label: 'Status', render: v => (
      <span style={{
        padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
        background: v === 'Confirmed' ? 'rgba(16,185,129,0.15)' : v === 'Pending' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
        color: v === 'Confirmed' ? '#10b981' : v === 'Pending' ? '#f59e0b' : '#3b82f6',
      }}>
        {v}
      </span>
    )},
  ];

  return <DataTable title="Appointment Requests & Consultations" description="Real-time patient bookings, status, and lead channels" columns={columns} data={MOCK_APPOINTMENTS_LIST} isDark={isDark} exportFilename="appointments.csv" />;
}

/**
 * 7. SEO & Search Console View
 */
export function SEOView({ isDark = true }) {
  const columns = [
    { key: 'keyword', label: 'Search Query / Keyword', render: v => <strong>{v}</strong> },
    { key: 'position', label: 'Avg Position', render: v => <span style={{ color: '#3b82f6', fontWeight: 700 }}>#{v}</span> },
    { key: 'impressions', label: 'Search Impressions', render: v => v.toLocaleString() },
    { key: 'clicks', label: 'Organic Clicks', render: v => v.toLocaleString() },
    { key: 'ctr', label: 'Organic CTR', render: v => <span style={{ color: '#10b981', fontWeight: 700 }}>{v}</span> },
  ];

  return <DataTable title="Google Search Console Keywords" description="Search queries driving patient traffic to Dr. Suhas' practice" columns={columns} data={MOCK_SEO_KEYWORDS} isDark={isDark} exportFilename="seo-keywords.csv" />;
}

/**
 * 8. Performance & Core Web Vitals View
 */
export function PerformanceView({ isDark = true }) {
  const vitals = MOCK_CORE_WEB_VITALS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Audit Score Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Overall Score', val: vitals.lighthouse, color: '#10b981' },
          { label: 'Performance', val: vitals.performance, color: '#10b981' },
          { label: 'Accessibility', val: vitals.accessibility, color: '#10b981' },
          { label: 'SEO Audit', val: vitals.seo, color: '#10b981' },
          { label: 'Best Practices', val: vitals.bestPractices, color: '#10b981' },
        ].map(item => (
          <div key={item.label} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: item.color }}>{item.val}</div>
            <div style={{ fontSize: '0.78rem', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', marginTop: '0.3rem' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals table */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, color: isDark ? '#fff' : '#111' }}>Core Web Vitals Metrics</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {vitals.metrics.map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: '12px', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ fontWeight: 600, color: isDark ? '#fff' : '#111', fontSize: '0.9rem' }}>{m.name}</div>
                <div style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Target threshold: {m.target}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{m.value}</span>
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 9. Devices & Browsers View
 */
export function DevicesView({ isDark = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: '16px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, color: isDark ? '#fff' : '#111' }}>Device Breakdown</h3>
        <DonutChart items={MOCK_DEVICES} size={200} isDark={isDark} />
      </div>
    </div>
  );
}

/**
 * 10. Countries & Geography View
 */
export function CountriesView({ isDark = true }) {
  const columns = [
    { key: 'country', label: 'Country', render: (v, r) => <span>{r.flag} {v}</span> },
    { key: 'city', label: 'Primary City' },
    { key: 'users', label: 'Visitors', render: v => v.toLocaleString() },
    { key: 'percent', label: 'Share %', render: v => <span style={{ color: '#3b82f6', fontWeight: 700 }}>{v}</span> },
  ];

  return <DataTable title="Visitor Geographic Locations" description="Patient traffic by country and metropolitan area" columns={columns} data={MOCK_COUNTRIES} isDark={isDark} />;
}
