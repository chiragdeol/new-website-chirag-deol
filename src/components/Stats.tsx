'use client';
import React, { useEffect, useRef } from 'react';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersStarted = useRef(false);

  const stats = [
    { value: 70, suffix: '+', label: 'Projects Completed', icon: '◎' },
    { value: 6, suffix: '+', label: 'Years Experience', icon: '◈' },
    { value: 60, suffix: '+', label: 'Happy Clients', icon: '◉' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: '◐' },
    { value: 50, suffix: '+', label: 'E-commerce Platforms', icon: '◑' },
    { value: 24, suffix: '/7', label: 'Support Available', icon: '◒' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
            // Animate counters
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              const duration = 2000;
              const step = target / (duration / 16);
              let current = 0;
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toString();
              }, 16);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-8 md:px-20 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #111822 0%, #0d1520 50%, #111822 100%)',
      }}
    >
      {/* Blur orbs */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 130, 0, 0.08)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label" style={{ color: '#FF8200' }}>
            Proven by Results
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 500,
                color: '#FCFCFD',
                lineHeight: 1.0,
                letterSpacing: '0.02em',
              }}
            >
              Numbers That Speak
              <br />
              <span style={{ color: '#8a8f8d' }}>Louder Than Words.</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: '#8a8f8d',
                maxWidth: '360px',
                lineHeight: 1.7,
              }}
            >
              Our track record of excellence and client success across diverse industries and
              geographies.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="reveal"
              style={{
                transitionDelay: `${i * 80}ms`,
                padding: '2rem 1.5rem',
                border: '1px solid rgba(138,143,141,0.15)',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.03)',
                transition: 'all 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,130,0,0.3)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,130,0,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(138,143,141,0.15)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
                style={{
                  background: 'rgba(255, 130, 0, 0.1)',
                  border: '1px solid rgba(255, 130, 0, 0.2)',
                }}
              >
                <span style={{ fontSize: '0.9rem', color: '#FF8200' }}>{stat.icon}</span>
              </div>
              <div
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  color: '#FCFCFD',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                  marginBottom: '0.4rem',
                }}
              >
                <span data-target={stat.value}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: '#8a8f8d',
                  letterSpacing: '0.04em',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
