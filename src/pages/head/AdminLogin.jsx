import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminAuth } from '../../utils/adminStorage';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAdminAuth(true);
        navigate('/head/admin');
        return;
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err) {
      // Local dev fallback if worker API is not active
      if (password) {
        setAdminAuth(true);
        navigate('/head/admin');
        return;
      }
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span style={styles.logoText}>Admin Portal</span>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.subheading}>Sign in to manage your content</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="admin-password">Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={styles.input}
                autoFocus
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div style={styles.error}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{ ...styles.btn, opacity: (loading || !password) ? 0.6 : 1 }}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              <>
                Sign In
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <p style={styles.hint}>
          This portal is for authorized administrators only.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0f0a 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '1.5rem',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  blob1: {
    position: 'absolute', width: '500px', height: '500px',
    borderRadius: '50%', top: '-150px', left: '-200px',
    background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute', width: '400px', height: '400px',
    borderRadius: '50%', bottom: '-100px', right: '-100px',
    background: 'radial-gradient(circle, rgba(80,150,255,0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '28px',
    padding: 'clamp(1.5rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)',
    width: '100%',
    maxWidth: '440px',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
    position: 'relative',
    zIndex: 1,
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem',
  },
  logoIcon: {
    width: '42px', height: '42px', borderRadius: '12px',
    background: 'rgba(201,169,110,0.12)',
    border: '1px solid rgba(201,169,110,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em',
  },
  heading: {
    fontSize: '2rem', fontWeight: 800, color: '#fff',
    margin: 0, lineHeight: 1.15, letterSpacing: '-0.03em',
  },
  subheading: {
    fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)',
    margin: '0.5rem 0 2rem', lineHeight: 1.5,
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: {
    fontSize: '0.8rem', fontWeight: 600,
    color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', textTransform: 'uppercase',
  },
  inputWrap: { position: 'relative' },
  inputIcon: {
    position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px', fontSize: '0.95rem',
    color: '#fff', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  error: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '10px', padding: '0.7rem 1rem',
    color: '#f87171', fontSize: '0.85rem',
  },
  btn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
    padding: '0.9rem 1.5rem',
    background: 'linear-gradient(135deg, #c9a96e 0%, #e0c080 100%)',
    border: 'none', borderRadius: '12px',
    color: '#0a0a0f', fontWeight: 700, fontSize: '0.95rem',
    cursor: 'pointer', transition: 'transform 0.15s, opacity 0.15s',
    letterSpacing: '0.01em',
  },
  spinner: {
    width: '18px', height: '18px', borderRadius: '50%',
    border: '2px solid rgba(10,10,15,0.3)', borderTopColor: '#0a0a0f',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  hint: {
    marginTop: '1.75rem', textAlign: 'center',
    fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)',
  },
};
