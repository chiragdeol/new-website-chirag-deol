'use client';
import React, { useEffect, useRef, useState } from 'react';

const techList = [
  {
    name: 'WordPress',
    color: '#21759B',
    bg: 'rgba(33, 117, 155, 0.06)',
    border: 'rgba(33, 117, 155, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.158 12.786l-2.698 7.84c1.16.326 2.378.502 3.634.502.996 0 1.956-.11 2.886-.319-.04-.077-.07-.15-.09-.23l-2.456-6.994c-.37 1.054-.863 2.193-1.276 3.201zm-3.15-4.22c.86 0 1.488-.13 2.072-.37.49-.2.918-.518.918-1.077 0-.52-.397-.936-.888-1.156-.474-.216-.948-.258-1.558-.258H7.135v3.428l1.873-.568zm4.33 4.29l2.25 6.304c2.257-1.405 3.86-3.83 4.195-6.666-.098.01-.19.015-.27.015-1.127 0-1.923-.623-1.923-1.503 0-.77.585-1.464 1.182-2.124.383-.42.74-.828.74-1.295 0-.585-.606-.856-1.127-.856-.84 0-1.637.472-2.41 1.053l-4.148 10.963 1.511-5.892zm-8.87.545c0-.623.518-1.118 1.157-1.118.525 0 .825.26.985.57.548 1.036 1.07 2.115 1.583 3.195l-2.62 7.7c-2.316-2.03-3.823-4.996-3.823-8.318 0-1.48.3-2.888.84-4.18l3.198 9.385c-1.39-1.905-1.32-7.433-.32-7.433zm6.657-9.432c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 20.943c-5.483 0-9.943-4.46-9.943-9.943S6.675 2.057 12.158 2.057 22.1 6.517 22.1 12s-4.46 9.943-9.942 9.943z"/>
      </svg>
    ),
  },
  {
    name: 'Shopify',
    color: '#96BF48',
    bg: 'rgba(150, 191, 72, 0.06)',
    border: 'rgba(150, 191, 72, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.043 5.485c-.092-.272-.34-.455-.628-.455h-2.12v-.895c0-.496-.403-.9-.9-.9h-6.79c-.497 0-.9.404-.9.9v.895h-2.12c-.288 0-.536.183-.628.455L3.107 10.98a1.002 1.002 0 00.95 1.321h1.125v7.7c0 .553.447 1 1 1h11.636c.553 0 1-.447 1-1v-7.7h1.125c.677 0 1.144-.707.95-1.321L19.043 5.485zm-9.543-1.35h4.99v.895H9.5V4.135z" />
      </svg>
    ),
  },
  {
    name: 'Webflow',
    color: '#4353FF',
    bg: 'rgba(67, 83, 255, 0.06)',
    border: 'rgba(67, 83, 255, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.012 3H16.89a.63.63 0 00-.512.247L12.35 8.92a.63.63 0 000 .77l4.028 5.674c.123.173.341.247.512.247h5.122c.453 0 .76-.47.512-.865L18.496 9.305a.63.63 0 010-.77l4.028-5.673c.248-.394-.059-.865-.512-.865zm-15.13 0H1.76c-.453 0-.76.47-.512.865l4.028 5.673c.123.173.123.493 0 .666L1.248 15.877c-.248.395.059.865.512.865H6.88c.17 0 .389-.074.512-.247l4.028-5.674a.63.63 0 000-.77L7.392 3.247A.63.63 0 006.88 3z" />
      </svg>
    ),
  },
  {
    name: 'Laravel',
    color: '#FF2D20',
    bg: 'rgba(255, 45, 32, 0.06)',
    border: 'rgba(255, 45, 32, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.06)',
    border: 'rgba(97, 218, 251, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.275 14.5l-4.75-6.575v6.575h-1.625v-9h1.625l4.75 6.575v-6.575h1.625v9h-1.625z"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.06)',
    border: 'rgba(49, 120, 198, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.125 14.375h-1.625v-5.25H12.75V9.75H17.5v1.375h-1.375v5.25z"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.06)',
    border: 'rgba(56, 189, 248, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm-1-6.5A1.25 1.25 0 1111 8.75 1.25 1.25 0 0112 10z"/>
      </svg>
    ),
  },
];

export default function Technologies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative py-28 px-8 md:px-20 overflow-hidden md:py-36"
      style={{
        background: 'linear-gradient(180deg, #04070a 0%, #070a10 50%, #04070a 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Decorative Orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 130, 0, 0.03)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(97, 218, 251, 0.02)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`mb-16 reveal ${isVisible ? 'visible' : ''}`}>
          <div className="section-label">Technologies we use</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '650px', color: '#ffffff' }}
            >
              Powering Modern
              <br />
              <span style={{ color: 'rgba(252,252,253,0.45)' }}>Digital Architecture.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: '1rem', maxWidth: '380px', lineHeight: 1.7, color: 'rgba(252,252,253,0.5)' }}
            >
              We leverage modern frameworks and robust backend ecosystems to deliver rapid, secure, and highly optimized platforms.
            </p>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-center">
          {techList.map((tech, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={tech.name}
                className={`reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    padding: '1.8rem 1.2rem',
                    borderRadius: '1.25rem',
                    border: `1px solid ${isHovered ? tech.color : 'rgba(255,255,255,0.05)'}`,
                    background: isHovered 
                      ? `linear-gradient(180deg, ${tech.bg} 0%, #0a0f18 100%)` 
                      : 'linear-gradient(180deg, #0d1117 0%, #070a0f 100%)',
                    boxShadow: isHovered 
                      ? `0 12px 32px ${tech.bg}, 0 4px 12px rgba(0,0,0,0.15)` 
                      : '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    height: '100%',
                  }}
                >
                  {/* Brand Icon */}
                  <div
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? tech.color : 'rgba(255,255,255,0.6)',
                      background: isHovered ? tech.bg : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isHovered ? tech.border : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.3s ease-out',
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                    }}
                  >
                    {tech.icon}
                  </div>

                  {/* Brand Name */}
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      transition: 'color 0.3s ease',
                      textAlign: 'center',
                    }}
                  >
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
