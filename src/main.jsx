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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production: send to error monitoring service (e.g., Sentry)
    // In development: log for debugging only
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
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
          <p style={{ color: 'var(--text-secondary, #58738F)', marginBottom: '2rem', maxWidth: '400px' }}>
            We&apos;re sorry — an unexpected error occurred. Please try refreshing the page.
          </p>
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
