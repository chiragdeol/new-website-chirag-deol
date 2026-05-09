'use client';
import React, { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    desc: 'We start with a deep-dive consultation to understand your business goals, target audience, and competitive landscape. This shapes our entire strategy.',
    duration: '1–2 Days',
    deliverables: ['Project Brief', 'Competitor Analysis', 'Technical Scope', 'Timeline & Budget'],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    desc: "Our designers craft stunning wireframes and high-fidelity prototypes. You see exactly what you're getting before a single line of code is written.",
    duration: '3–5 Days',
    deliverables: ['Wireframes', 'UI Mockups', 'Interactive Prototype', 'Brand Assets'],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Development',
    desc: 'Our engineers build your solution with clean, scalable code. Regular updates keep you in the loop throughout the entire development cycle.',
    duration: '1–4 Weeks',
    deliverables: ['Frontend Development', 'Backend Integration', 'CMS Setup', 'API Connections'],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Testing & QA',
    desc: 'Rigorous testing across all devices and browsers. We check performance, security, and user experience before anything goes live.',
    duration: '2–3 Days',
    deliverables: [
      'Cross-browser Testing',
      'Mobile Responsiveness',
      'Speed Optimization',
      'Security Audit',
    ],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Launch & Deploy',
    desc: 'Smooth deployment with zero downtime. We handle domain setup, SSL, hosting configuration, and ensure everything is live and running perfectly.',
    duration: '1 Day',
    deliverables: ['Domain Setup', 'SSL Certificate', 'CDN Configuration', 'Go-Live Support'],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Support & Growth',
    desc: 'Post-launch support, performance monitoring, and ongoing optimization to ensure your digital presence keeps growing and converting.',
    duration: 'Ongoing',
    deliverables: ['24/7 Monitoring', 'Regular Updates', 'SEO Optimization', 'Analytics Reports'],
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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
      id="process"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-20 overflow-hidden"
      style={{ background: '#fafaf9' }}
    >
      {/* Decorative */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,130,0,0.05)',
          filter: 'blur(80px)',
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label">How We Work</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '600px' }}
            >
              Our Development
              <br />
              <span style={{ color: '#8a8f8d' }}>Process.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: '1rem', maxWidth: '360px', lineHeight: 1.7 }}
            >
              A proven, transparent process that delivers on time, on budget, and beyond
              expectations — every single time.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Step List */}
          <div className="flex flex-col gap-2">
            {steps?.map((step, i) => (
              <div key={step?.number} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <button
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1.2rem',
                    border: `1px solid ${activeStep === i ? 'rgba(255,130,0,0.3)' : 'rgba(138,143,141,0.15)'}`,
                    background: activeStep === i ? 'rgba(255,130,0,0.04)' : 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s cubic-bezier(0.625, 0.05, 0, 1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: activeStep === i ? '#FF8200' : '#8a8f8d',
                      letterSpacing: '0.1em',
                      minWidth: '28px',
                      transition: 'color 0.3s ease-out',
                    }}
                  >
                    {step?.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        activeStep === i ? 'rgba(255,130,0,0.1)' : 'rgba(138,143,141,0.06)',
                      border: `1px solid ${activeStep === i ? 'rgba(255,130,0,0.2)' : 'rgba(138,143,141,0.15)'}`,
                      color: activeStep === i ? '#FF8200' : '#8a8f8d',
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    {step?.icon}
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <div
                      style={{
                        fontFamily: 'var(--font-display), sans-serif',
                        fontSize: '1.08rem',
                        fontWeight: 600,
                        color: '#111822',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {step?.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body), sans-serif',
                        fontSize: '0.75rem',
                        color: activeStep === i ? '#FF8200' : '#8a8f8d',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        transition: 'color 0.3s ease-out',
                      }}
                    >
                      {step?.duration}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={activeStep === i ? '#FF8200' : '#8a8f8d'}
                    strokeWidth="2"
                    style={{
                      transition: 'all 0.3s ease-out',
                      transform: activeStep === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Right: Active Step Detail */}
          <div
            className="reveal lg:sticky lg:top-32 self-start"
            style={{ transitionDelay: '300ms' }}
          >
            <div
              style={{
                padding: '3rem',
                borderRadius: '2rem',
                border: '1px solid rgba(255,130,0,0.15)',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
              }}
            >
              {/* Step number big */}
              <div
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: '5rem',
                  fontWeight: 600,
                  color: 'rgba(255,130,0,0.12)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {steps?.[activeStep]?.number}
              </div>

              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255,130,0,0.1)',
                    border: '1px solid rgba(255,130,0,0.2)',
                    color: '#FF8200',
                  }}
                >
                  {steps?.[activeStep]?.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      color: '#111822',
                      lineHeight: 1.2,
                    }}
                  >
                    {steps?.[activeStep]?.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.78rem',
                      color: '#FF8200',
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {steps?.[activeStep]?.duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.95rem',
                  color: '#8a8f8d',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                {steps?.[activeStep]?.desc}
              </p>

              {/* Deliverables */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#111822',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Deliverables
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {steps?.[activeStep]?.deliverables?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                      style={{
                        padding: '0.6rem 0.8rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(255,130,0,0.04)',
                        border: '1px solid rgba(255,130,0,0.12)',
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#FF8200',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '0.78rem',
                          color: '#334049',
                          lineHeight: 1.3,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
