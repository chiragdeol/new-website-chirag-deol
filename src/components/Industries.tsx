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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
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
      className="relative py-28 px-8 md:px-20 overflow-hidden md:py-36"
      style={{ background: '#ffffff' }}
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
        <div className="mb-14 reveal md:mb-[4rem]">
          <div className="section-label">Industries We Serve</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '600px' }}
            >
              Crafted for Complex
              <br />
              <span style={{ color: '#8a8f8d' }}>Industry Needs.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: '1rem', maxWidth: '360px', lineHeight: 1.7 }}
            >
              Every sector has different trust triggers, buying cycles, and conversion blockers. We
              design around those realities, not generic templates.
            </p>
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {industries?.map((industry, i) => (
            <div
              key={industry?.id}
              className="reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
              onMouseEnter={() => setHoveredId(industry?.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="industry-card-inner"
                style={{
                  padding: '2rem',
                  borderRadius: '1.2rem',
                  border: `1px solid ${hoveredId === industry?.id ? industry?.border : 'rgba(138,143,141,0.15)'}`,
                  background:
                    hoveredId === industry?.id
                      ? `linear-gradient(180deg, ${industry?.bg} 0%, rgba(255,255,255,0.95) 100%)`
                      : 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,249,247,1) 100%)',
                  cursor: 'default',
                  height: '100%',
                }}
              >
                {/* Icon */}
                <div
                  className="industry-card-icon-wrap w-12 h-12 rounded-xl mb-5 flex items-center justify-center"
                  style={{
                    background:
                      hoveredId === industry?.id ? industry?.bg : 'rgba(138,143,141,0.06)',
                    border: `1px solid ${hoveredId === industry?.id ? industry?.border : 'rgba(138,143,141,0.15)'}`,
                    color: hoveredId === industry?.id ? industry?.color : '#8a8f8d',
                  }}
                >
                  {industry?.icon}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#111822',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3,
                  }}
                >
                  {industry?.name}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.86rem',
                    color: '#6f7673',
                    lineHeight: 1.65,
                    marginBottom: '1.1rem',
                  }}
                >
                  {industry?.desc}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: hoveredId === industry?.id ? industry?.color : '#8a8f8d',
                      transition: 'color 0.3s ease-out',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: hoveredId === industry?.id ? industry?.color : '#8a8f8d',
                        transition: 'background 0.3s ease-out',
                      }}
                    />
                    {industry?.projects} Projects
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.72rem',
                      letterSpacing: '0.04em',
                      color: hoveredId === industry?.id ? industry?.color : '#8a8f8d',
                      opacity: 0.95,
                    }}
                  >
                    {industry?.focus}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
