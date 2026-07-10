'use client';
import React, { useEffect, useRef, useState } from 'react';

const industries = [
  {
    id: 1,
    name: 'Travel & Tourism',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    desc: 'Booking flows, itinerary planners, and destination storytelling websites built for higher trip inquiries.',
    focus: 'Acquisition + inquiry quality',
    color: '#FF8200',
    bg: 'rgba(255,130,0,0.06)',
    border: 'rgba(255,130,0,0.2)',
    projects: '12+',
  },
  {
    id: 2,
    name: 'Healthcare',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    desc: 'Patient-facing portals and appointment ecosystems that improve trust, retention, and clinic efficiency.',
    focus: 'Trust + retention',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.2)',
    projects: '8+',
  },
  {
    id: 3,
    name: 'Fintech',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    desc: 'Secure fintech product interfaces and growth websites focused on compliance-friendly conversion journeys.',
    focus: 'Compliance + conversion',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.2)',
    projects: '10+',
  },
  {
    id: 4,
    name: 'Real Estate',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Listing portals with CRM-ready lead funnels, location intelligence, and high-intent property discovery.',
    focus: 'Lead quality + velocity',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.2)',
    projects: '15+',
  },
  {
    id: 5,
    name: 'Ecommerce',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    desc: 'Commerce experiences that blend performance, merchandising, and checkout optimization for higher AOV.',
    focus: 'AOV + repeat purchase',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.06)',
    border: 'rgba(236,72,153,0.2)',
    projects: '20+',
  },
  {
    id: 6,
    name: 'Custom Websites',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    desc: 'Bespoke web products for unique workflows, complex content architecture, and multi-system integrations.',
    focus: 'Scalability + flexibility',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.06)',
    border: 'rgba(20,184,166,0.2)',
    projects: '18+',
  },
  {
    id: 7,
    name: 'Business Websites',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    desc: 'Corporate platforms and campaign landing pages that communicate authority and move prospects to action.',
    focus: 'Credibility + conversion',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.2)',
    projects: '25+',
  },
  {
    id: 8,
    name: 'Yoga & Wellness',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    desc: 'Wellness and yoga platforms designed for seamless booking, memberships, and community engagement.',
    focus: 'Engagement + memberships',
    color: '#FF8200',
    bg: 'rgba(255,130,0,0.06)',
    border: 'rgba(255,130,0,0.2)',
    projects: '6+',
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative py-14 px-8 md:px-20 overflow-hidden md:py-18"
      style={{ background: '#04070a' }}
    >
      {/* Decorative orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '-100px',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(255,130,0,0.05)',
          filter: 'blur(90px)',
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-14 reveal md:mb-[4rem] ${isVisible ? 'visible' : ''}`}>
          <div className="section-label">Industries We Serve</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(34px, 3.4vw, 48px)', letterSpacing: '-0.03em', lineHeight: '1.0', maxWidth: '600px', color: '#ffffff' }}
            >
              Crafted for Complex
              <br />
              <span style={{ color: 'rgba(252,252,253,0.45)' }}>Industry Needs.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: '1.25', maxWidth: '360px', color: 'rgba(252,252,253,0.5)' }}
            >
              Every sector has different trust triggers, buying cycles, and conversion blockers. We
              design around those realities, not generic templates.
            </p>
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-center">
          {industries?.map((industry, i) => {
            const isHovered = hoveredId === industry?.id;
            return (
              <div
                key={industry?.id}
                className={`reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 40}ms` }}
                onMouseEnter={() => setHoveredId(industry?.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  style={{
                    padding: '1.8rem 1.2rem',
                    borderRadius: '1.25rem',
                    border: `1px solid ${isHovered ? industry?.border : 'rgba(255,255,255,0.05)'}`,
                    background: isHovered 
                      ? `linear-gradient(180deg, ${industry?.bg} 0%, #0a0f18 100%)` 
                      : 'linear-gradient(180deg, #0d1117 0%, #070a0f 100%)',
                    boxShadow: isHovered 
                      ? `0 12px 32px ${industry?.bg}, 0 4px 12px rgba(0,0,0,0.15)` 
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
                  {/* Icon */}
                  <div
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? industry?.color : 'rgba(255,255,255,0.6)',
                      background: isHovered ? industry?.bg : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isHovered ? industry?.border : 'rgba(255,255,255,0.06)'}`,
                      transition: 'all 0.3s ease-out',
                      transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                    }}
                  >
                    {industry?.icon}
                  </div>

                  {/* Name */}
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
                    {industry?.name}
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
