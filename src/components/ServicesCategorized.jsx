import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/content';

function SegmentedPillToggle({ categories, activeTab, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Service categories"
      style={{
        display: 'inline-flex',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '5px',
        gap: '4px',
        flexWrap: 'wrap',
      }}
    >
      {categories.map((cat) => {
        const isActive = activeTab === cat.id;
        return (
          <button
            key={cat.id}
            id={`tab-${cat.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${cat.id}`}
            onClick={() => onSelect(cat.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const currentIndex = categories.findIndex((c) => c.id === activeTab);
                const nextIndex = e.key === 'ArrowRight'
                  ? (currentIndex + 1) % categories.length
                  : (currentIndex - 1 + categories.length) % categories.length;
                onSelect(categories[nextIndex].id);
              }
            }}
            style={{
              position: 'relative',
              padding: '0.7rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              transition: 'color 0.25s ease',
              zIndex: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Sliding pill background */}
            {isActive && (
              <motion.div
                layoutId="pill-indicator"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-sm)',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {cat.title}
          </button>
        );
      })}
    </div>
  );
}

function SubServiceCard({ service, index }) {
  const isClickable = !!service.slug;
  const CardContent = (
    <>
      {/* Background Image */}
      <img
        src={service.image}
        alt={service.title}
        width="600"
        height="340"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        loading="lazy"
      />
      
      {/* Adaptive Theme Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--card-image-overlay)',
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            background: 'var(--card-overlay-surface)',
            padding: '0.3rem 0.75rem',
            borderRadius: '999px',
            backdropFilter: 'var(--blur-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            {service.tag}
          </span>
          
          {isClickable && (
            <div className="arrow-badge" style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--card-overlay-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              backdropFilter: 'var(--blur-md)',
              border: '1px solid var(--border-subtle)',
              transition: 'transform 0.3s ease'
            }}>
              <ArrowRight size={14} />
            </div>
          )}
        </div>

        <div>
          <h3 style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem', 
            fontWeight: 600,
            marginBottom: '0.5rem', 
            color: 'var(--text-primary)',
            lineHeight: 1.25
          }}>
            {service.title}
          </h3>
          
          <p style={{ 
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.5, 
            margin: 0 
          }}>
            {service.desc}
          </p>
        </div>
      </div>
    </>
  );

  const containerStyle = {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    height: '340px',
    padding: '1.75rem',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border-subtle)',
    cursor: isClickable ? 'pointer' : 'default',
    display: 'block',
    textDecoration: 'none'
  };

  if (isClickable) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link 
          to={service.slug}
          style={containerStyle}
          className="sub-service-card"
        >
          {CardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={containerStyle}
    >
      {CardContent}
    </motion.div>
  );
}

export default function ServicesCategorized() {
  const [activeTab, setActiveTab] = useState('general-surgery');

  const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', zIndex: 1, paddingTop: '3rem', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '700px', marginBottom: '4rem' }}>
          <div className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>Service Directory</div>
          <h1 className="h-2" style={{ marginBottom: '1.25rem' }}>
            Comprehensive clinical <span className="text-gradient">expertise.</span>
          </h1>
          <p className="text-lead" style={{ fontSize: '1.1rem' }}>
            Navigate our specialized surgical treatments and advanced procedures structured by clinical category.
          </p>
        </div>

        {/* 1. Segmented Pill Toggle */}
        <div style={{ marginBottom: '3rem' }}>
          <SegmentedPillToggle
            categories={categories}
            activeTab={activeTab}
            onSelect={setActiveTab}
          />
        </div>

        {/* 2. Sub-Services Grid Container */}
        <div style={{ minHeight: '380px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}
            >
              {activeCategory.services.map((service, idx) => (
                <SubServiceCard
                  key={service.title}
                  service={service}
                  index={idx}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
