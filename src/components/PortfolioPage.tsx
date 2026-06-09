'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/lib/portfolio-projects';
import PortfolioHero from './PortfolioHero';
import PortfolioFooter from './PortfolioFooter';

const categories = ['ALL', 'WEBSITE', 'E-COMMERCE', 'TRAVEL', 'REAL ESTATE'];

/* ── Individual project card with scroll-reveal ── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolioProjects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.06}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.06}s`,
      }}
    >
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          overflow: 'hidden',
          borderRadius: '1.25rem',
          border: `1px solid ${hovered ? 'rgba(255,130,0,0.25)' : 'rgba(255,255,255,0.06)'}`,
          background: hovered
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(255,255,255,0.015)',
          transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
          cursor: 'pointer',
          boxShadow: hovered
            ? '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,130,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        {/* ── Large image area ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            background: '#0a0e14',
          }}
        >
          <img
            src={project.image}
            alt={project.alt || project.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
          {/* Gradient overlay on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: hovered
                ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%)',
              transition: 'background 0.5s ease',
              pointerEvents: 'none',
            }}
          />
          {/* Category badge */}
          <span
            style={{
              position: 'absolute',
              top: '1.1rem',
              left: '1.1rem',
              borderRadius: '2rem',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(14px)',
              padding: '0.35rem 1rem',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* ── Content area ── */}
        <div
          style={{
            padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                fontWeight: 600,
                color: '#FCFCFD',
                margin: 0,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h2>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '3rem',
                background: hovered
                  ? 'rgba(255,130,0,0.12)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${hovered ? 'rgba(255,130,0,0.35)' : 'rgba(255,255,255,0.1)'}`,
                padding: '0.5rem 1.2rem',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#FCFCFD',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'all 0.35s ease',
                flexShrink: 0,
              }}
            >
              Visit
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>

          <p
            style={{
              fontFamily: 'Inter, var(--font-body), sans-serif',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
              maxWidth: '640px',
            }}
          >
            {project.description}
          </p>
        </div>
      </article>
    </div>
  );
}

/* ── Main Portfolio Page ── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === 'ALL'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000000',
        color: '#FCFCFD',
        fontFamily: 'var(--font-body), Inter, sans-serif',
      }}
    >
      {/* Hero */}
      <PortfolioHero />

      {/* Filter + Stacked Projects */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding:
            'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) clamp(4rem, 8vw, 7rem)',
        }}
      >
        {/* Category filter pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.55rem',
            marginBottom: '3rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isHov = hoveredCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  borderRadius: '3rem',
                  padding: '0.5rem 1.3rem',
                  fontSize: '0.78rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                  border: isActive
                    ? '1px solid rgba(255,130,0,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: isActive
                    ? 'rgba(255,130,0,0.12)'
                    : isHov
                      ? 'rgba(255,255,255,0.04)'
                      : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project count */}
        <div
          style={{
            fontSize: '0.72rem',
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          {filteredProjects.length} Project
          {filteredProjects.length !== 1 ? 's' : ''}
        </div>

        {/* Stacked full-width project cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <PortfolioFooter />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919870903026?text=Hello!%20I%20want%20to%20discuss%20a%20portfolio%20project."
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          right: '1.5rem',
          bottom: '1.5rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderRadius: '3rem',
          background: '#25D366',
          padding: '0.7rem 1.2rem',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#ffffff',
          textDecoration: 'none',
          boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            'translateY(-3px)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 12px 40px rgba(37,211,102,0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            'translateY(0)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 8px 30px rgba(37,211,102,0.3)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </a>
    </main>
  );
}
