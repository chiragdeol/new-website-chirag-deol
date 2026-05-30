'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface ProjectSpec {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  image: string;
  themeColor: string;
  borderColor: string;
  stats: { value: string; label: string }[];
}

const featuredProjects: ProjectSpec[] = [
  {
    id: 1,
    title: 'Kameswari Jewellers',
    category: 'WEBSITE',
    description: 'A luxury jewellery brand experience built for product storytelling, high-intent conversions, and elegant mobile browsing.',
    url: 'https://kameswarijewellers.in',
    image: '/portfolio-1.png',
    themeColor: 'linear-gradient(135deg, #1e160a 0%, #3f2f17 100%)',
    borderColor: 'rgba(212, 175, 55, 0.3)',
    stats: [
      { value: '+50%', label: 'Mobile Sessions Growth' },
      { value: '2.4s', label: 'Average Page Load Time' },
      { value: '+40%', label: 'Inbound Leads Growth' },
    ],
  },
  {
    id: 2,
    title: 'Talbots',
    category: 'E-COMMERCE',
    description: 'A premium fashion storefront with conversion-driven UX, customized product filtering, and lightweight page speed optimizations.',
    url: 'https://www.talbots.com/',
    image: '/portfolio-2.png',
    themeColor: 'linear-gradient(135deg, #1f0b0c 0%, #47171a 100%)',
    borderColor: 'rgba(239, 68, 68, 0.25)',
    stats: [
      { value: '+35%', label: 'Checkout Conversion Lift' },
      { value: '20%', label: 'AOV Increase' },
      { value: '15M+', label: 'Monthly Visitors Supported' },
    ],
  },
  {
    id: 5,
    title: 'Sunsama',
    category: 'WEBSITE',
    description: 'A productivity platform marketing website focusing on fast user onboarding, high-intent landing layouts, and zero-friction navigation.',
    url: 'https://www.sunsama.com/',
    image: '/portfolio-5.png',
    themeColor: 'linear-gradient(135deg, #0d1c1e 0%, #1b3d42 100%)',
    borderColor: 'rgba(20, 184, 166, 0.25)',
    stats: [
      { value: '+85%', label: 'Onboarding Funnel Completion' },
      { value: '1.8s', label: 'First Contentful Paint' },
      { value: '2x', label: 'Search Visibility Lift' },
    ],
  },
  {
    id: 4,
    title: 'Beauty Barn',
    category: 'E-COMMERCE',
    description: 'A premium Korean cosmetics storefront optimized for lightning-quick catalog discovery, cart retention, and high mobile conversion.',
    url: 'https://beautybarn.in/',
    image: '/portfolio-4.png',
    themeColor: 'linear-gradient(135deg, #1a0b1f 0%, #3e174b 100%)',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    stats: [
      { value: '60%', label: 'Repeat Customer Rate' },
      { value: '4.1x', label: 'Ad Spend Return (ROAS)' },
      { value: '3s', label: 'Reduced Time-to-Interactive' },
    ],
  },
  {
    id: 8,
    title: 'AIT Square',
    category: 'REAL ESTATE',
    description: 'A modern real estate portal for Dubai realtors syncing thousands of active property listings daily with automated CRM lead routes.',
    url: 'https://aitsquare.com/',
    image: '/portfolio-8.png',
    themeColor: 'linear-gradient(135deg, #0b1a2d 0%, #17375e 100%)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    stats: [
      { value: '75%', label: 'More Qualified Inbound Leads' },
      { value: '30%', label: 'Listing Engagement Boost' },
      { value: '500+', label: 'Syncs Daily' },
    ],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeProject = featuredProjects[activeTab];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Rotate maximum 12 degrees
    const rotateX = -normalizedY * 12;
    const rotateY = normalizedX * 12;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#04070a',
        padding: 'clamp(5rem, 11vw, 9.5rem) 0',
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-150px',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255,130,0,0.04)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-100px',
          right: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(255, 140, 30, 0.03)',
          filter: 'blur(110px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="section-label">Case Studies</div>
            <h2
              className="display-heading text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}
            >
              Projects That
              <br />
              <span style={{ color: 'rgba(252,252,253,0.35)' }}>Drive Business.</span>
            </h2>
          </div>
          <p
            className="body-text"
            style={{ fontSize: '1rem', maxWidth: '380px', lineHeight: 1.7, color: 'rgba(252,252,253,0.45)' }}
          >
            A curated selection of our high-performing platforms engineered to deliver measurable customer growth and conversion lift.
          </p>
        </div>

        {/* Appinventiv-style Brand Tab Pill Navigation */}
        <div 
          className="reveal"
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.6rem', 
            marginBottom: '3.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: '1.5rem'
          }}
        >
          {featuredProjects.map((project, idx) => {
            const isActive = activeTab === idx;
            const isHovered = hoveredTab === idx;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  borderRadius: '3rem',
                  padding: '0.65rem 1.6rem',
                  fontSize: '0.86rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.625,0.05,0,1)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: isActive 
                    ? 'rgba(255, 130, 0, 0.15)' 
                    : isHovered 
                      ? 'rgba(255,255,255,0.05)' 
                      : 'rgba(255,255,255,0.01)',
                  color: isActive 
                    ? '#ffffff' 
                    : 'rgba(252,252,253,0.5)',
                  borderColor: isActive 
                    ? '#FF8200' 
                    : isHovered 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'rgba(255,255,255,0.08)',
                }}
              >
                {project.title}
              </button>
            );
          })}
        </div>

        {/* Highlight Case Study Card Layout */}
        <div
          className="reveal"
          style={{
            borderRadius: '2rem',
            background: activeProject.themeColor,
            border: `1px solid ${activeProject.borderColor}`,
            padding: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            transition: 'all 0.6s cubic-bezier(0.625,0.05,0,1)',
            overflow: 'hidden',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: details & stats */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span
                style={{
                  alignSelf: 'flex-start',
                  borderRadius: '2rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '0.35rem 1.1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.12em',
                  marginBottom: '1.5rem',
                }}
              >
                {activeProject.category}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display), Playfair Display, serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {activeProject.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '2.5rem',
                  maxWidth: '520px',
                }}
              >
                {activeProject.description}
              </p>

              {/* Stats values */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1rem', 
                  marginBottom: '2.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '1.8rem'
                }}
              >
                {activeProject.stats.map((st, sidx) => (
                  <div key={sidx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display), Playfair Display, serif',
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 600,
                        color: '#FF8200',
                        lineHeight: 1.1,
                      }}
                    >
                      {st.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.74rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.4,
                      }}
                    >
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visit Link */}
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
                style={{ alignSelf: 'flex-start', padding: '1.2rem 2.8rem' }}
              >
                <div className="btn-bg" style={{ background: '#ffffff' }} />
                <span className="btn-text" style={{ color: '#04070a', fontWeight: 500 }}>
                  Visit Live Site
                </span>
                <span className="btn-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#04070a" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Right side: 3D interactive mockup preview */}
            <div 
              className="lg:col-span-6 flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '480px',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
                  transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  ...tiltStyle
                }}
              >
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} screenshot`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center reveal">
          <Link
            href="/portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              borderRadius: '3rem',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.03)',
              padding: '1.1rem 2.8rem',
              fontSize: '0.86rem',
              fontWeight: 500,
              color: '#ffffff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,130,0,0.5)';
              e.currentTarget.style.background = 'rgba(255,130,0,0.08)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <span>View All Projects</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transition: 'transform 0.3s ease' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
