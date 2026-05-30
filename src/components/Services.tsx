'use client';
import React, { useEffect, useRef, useState } from 'react';

interface ServicesProps {
  onScrollTo: (id: string) => void;
}

const services = [
  {
    id: 1,
    title: 'Website Development',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    desc: 'High-performance brand websites engineered for authority, speed, and lead capture across every device.',
    tags: ['Conversion UX', 'Performance Core', 'SEO Structure', 'CMS Ready'],
    outcome: 'Sharper brand trust and stronger inbound leads',
    angle: -30,
  },
  {
    id: 2,
    title: 'Mobile App Development',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    desc: 'Scalable iOS and Android app experiences designed for retention, reliability, and long-term product growth.',
    tags: ['Native + Cross Platform', 'Launch Sprints', 'Analytics Ready', 'Store Deployment'],
    outcome: 'Higher retention and smoother product adoption',
    angle: 30,
  },
  {
    id: 3,
    title: 'WordPress Development',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    desc: 'Custom WordPress ecosystems with enterprise-grade flexibility, security hardening, and clean editor workflows.',
    tags: ['Custom Theme Build', 'Plugin Strategy', 'Security Hardening', 'Editor-Friendly'],
    outcome: 'Faster content operations with fewer technical blockers',
    angle: -150,
  },
  {
    id: 4,
    title: 'Real Estate Websites',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Real-estate platforms with listing intelligence, high-intent filtering, and pipeline-ready lead workflows.',
    tags: ['Listing Discovery', 'IDX + CRM', 'Lead Scoring', 'Virtual Tour UX'],
    outcome: 'Better lead quality for sales teams',
    angle: 150,
  },
  {
    id: 5,
    title: 'Ecommerce Development',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    desc: 'Commerce systems built to reduce checkout drop-off and increase average order value through UX and speed.',
    tags: ['Checkout Optimization', 'Catalog Architecture', 'Payments + Ops', 'Scale-Ready'],
    outcome: 'Higher revenue per visitor',
    angle: 90,
  },
  {
    id: 6,
    title: 'UI/UX Design',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    desc: 'Research-led UI/UX design that balances clarity, visual impact, and conversion intent at every touchpoint.',
    tags: ['UX Research', 'Interface Systems', 'Interaction Design', 'Prototype Testing'],
    outcome: 'Clearer user journeys and higher conversion confidence',
    angle: -90,
  },
];

function getOrbitRadius(width: number) {
  if (width < 380) return Math.max(88, Math.round(width * 0.26));
  if (width < 480) return Math.min(120, Math.round(width * 0.28));
  if (width < 640) return 140;
  if (width < 900) return 200;
  if (width < 1200) return 260;
  return 320;
}

export default function Services({ onScrollTo }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number>(0);
  const [pillPositions, setPillPositions] = useState<{ x: number; y: number }[]>([]);
  const [orbitRadius, setOrbitRadius] = useState(200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal, .reveal-left');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === 'undefined') return;
      setOrbitRadius(getOrbitRadius(window.innerWidth));
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useEffect(() => {
    const positions = services.map((s) => {
      const rad = (s.angle * Math.PI) / 180;
      return {
        x: Math.cos(rad) * orbitRadius,
        y: Math.sin(rad) * orbitRadius,
      };
    });
    setPillPositions(positions);
  }, [orbitRadius]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(160deg, #04070a 0%, #0a0f18 40%, #0d1117 100%)',
        padding: 'clamp(4rem, 10vw, 8.5rem) 0',
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '-150px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255,130,0,0.07)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,170,82,0.06)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-14 reveal md:mb-16">
          <div className="section-label">What We Do</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '600px', color: '#ffffff' }}
            >
              Services Built
              <br />
              <span style={{ color: 'rgba(252,252,253,0.45)' }}>to Convert.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: '1rem', maxWidth: '360px', lineHeight: 1.7, color: 'rgba(252,252,253,0.5)' }}
            >
              From concept to launch — we craft digital experiences that don&apos;t just look great,
              they are architected to create business outcomes you can measure.
            </p>
          </div>
        </div>

        {/* Sphere + Pills Visual */}
        <div
          className="relative mx-auto flex w-full max-w-[min(100%,520px)] items-center justify-center reveal sm:max-w-none"
          style={{
            minHeight: 'clamp(340px, 92vw, 780px)',
            height: 'clamp(360px, 85vmin, 780px)',
            marginBottom: 'clamp(2rem, 5vw, 5.5rem)',
          }}
        >
          {/* Sphere */}
          <div
            className="absolute sphere-float-wrap"
            style={{
              top: '50%',
              left: '50%',
              zIndex: 2,
            }}
          >
            {/* Fuzzy glowing sphere — inner layers rotate slowly (reference-style motion) */}
            <div
              className="sphere-rotate-inner"
              style={{
                width: 'clamp(160px, 42vmin, 380px)',
                height: 'clamp(160px, 42vmin, 380px)',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              {/* Core glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '15%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 38% 32%, #f7efe6 0%, #e7dacb 42%, #d3bea8 70%, #b89d84 100%)',
                  filter: 'blur(2px)',
                }}
              />
              {/* Fuzzy outer layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.92) 0%, rgba(236,225,211,0.78) 35%, rgba(205,183,159,0.45) 62%, transparent 86%)',
                  filter: 'blur(10px)',
                }}
              />
              {/* Texture noise layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: '5%',
                  borderRadius: '50%',
                  background: `
                    radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92) 0%, transparent 42%),
                    radial-gradient(circle at 70% 70%, rgba(150,120,90,0.35) 0%, transparent 45%),
                    radial-gradient(circle at 50% 50%, rgba(224,203,182,0.55) 0%, transparent 65%)
                  `,
                  filter: 'blur(4px)',
                }}
              />
              {/* Fluffy edge */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-8%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 50%, transparent 45%, rgba(220,194,165,0.2) 62%, rgba(194,164,134,0.14) 75%, transparent 90%)',
                  filter: 'blur(12px)',
                }}
              />
              {/* Outer glow halo */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-25%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(216,185,151,0.22) 0%, rgba(237,220,199,0.08) 52%, transparent 72%)',
                  filter: 'blur(20px)',
                }}
              />
            </div>
          </div>

          {/* Floating Pills */}
          {services.map((service, i) => {
            const pos = pillPositions[i] || { x: 0, y: 0 };
            const isActive = activeService === i;
            return (
              <div
                key={service.id}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  zIndex: 3,
                  animation: `pillFloat ${3.2 + i * 0.35}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <button
                  onClick={() => setActiveService(i)}
                  className="absolute max-w-[min(148px,42vw)] touch-manipulation text-left sm:max-w-none sm:gap-2 sm:px-[1.05rem] sm:py-[0.6rem]"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: isActive ? '#111822' : 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(16px)',
                    border: `1.5px solid ${isActive ? '#FF8200' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '3rem',
                    padding: '0.5rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(255,130,0,0.25)'
                      : '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                  type="button"
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 8px 32px rgba(255,130,0,0.1)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'rgba(255,130,0,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.05)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 4px 20px rgba(0,0,0,0.08)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <span style={{ color: isActive ? '#FF8200' : 'rgba(255,255,255,0.5)', display: 'flex' }}>
                    {service.icon}
                  </span>
                  <span
                    className="min-w-0 max-w-[7.25rem] truncate text-[0.68rem] font-medium leading-snug sm:max-w-none sm:text-[0.82rem]"
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontWeight: 500,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {service.title}
                  </span>
                </button>
              </div>
            );
          })}

          <style>{`
            .sphere-float-wrap {
              animation: sphereDrift 14s ease-in-out infinite;
              will-change: transform;
            }
            .sphere-rotate-inner {
              animation:
                spherePulse 5s ease-in-out infinite,
                sphereRotate 75s linear infinite;
              will-change: transform, filter;
            }
            @keyframes sphereDrift {
              0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
              33% { transform: translate(-50%, -50%) translate(5px, -7px); }
              66% { transform: translate(-50%, -50%) translate(-4px, 5px); }
            }
            @keyframes sphereRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spherePulse {
              0%, 100% { filter: drop-shadow(0 0 28px rgba(255,130,0,0.22)); }
              50% { filter: drop-shadow(0 0 44px rgba(255,130,0,0.34)); }
            }
            @keyframes pillFloat {
              0%, 100% { margin-top: 0px; }
              50% { margin-top: -8px; }
            }
            @media (prefers-reduced-motion: reduce) {
              .sphere-float-wrap { animation: none !important; transform: translate(-50%, -50%) !important; }
              .sphere-rotate-inner {
                animation: spherePulse 5s ease-in-out infinite !important;
              }
            }
          `}</style>
        </div>

        {/* Active Service Detail Card */}
        <div
          className="reveal services-detail-shell"
          style={{
            borderRadius: '2rem',
            padding: 'clamp(2rem, 5vw, 3rem)',
            background: 'rgba(17,24,34,0.72)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(255,130,0,0.1)',
                border: '1px solid rgba(255,130,0,0.2)',
                color: '#FF8200',
              }}
            >
              {services[activeService]?.icon &&
                React.cloneElement(
                  services[activeService].icon as React.ReactElement<Record<string, unknown>>,
                  {
                    width: 28,
                    height: 28,
                  }
                )}
            </div>
            <div className="flex-1">
              <h3
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 500,
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}
              >
                {services[activeService]?.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  marginBottom: '1.5rem',
                }}
              >
                {services[activeService]?.desc}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.86rem',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '1.1rem',
                  letterSpacing: '0.02em',
                }}
              >
                Outcome: {services[activeService]?.outcome}
              </p>
              <div className="flex flex-wrap gap-2">
                {services[activeService]?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="services-tag"
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.78rem',
                      color: '#FF8200',
                      padding: '0.35rem 0.9rem',
                      border: '1px solid rgba(255,130,0,0.3)',
                      borderRadius: '2rem',
                      letterSpacing: '0.04em',
                      background: 'rgba(255,130,0,0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => onScrollTo('contact')}
              className="btn-cta flex-shrink-0"
              style={{ alignSelf: 'flex-start' }}
            >
              <div className="btn-bg" />
              <span className="btn-text">GET STARTED</span>
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Service List (below) */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`reveal cursor-pointer services-mini-card ${
                activeService === i ? 'services-mini-card--active' : ''
              }`}
              style={{
                transition: 'all 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
                transitionDelay: `${i * 60}ms`,
                border: activeService === i ? '1px solid rgba(255,130,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.25rem',
                background: activeService === i 
                  ? 'linear-gradient(180deg, rgba(255,130,0,0.12) 0%, #0a0f18 100%)' 
                  : '#070a0f',
                padding: '1.6rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: activeService === i ? '0 12px 30px rgba(255,130,0,0.08)' : 'none',
              }}
              onClick={() => setActiveService(i)}
              onMouseEnter={(e) => {
                if (activeService !== i) {
                  e.currentTarget.style.borderColor = 'rgba(255,130,0,0.3)';
                  e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,130,0,0.04) 0%, #0c1017 100%)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeService !== i) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = '#070a0f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.9rem',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: activeService === i ? '#FF8200' : 'rgba(255,255,255,0.3)',
                }}
              >
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background:
                    activeService === i ? 'rgba(255,130,0,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeService === i ? 'rgba(255,130,0,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  color: activeService === i ? '#FF8200' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.3s ease-out',
                }}
              >
                {service.icon}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '1.15rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                }}
              >
                {service.title}
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  marginBottom: '0.8rem',
                }}
              >
                {service.desc.substring(0, 80)}...
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.77rem',
                  color: activeService === i ? '#FF8200' : 'rgba(255,255,255,0.4)',
                }}
              >
                {service.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
