'use client';
import React, { useState, useEffect, useRef } from 'react';
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
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.65s cubic-bezier(0.625,0.05,0,1) ${index * 0.07}s, transform 0.65s cubic-bezier(0.625,0.05,0,1) ${index * 0.07}s`,
      }}
    >
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-grid__item"
      >
        <div className="project-grid__image-wrapper">
          <img
            src={project.image}
            alt={project.alt || project.title}
            loading="lazy"
          />
        </div>

        <div className="project-grid__service">
          {project.category}
        </div>

        <div className="project-grid__link">
          <span className="project-grid__link-text">
            {project.title}
          </span>
          <span className="project-grid__link-arrow-wrapper">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ── Main Portfolio Page ── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');

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

      {/* Filter + Grid */}
      <section
        style={{
          maxWidth: '92rem',
          margin: '0 auto',
          padding:
            'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 2.5vw, 1.5rem) clamp(4rem, 8vw, 7rem)',
        }}
      >
        {/* ── Category filter pills — MDX.so style ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  borderRadius: '3rem',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.82rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: isActive
                    ? '1.5px solid #ffffff'
                    : '1.5px solid rgba(255,255,255,0.2)',
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#000000' : 'rgba(255,255,255,0.6)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(255,255,255,0.5)';
                    (e.currentTarget as HTMLButtonElement).style.color =
                      '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLButtonElement).style.color =
                      'rgba(255,255,255,0.6)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── 2-column project grid — MDX.so style ── */}
        <div className="projects-grid-mdx">
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

      {/* Embedded CSS matching MDX.so styling */}
      <style>{`
        /* ── 2-column project grid ── */
        .projects-grid-mdx {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 5vw, 5.6rem);
          margin-bottom: 5.8rem;
        }

        @media (max-width: 768px) {
          .projects-grid-mdx {
            grid-template-columns: 1fr !important;
            gap: 3.8rem !important;
          }
        }

        /* ── Card container link ── */
        .project-grid__item {
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        /* ── Image area ── */
        .project-grid__image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 906 / 510;
          overflow: hidden;
          border-radius: 0.75rem;
          background: #0a0e14;
          margin-bottom: clamp(1.2rem, 2vw, 2.3rem);
        }

        .project-grid__image-wrapper img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .project-grid__item:hover .project-grid__image-wrapper img {
          transform: scale(1.04);
        }

        /* ── Category text ── */
        .project-grid__service {
          color: #8c8c8c;
          font-family: var(--font-body), Inter, sans-serif;
          font-size: clamp(0.75rem, 1.2vw, 1rem);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: clamp(0.6rem, 1vw, 0.9rem);
          line-height: normal;
        }

        /* ── Title and Link row ── */
        .project-grid__link {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 2vw, 2.4rem);
          width: fit-content;
        }

        .project-grid__link-text {
          color: #fcfcfd;
          font-family: var(--font-display), Aventa, sans-serif;
          font-size: clamp(1.3rem, 2.8vw, 2.2rem);
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.6px;
          transition: opacity 0.35s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .project-grid__item:hover .project-grid__link-text {
          opacity: 0.65;
        }

        /* ── Arrow icon sliding animation ── */
        .project-grid__link-arrow-wrapper {
          --arrow-size: 1.4rem;
          width: var(--arrow-size);
          height: var(--arrow-size);
          overflow: hidden;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .project-grid__link-arrow-wrapper {
            --arrow-size: 2.2rem;
          }
        }

        .project-grid__link-arrow-wrapper svg {
          width: 100%;
          height: 100%;
          color: #ffffff;
          /* Drop-shadow offset exactly matches current arrow size, shifted to bottom-left */
          filter: drop-shadow(
            calc(-1 * var(--arrow-size)) 
            var(--arrow-size) 
            0px 
            #ff6711
          );
          -webkit-filter: drop-shadow(
            calc(-1 * var(--arrow-size)) 
            var(--arrow-size) 
            0px 
            #ff6711
          );
          transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
        }

        /* Slide arrow diagonally on hover to reveal the orange drop shadow */
        .project-grid__item:hover .project-grid__link-arrow-wrapper svg {
          transform: translate(var(--arrow-size), calc(-1 * var(--arrow-size)));
        }
      `}</style>
    </main>
  );
}
