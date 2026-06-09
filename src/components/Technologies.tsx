'use client';
import React, { useEffect, useRef, useState } from 'react';

const techList = [
  {
    name: 'WordPress',
    desc: 'Scalable custom themes, headless setups, and robust enterprise content ecosystems.',
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
    name: 'React Native',
    desc: 'High-performance cross-platform iOS and Android mobile application builds.',
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.05)',
    border: 'rgba(97, 218, 251, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.6-6.4c.15-.36.33-.71.55-1.03l-.04.04c-.2.27-.36.56-.51.86-.18.36-.26.74-.26 1.13 0 .75.36 1.46.99 1.89.2.14.43.25.67.33l-.11-.06c-.36-.21-.66-.51-.88-.87-.22-.36-.33-.76-.33-1.18 0-.35.07-.69.21-1.02.13-.3.32-.58.56-.83l-.05.04c-.31.33-.56.71-.74 1.13-.19.43-.28.89-.28 1.36 0 1.05.51 2.02 1.37 2.62.33.23.71.4 1.11.51l-.22-.11a2.89 2.89 0 01-1.52-2.52c0-.52.12-1.03.35-1.5zm8.16 2.62c.86-.6 1.37-1.57 1.37-2.62 0-.47-.09-.93-.28-1.36a3.86 3.86 0 00-.74-1.13l-.05-.04c.24.25.43.53.56.83.14.33.21.67.21 1.02 0 .42-.11.82-.33 1.18-.22.36-.52.66-.88.87l-.11.06c.24-.08.47-.19.67-.33.63-.43.99-1.14.99-1.89 0-.39-.08-.77-.26-1.13a2.91 2.91 0 00-.51-.86l-.04-.04c.22.32.4.67.55 1.03.23.47.35.98.35 1.5 0 .97-.5 1.86-1.31 2.37l-.11.06.11-.06zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
      </svg>
    ),
  },
  {
    name: 'Laravel',
    desc: 'Robust APIs, enterprise backend development, and secure SaaS database architectures.',
    color: '#FF2D20',
    bg: 'rgba(255, 45, 32, 0.05)',
    border: 'rgba(255, 45, 32, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: 'React',
    desc: 'Dynamic, highly interactive SPAs, clean reusable UI components, and state logic.',
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.05)',
    border: 'rgba(97, 218, 251, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    desc: 'Production-ready SSR, static optimization, and SEO-tuned Next.js app architectures.',
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm6.275 14.5l-4.75-6.575v6.575h-1.625v-9h1.625l4.75 6.575v-6.575h1.625v9h-1.625z"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    desc: 'Type-safe interface contracts, structured coding systems, and bug-preventative design.',
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
    name: 'Node.js',
    desc: 'High-concurrency microservices, API servers, streaming endpoints, and custom toolkits.',
    color: '#339933',
    bg: 'rgba(51, 153, 51, 0.05)',
    border: 'rgba(51, 153, 51, 0.2)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm2.25 15h-1.5V11.5h-1.5V10h3v5zm-1.5-6.5A1.25 1.25 0 1114 9.25 1.25 1.25 0 0112.75 10.5z"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    desc: 'Clean utility classes, responsive UI grids, and high-performance design-system tokens.',
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.05)',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techList.map((tech, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={tech.name}
                className={`reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    padding: '2.2rem',
                    borderRadius: '1.25rem',
                    border: `1px solid ${isHovered ? tech.color : 'rgba(255,255,255,0.06)'}`,
                    background: isHovered 
                      ? `linear-gradient(180deg, ${tech.bg} 0%, #0a0f18 100%)` 
                      : 'linear-gradient(180deg, #0d1117 0%, #070a0f 100%)',
                    boxShadow: isHovered 
                      ? `0 16px 40px ${tech.bg}, 0 4px 16px rgba(0,0,0,0.2)` 
                      : '0 4px 16px rgba(0,0,0,0.2)',
                    transition: 'all 0.5s cubic-bezier(0.625, 0.05, 0, 1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Brand Icon */}
                    <div
                      style={{
                        width: '3.25rem',
                        height: '3.25rem',
                        borderRadius: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHovered ? tech.color : 'rgba(255,255,255,0.55)',
                        background: isHovered ? tech.bg : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isHovered ? tech.border : 'rgba(255,255,255,0.08)'}`,
                        marginBottom: '1.75rem',
                        transition: 'all 0.3s ease-out',
                        transform: isHovered ? 'scale(1.05) rotate(-3deg)' : 'scale(1)',
                      }}
                    >
                      {tech.icon}
                    </div>

                    {/* Brand Name */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display), sans-serif',
                        fontSize: '1.35rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '0.6rem',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {tech.name}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '0.86rem',
                        color: isHovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.48)',
                        lineHeight: 1.65,
                        transition: 'color 0.3s ease-out',
                      }}
                    >
                      {tech.desc}
                    </p>
                  </div>

                  {/* Visual Glow Indicator */}
                  <div
                    style={{
                      height: '2px',
                      width: isHovered ? '100%' : '0%',
                      background: tech.color,
                      boxShadow: `0 0 10px ${tech.color}`,
                      transition: 'width 0.4s ease-out',
                      marginTop: '2rem',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
