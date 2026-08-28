import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import './App.css';

/**
 * ErrorBoundary - Global error boundary.
 * Catches React rendering errors and prevents the entire app from crashing.
 * Shows a polished, user-friendly fallback instead of a blank screen.
 * NEVER exposes stack traces to end users.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary caught error]:', error?.message, error?.stack, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--bg-primary, #F7FBFF)',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display, system-ui, sans-serif)',
              fontSize: '1.75rem',
              marginBottom: '1rem',
              color: 'var(--text-primary, #14324B)',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: 'var(--text-secondary, #58738F)', marginBottom: '1rem', maxWidth: '400px' }}>
            We&apos;re sorry — an unexpected error occurred. Please try refreshing the page.
          </p>
          {this.state.error && (
            <pre style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              fontSize: '0.75rem',
              color: '#ef4444',
              maxWidth: '500px',
              textAlign: 'left',
              marginBottom: '2rem',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {this.state.error.message}
            </pre>
          )}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--primary-blue, #2D6BFF)',
                color: '#fff',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
            >
              Refresh Page
            </button>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.history.back(); }}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: 'var(--text-secondary, #58738F)',
                border: '1px solid var(--border-subtle, #ccc)',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                fontFamily: 'inherit',
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* HelmetProvider enables dynamic SEO metadata per page */}
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
