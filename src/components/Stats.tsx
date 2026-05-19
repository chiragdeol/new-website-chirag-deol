'use client';
import React, { useEffect, useRef } from 'react';

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersStarted = useRef(false);

  const stats = [
    { value: 70,  suffix: '+',  label: 'Projects\nCompleted',      size: 240, top: '8%',  left: '2%',  accent: false },
    { value: 500, suffix: '+',  label: 'Hours of\nDesign Work',    size: 310, top: '2%',  left: '28%', accent: false },
    { value: 4,   suffix: '',   label: 'Service\nAreas',           size: 200, top: '5%',  left: '62%', accent: false },
    { value: 60,  suffix: '+',  label: 'Happy\nClients',           size: 270, top: '44%', left: '12%', accent: false },
    { value: 25,  suffix: '+',  label: 'Years of\nCombined Exp.',  size: 250, top: '38%', left: '46%', accent: true  },
    { value: 98,  suffix: '%',  label: 'Client\nSatisfaction',     size: 210, top: '42%', left: '75%', accent: false },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              const duration = 2200;
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0f17 0%, #0d1520 55%, #111822 100%)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 4rem)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,130,0,0.05)', filter: 'blur(130px)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '10%', right: '10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,130,0,0.04)', filter: 'blur(110px)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              color: '#FF8200',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            <span style={{ width: '20px', height: '1px', background: '#FF8200', display: 'inline-block' }} />
            Proven by Results
            <span style={{ width: '20px', height: '1px', background: '#FF8200', display: 'inline-block' }} />
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
              fontWeight: 500,
              color: '#FCFCFD',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
            }}
          >
            Numbers That Speak
            <br />
            <span style={{ color: 'rgba(252,252,253,0.28)' }}>Louder Than Words.</span>
          </h2>
        </div>

        {/* ── Orb Field ── */}
        <div
          className="stats-orb-field"
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(500px, 65vw, 720px)',
          }}
        >
          {stats.map((stat, i) => {
            const isAccent = stat.accent;
            const px = `clamp(${Math.round(stat.size * 0.5)}px, ${(stat.size / 1280) * 100 * 2.6}vw, ${stat.size}px)`;

            return (
              <div
                key={stat.label}
                className="stats-orb-item"
                style={{
                  position: 'absolute',
                  top: stat.top,
                  left: stat.left,
                  width: px,
                  height: px,
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1.2rem',
                  cursor: 'default',
                  animation: `orbFloat${i} ${4 + i * 0.5}s ease-in-out infinite`,
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  /* Glossy dark sphere */
                  background: isAccent
                    ? 'radial-gradient(circle at 35% 28%, #d97000 0%, #FF8200 38%, #b85e00 80%, #7a3d00 100%)'
                    : 'radial-gradient(circle at 32% 26%, #1e2e42 0%, #14202e 42%, #0d1724 75%, #080f18 100%)',
                  boxShadow: isAccent
                    ? '0 0 0 1px rgba(255,130,0,0.35), 0 8px 60px rgba(255,130,0,0.4), 0 0 120px rgba(255,130,0,0.15), inset 0 1px 0 rgba(255,210,140,0.3)'
                    : '0 0 0 1px rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -2px 8px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'scale(1.07)';
                  if (!isAccent)
                    el.style.boxShadow = '0 0 0 1px rgba(255,130,0,0.3), 0 12px 60px rgba(255,130,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'scale(1)';
                  if (!isAccent)
                    el.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.07), 0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -2px 8px rgba(0,0,0,0.4)';
                }}
              >
                {/* Specular highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10%',
                    left: '20%',
                    width: '35%',
                    height: '20%',
                    borderRadius: '50%',
                    background: isAccent
                      ? 'rgba(255,240,200,0.22)'
                      : 'rgba(255,255,255,0.08)',
                    filter: 'blur(6px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Number */}
                <div
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: `clamp(1.8rem, ${(stat.size / 1280) * 14}vw, ${Math.round(stat.size * 0.3)}px)`,
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span data-target={stat.value}>0</span>
                  {stat.suffix && (
                    <span
                      style={{
                        fontSize: '0.48em',
                        color: isAccent ? 'rgba(255,255,255,0.9)' : '#FF8200',
                        fontWeight: 800,
                        marginTop: '0.15em',
                        marginLeft: '1px',
                      }}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: `clamp(0.58rem, ${(stat.size / 1280) * 2.8}vw, ${Math.max(10, Math.round(stat.size * 0.075))}px)`,
                    color: isAccent ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.38)',
                    letterSpacing: '0.03em',
                    lineHeight: 1.4,
                    marginTop: '0.45rem',
                    whiteSpace: 'pre-line',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}

          {/* Scattered tiny star dots */}
          {[
            { top: '15%', left: '55%' }, { top: '70%', left: '5%' },
            { top: '85%', left: '40%' }, { top: '30%', left: '90%' },
            { top: '60%', left: '70%' }, { top: '5%',  left: '82%' },
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: dot.top,
                left: dot.left,
                width: i % 2 === 0 ? '3px' : '2px',
                height: i % 2 === 0 ? '3px' : '2px',
                borderRadius: '50%',
                background: i % 3 === 0 ? '#FF8200' : 'rgba(255,255,255,0.35)',
                boxShadow: i % 3 === 0 ? '0 0 6px #FF8200' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbFloat0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes orbFloat1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-16px)} }
        @keyframes orbFloat3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes orbFloat4 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes orbFloat5 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }

        .stats-orb-item:hover { animation-play-state: paused !important; }

        /* Mobile — switch to 2-col flex wrap */
        @media (max-width: 768px) {
          .stats-orb-field {
            position: static !important;
            height: auto !important;
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1rem !important;
            padding: 1rem 0 !important;
          }
          .stats-orb-item {
            position: static !important;
            width: clamp(130px, 40vw, 175px) !important;
            height: clamp(130px, 40vw, 175px) !important;
            flex-shrink: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
