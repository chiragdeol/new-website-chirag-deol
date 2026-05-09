'use client';
import React, { useEffect, useRef } from 'react';

interface AboutProps {
  onScrollTo: (id: string) => void;
}

export default function About({ onScrollTo }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal, .reveal-left');
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '01',
      title: 'Strategy Before Screens',
      desc: 'We start from your growth goals, user pain points, and conversion path before writing a single line.',
    },
    {
      icon: '02',
      title: 'Senior-Led Execution',
      desc: 'No handoff chaos. You work directly with decision-makers across product, design, and engineering.',
    },
    {
      icon: '03',
      title: 'High-Trust Communication',
      desc: 'Weekly milestone updates, transparent timelines, and shared ownership of blockers and wins.',
    },
    {
      icon: '04',
      title: 'Conversion-Focused UX',
      desc: 'Every interaction is tuned to reduce friction, improve clarity, and lift lead quality.',
    },
    {
      icon: '05',
      title: 'Scale-Ready Engineering',
      desc: 'Architecture and code quality built for future products, traffic spikes, and new market expansion.',
    },
    {
      icon: '06',
      title: 'Post-Launch Growth Partner',
      desc: 'After launch, we continue with CRO experiments, performance upgrades, and roadmap support.',
    },
  ];

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative py-28 px-8 md:px-20 overflow-hidden md:py-36"
      style={{ background: '#ffffff' }}
    >
      {/* Background accent */}
      <div
        className="absolute"
        style={{
          top: '10%',
          right: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 130, 0, 0.04)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-[4.5rem] reveal md:mb-20">
          <div className="section-label">Why Choose Me</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="display-heading"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '600px' }}
            >
              Built with Clarity.
              <br />
              <span style={{ color: '#8a8f8d' }}>Engineered to Perform.</span>
            </h2>
            <p
              className="body-text"
              style={{ fontSize: '1rem', maxWidth: '360px', lineHeight: 1.7 }}
            >
              Beyond pretty interfaces, every deliverable is mapped to business outcomes: better
              engagement, stronger brand recall, and measurable conversions.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="card-why-root">
                <div
                  className="card-why-badge w-12 h-12 rounded-xl mb-5 flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 130, 0, 0.08)',
                    border: '1px solid rgba(255, 130, 0, 0.2)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#FF8200',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body), sans-serif',
                    }}
                  >
                    {feature.icon}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#111822',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.9rem',
                    color: '#6f7673',
                    lineHeight: 1.65,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex items-center justify-center reveal md:mt-20">
          <button onClick={() => onScrollTo('contact')} className="btn-cta">
            <div className="btn-bg" />
            <span className="btn-text">LET&apos;S WORK TOGETHER</span>
            <span className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
