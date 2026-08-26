import React, { useState } from 'react';

/**
 * Mini Sparkline SVG Chart for KPI Cards
 */
export function SparklineChart({ data = [], color = '#3b82f6', height = 36 }) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 120;
  const padding = 4;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((val - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

/**
 * Interactive Bezier Line & Area Chart for Visitors / Sessions Over Time
 */
export function LineAreaChart({ data = [], height = 260, isDark = true }) {
  const [hoverIdx, setHoverIdx] = useState(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => Math.max(d.visitors || 0, d.sessions || 0))) * 1.15 || 100;
  const width = 700;
  const chartHeight = height - 40;
  const paddingLeft = 40;
  const paddingBottom = 30;

  const xStep = (width - paddingLeft - 20) / (data.length - 1 || 1);

  const getX = (i) => paddingLeft + i * xStep;
  const getY = (val) => chartHeight - (val / maxVal) * (chartHeight - 20);

  // Generate smooth cubic bezier SVG path
  const createPath = (key) => {
    return data.reduce((acc, d, i) => {
      const x = getX(i);
      const y = getY(d[key]);
      if (i === 0) return `M ${x},${y}`;
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1][key]);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpX2 = prevX + (x - prevX) / 2;
      return `${acc} C ${cpX1},${prevY} ${cpX2},${y} ${x},${y}`;
    }, '');
  };

  const visitorsPath = createPath('visitors');
  const sessionsPath  = createPath('sessions');

  const visitorsArea = `${visitorsPath} L ${getX(data.length - 1)},${chartHeight} L ${paddingLeft},${chartHeight} Z`;
  const sessionsArea  = `${sessionsPath} L ${getX(data.length - 1)},${chartHeight} L ${paddingLeft},${chartHeight} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = chartHeight - pct * (chartHeight - 20);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - 10}
                y2={y}
                stroke={isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                fill={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                fontSize="11"
              >
                {Math.round(maxVal * pct)}
              </text>
            </g>
          );
        })}

        {/* Areas */}
        <path d={visitorsArea} fill="url(#visGrad)" />
        <path d={sessionsArea} fill="url(#sessGrad)" />

        {/* Lines */}
        <path d={visitorsPath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        <path d={sessionsPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />

        {/* X Axis Labels & Interactive Points */}
        {data.map((d, i) => {
          const x = getX(i);
          const yVis = getY(d.visitors);
          const ySess = getY(d.sessions);
          const isHovered = hoverIdx === i;

          return (
            <g key={i} onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} style={{ cursor: 'pointer' }}>
              {/* Vertical Guide Line */}
              {isHovered && (
                <line x1={x} y1={10} x2={x} y2={chartHeight} stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'} strokeDasharray="3 3" />
              )}

              {/* Data Dots */}
              <circle cx={x} cy={yVis} r={isHovered ? 6 : 4} fill="#3b82f6" stroke={isDark ? '#0d0d14' : '#fff'} strokeWidth="2" />
              <circle cx={x} cy={ySess} r={isHovered ? 5 : 3.5} fill="#10b981" stroke={isDark ? '#0d0d14' : '#fff'} strokeWidth="2" />

              {/* X Label */}
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                fill={isHovered ? (isDark ? '#fff' : '#000') : (isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)')}
                fontSize="11"
                fontWeight={isHovered ? '700' : '500'}
              >
                {d.date}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover Tooltip Overlay */}
      {hoverIdx !== null && data[hoverIdx] && (
        <div
          style={{
            position: 'absolute',
            top: '15px',
            left: `${Math.min(Math.max((hoverIdx / (data.length - 1)) * 80 + 10, 15), 75)}%`,
            transform: 'translateX(-50%)',
            background: isDark ? 'rgba(20,20,32,0.95)' : 'rgba(255,255,255,0.95)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
            borderRadius: '10px',
            padding: '0.6rem 0.9rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            pointerEvents: 'none',
            fontSize: '0.8rem',
            zIndex: 20,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.3rem', color: isDark ? '#fff' : '#111' }}>{data[hoverIdx].date}</div>
          <div style={{ color: '#3b82f6', fontWeight: 600 }}>Visitors: {data[hoverIdx].visitors.toLocaleString()}</div>
          <div style={{ color: '#10b981', fontWeight: 600 }}>Sessions: {data[hoverIdx].sessions.toLocaleString()}</div>
          {data[hoverIdx].appointments && (
            <div style={{ color: '#c9a96e', fontWeight: 600, marginTop: '2px' }}>Appointments: {data[hoverIdx].appointments}</div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Horizontal Bar Chart for Top Performing Items (Pages / Services)
 */
export function HorizontalBarChart({ items = [], isDark = true }) {
  if (!items || items.length === 0) return null;
  const maxVal = Math.max(...items.map(i => i.views || i.users || 1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {items.map((item, idx) => {
        const val = item.views || item.users || 0;
        const pct = Math.round((val / maxVal) * 100);

        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: isDark ? '#fff' : '#111', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '75%' }}>
                {item.title || item.name || item.path}
              </span>
              <span style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontWeight: 600 }}>
                {val.toLocaleString()} views
              </span>
            </div>
            <div style={{ height: '8px', borderRadius: '4px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative' }}>
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Donut Ring SVG Chart for Devices / Channels
 */
export function DonutChart({ items = [], size = 180, isDark = true }) {
  const [activeIdx, setActiveIdx] = useState(null);

  if (!items || items.length === 0) return null;
  const total = items.reduce((acc, item) => acc + (item.users || item.percent || 0), 0);

  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentAngle = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {items.map((item, idx) => {
            const val = item.users || item.percent || 0;
            const pct = val / total;
            const strokeDasharray = `${pct * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference;
            currentAngle += pct;
            const isActive = activeIdx === idx;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color || '#3b82f6'}
                strokeWidth={isActive ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                style={{
                  cursor: 'pointer',
                  transition: 'stroke-width 0.2s, opacity 0.2s',
                  opacity: activeIdx === null || activeIdx === idx ? 1 : 0.45,
                }}
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isDark ? '#fff' : '#111' }}>
            {activeIdx !== null ? `${items[activeIdx].percent}%` : total.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.72rem', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {activeIdx !== null ? (items[activeIdx].device || items[activeIdx].channel) : 'Total Users'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, minWidth: '140px' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.3rem 0.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              background: activeIdx === idx ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)') : 'transparent',
              transition: 'background 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color || '#3b82f6' }} />
              <span style={{ color: isDark ? '#fff' : '#111', fontSize: '0.85rem', fontWeight: 500 }}>
                {item.icon ? `${item.icon} ` : ''}{item.device || item.channel}
              </span>
            </div>
            <span style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: '0.82rem', fontWeight: 600 }}>
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Funnel Visualization Chart for Conversions
 */
export function FunnelChart({ steps = [], isDark = true }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '140px', fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#fff' : '#111', flexShrink: 0 }}>
            {step.label}
          </div>
          <div style={{ flex: 1, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: '8px', height: '32px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 0.8rem' }}>
            <div
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: `${step.percent}%`,
                background: step.color || 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                borderRadius: '8px',
                opacity: 0.85,
                transition: 'width 0.6s ease',
              }}
            />
            <span style={{ position: 'relative', zIndex: 1, color: '#fff', fontWeight: 700, fontSize: '0.8rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
              {step.value.toLocaleString()} ({step.percent}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
