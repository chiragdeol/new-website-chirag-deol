'use client';
import React, { useEffect, useRef } from 'react';

export default function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const items = [
    'WordPress Development',
    'E-commerce',
    'Real Estate',
    'Social Media',
    'Graphic Design',
    'Reputation Management',
    'Web Design',
    'SEO Optimization',
    'Brand Identity',
    'UI/UX Design',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 overflow-hidden"
      style={{
        background: '#111822',
        borderTop: '1px solid rgba(138,143,141,0.1)',
        borderBottom: '1px solid rgba(138,143,141,0.1)',
      }}
    >
      {/* Marquee track */}
      <div className="flex gap-0 overflow-hidden">
        <div
          className="flex gap-8 flex-shrink-0"
          style={{
            animation: 'marquee 25s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...items, ...items]?.map((item, i) => (
            <div key={i} className="flex items-center gap-8 flex-shrink-0">
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  fontWeight: 500,
                  color: i % 3 === 0 ? '#FF8200' : 'rgba(252,252,253,0.4)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(138,143,141,0.4)',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
            </div>
          ))}
        </div>
        <div
          className="flex gap-8 flex-shrink-0"
          style={{
            animation: 'marquee 25s linear infinite',
            whiteSpace: 'nowrap',
            animationDelay: '-12.5s',
          }}
        >
          {[...items, ...items]?.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-8 flex-shrink-0">
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  fontWeight: 500,
                  color: i % 3 === 0 ? '#FF8200' : 'rgba(252,252,253,0.4)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(138,143,141,0.4)',
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
