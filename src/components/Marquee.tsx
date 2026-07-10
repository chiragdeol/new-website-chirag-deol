'use client';
import React, { useEffect, useRef } from 'react';

const logoItems = [
  {
    name: 'WordPress',
    color: '#21759B',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.158 12.786l-2.698 7.84c1.16.326 2.378.502 3.634.502.996 0 1.956-.11 2.886-.319-.04-.077-.07-.15-.09-.23l-2.456-6.994c-.37 1.054-.863 2.193-1.276 3.201zm-3.15-4.22c.86 0 1.488-.13 2.072-.37.49-.2.918-.518.918-1.077 0-.52-.397-.936-.888-1.156-.474-.216-.948-.258-1.558-.258H7.135v3.428l1.873-.568zm4.33 4.29l2.25 6.304c2.257-1.405 3.86-3.83 4.195-6.666-.098.01-.19.015-.27.015-1.127 0-1.923-.623-1.923-1.503 0-.77.585-1.464 1.182-2.124.383-.42.74-.828.74-1.295 0-.585-.606-.856-1.127-.856-.84 0-1.637.472-2.41 1.053l-4.148 10.963 1.511-5.892zm-8.87.545c0-.623.518-1.118 1.157-1.118.525 0 .825.26.985.57.548 1.036 1.07 2.115 1.583 3.195l-2.62 7.7c-2.316-2.03-3.823-4.996-3.823-8.318 0-1.48.3-2.888.84-4.18l3.198 9.385c-1.39-1.905-1.32-7.433-.32-7.433zm6.657-9.432c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 20.943c-5.483 0-9.943-4.46-9.943-9.943S6.675 2.057 12.158 2.057 22.1 6.517 22.1 12s-4.46 9.943-9.942 9.943z"/>
      </svg>
    ),
  },
  {
    name: 'Shopify',
    color: '#96BF48',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.043 5.485c-.092-.272-.34-.455-.628-.455h-2.12v-.895c0-.496-.403-.9-.9-.9h-6.79c-.497 0-.9.404-.9.9v.895h-2.12c-.288 0-.536.183-.628.455L3.107 10.98a1.002 1.002 0 00.95 1.321h1.125v7.7c0 .553.447 1 1 1h11.636c.553 0 1-.447 1-1v-7.7h1.125c.677 0 1.144-.707.95-1.321L19.043 5.485zm-9.543-1.35h4.99v.895H9.5V4.135z" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg width="32" height="32" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#0070f3',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.275 14.5l-4.75-6.575v6.575h-1.625v-9h1.625l4.75 6.575v-6.575h1.625v9h-1.625z"/>
      </svg>
    ),
  },
];

const listItems = [...logoItems, ...logoItems, ...logoItems];

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 overflow-hidden"
      style={{
        background: '#0a0f18',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      {/* Marquee track */}
      <div className="flex gap-0 overflow-hidden">
        <div
          className="flex gap-16 flex-shrink-0"
          style={{
            animation: 'marquee 25s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {listItems?.map((item, i) => (
            <div key={i} className="flex items-center gap-4 flex-shrink-0">
              <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  marginLeft: '3rem',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
            </div>
          ))}
        </div>
        <div
          className="flex gap-16 flex-shrink-0"
          style={{
            animation: 'marquee 25s linear infinite',
            whiteSpace: 'nowrap',
            animationDelay: '-12.5s',
          }}
        >
          {listItems?.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-4 flex-shrink-0">
              <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  marginLeft: '3rem',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
