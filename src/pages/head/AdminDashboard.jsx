import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getBlogs, getGalleryImages } from '../../utils/adminStorage';

export default function AdminDashboard() {
  const blogs   = getBlogs();
  const gallery = getGalleryImages();

  const stats = [
    { value: blogs.length,   label: 'Blog Posts',     color: '#c9a96e', icon: blogIcon() },
    { value: gallery.length, label: 'Gallery Images',  color: '#60a5fa', icon: galleryIcon() },
  ];

  return (
    <AdminLayout>
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Dashboard</h1>
            <p style={styles.sub}>Welcome back! Here's an overview of your content.</p>
          </div>
          <div style={styles.badge}>
            <div style={styles.dot} />
            Live
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {stats.map(s => (
            <div key={s.label} style={{ ...styles.statCard, '--accent': s.color }}>
              <div style={{ ...styles.statIcon, background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                {s.icon}
              </div>
              <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={styles.sectionTitle}>Quick Actions</div>
        <div style={styles.cardsGrid}>
          <Link to="/admin/blog" style={{ textDecoration: 'none' }}>
            <div style={{ ...styles.actionCard, '--glow': 'rgba(201,169,110,0.15)' }}>
              <div style={{ ...styles.actionIconWrap, background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}>
                {blogIcon('#c9a96e', 28)}
              </div>
              <h2 style={styles.actionTitle}>Manage Blog</h2>
              <p style={styles.actionDesc}>
                Add, edit or remove blog posts and medical articles that appear on your website.
              </p>
              <div style={{ ...styles.actionCta, color: '#c9a96e' }}>
                Go to Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>

          <Link to="/admin/gallery" style={{ textDecoration: 'none' }}>
            <div style={{ ...styles.actionCard, '--glow': 'rgba(96,165,250,0.15)' }}>
              <div style={{ ...styles.actionIconWrap, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                {galleryIcon('#60a5fa', 28)}
              </div>
              <h2 style={styles.actionTitle}>Manage Gallery</h2>
              <p style={styles.actionDesc}>
                Upload and manage gallery images that showcase your clinic and surgical facilities.
              </p>
              <div style={{ ...styles.actionCta, color: '#60a5fa' }}>
                Go to Gallery
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent blogs */}
        {blogs.length > 0 && (
          <>
            <div style={styles.sectionTitle}>Recent Blog Posts</div>
            <div style={styles.list}>
              {blogs.slice(0, 4).map(post => (
                <div key={post.id} style={styles.listItem}>
                  <img src={post.image} alt={post.title} style={styles.listImg} onError={e => { e.target.style.display = 'none'; }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.listTitle}>{post.title}</div>
                    <div style={styles.listMeta}>{post.category} · {post.date}</div>
                  </div>
                  <Link to="/admin/blog" style={styles.listEdit}>Edit</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

function blogIcon(color = 'currentColor', size = 22) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function galleryIcon(color = 'currentColor', size = 22) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

const styles = {
  page: { padding: '2.5rem', maxWidth: '1100px', margin: '0 auto' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem',
  },
  heading: {
    fontSize: '2rem', fontWeight: 800, color: '#fff',
    margin: 0, letterSpacing: '-0.03em',
  },
  sub: { color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: '0.3rem 0 0' },
  badge: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)',
    borderRadius: '999px', padding: '0.35rem 0.85rem',
    color: '#34d399', fontSize: '0.8rem', fontWeight: 600,
  },
  dot: {
    width: '7px', height: '7px', borderRadius: '50%',
    background: '#34d399', animation: 'pulse 2s infinite',
  },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem', marginBottom: '2.5rem',
  },
  statCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
  },
  statIcon: {
    width: '50px', height: '50px', borderRadius: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 0.75rem',
  },
  statValue: { fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 },
  statLabel: { color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '0.4rem' },
  sectionTitle: {
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
    marginBottom: '1rem', marginTop: '0.5rem',
  },
  cardsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.25rem', marginBottom: '2.5rem',
  },
  actionCard: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px', padding: '2rem',
    cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
    height: '100%', boxSizing: 'border-box',
  },
  actionIconWrap: {
    width: '56px', height: '56px', borderRadius: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  actionTitle: {
    color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.6rem',
  },
  actionDesc: {
    color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6,
    margin: '0 0 1.25rem',
  },
  actionCta: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    fontSize: '0.85rem', fontWeight: 600,
  },
  list: {
    display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem',
  },
  listItem: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px', padding: '0.85rem 1rem',
  },
  listImg: {
    width: '52px', height: '52px', borderRadius: '10px',
    objectFit: 'cover', flexShrink: 0,
  },
  listTitle: {
    color: '#fff', fontSize: '0.88rem', fontWeight: 600,
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  listMeta: { color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '0.2rem' },
  listEdit: {
    fontSize: '0.78rem', fontWeight: 600, color: '#c9a96e',
    textDecoration: 'none', flexShrink: 0,
    padding: '0.3rem 0.75rem',
    background: 'rgba(201,169,110,0.1)',
    borderRadius: '8px',
  },
};
