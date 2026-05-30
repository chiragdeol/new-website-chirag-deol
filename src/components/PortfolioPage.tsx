'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/lib/portfolio-projects';
import PortfolioHero from './PortfolioHero';
import PortfolioFooter from './PortfolioFooter';

const categories = ['ALL', 'WEBSITE', 'E-COMMERCE', 'TRAVEL', 'REAL ESTATE'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const filteredProjects =
    activeCategory === 'ALL'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: '#000000', color: '#FCFCFD', fontFamily: 'var(--font-body), Inter, sans-serif' }}>
      {/* mdx.so styled Portfolio Hero */}
      <PortfolioHero />

      {/* Filter + Grid Section — dark theme */}
      <section
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2.5rem) clamp(4rem, 8vw, 7rem)',
        }}
      >
        {/* Category filter pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              style={{
                borderRadius: '3rem',
                padding: '0.55rem 1.4rem',
                fontSize: '0.82rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.625,0.05,0,1)',
                border: activeCategory === category
                  ? '1px solid rgba(255,130,0,0.6)'
                  : '1px solid rgba(255,255,255,0.12)',
                background: activeCategory === category
                  ? 'rgba(255,130,0,0.12)'
                  : 'transparent',
                color: activeCategory === category
                  ? '#FCFCFD'
                  : 'rgba(252,252,253,0.45)',
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#FCFCFD';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(252,252,253,0.45)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project cards grid */}
        <div
          id="portfolio-grid"
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
          }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              style={{
                overflow: 'hidden',
                borderRadius: '1.25rem',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.4s cubic-bezier(0.625,0.05,0,1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,130,0,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#0a0f17' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.625,0.05,0,1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '1rem',
                    borderRadius: '2rem',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    padding: '0.3rem 0.9rem',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(252,252,253,0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display), Playfair Display, serif',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#FCFCFD',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    lineHeight: 1.65,
                    color: 'rgba(252,252,253,0.4)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderRadius: '3rem',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '0.5rem 1.2rem',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      color: '#FCFCFD',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,130,0,0.15)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,130,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    Visit site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'rgba(252,252,253,0.2)',
                    }}
                  >
                    Live project
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* mdx.so styled Portfolio Footer */}
      <PortfolioFooter />

      {/* Floating WhatsApp contact */}
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
          gap: '0.6rem',
          borderRadius: '3rem',
          background: '#25D366',
          padding: '0.75rem 1.3rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#ffffff',
          textDecoration: 'none',
          boxShadow: '0 10px 40px rgba(37,211,102,0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 14px 50px rgba(37,211,102,0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 40px rgba(37,211,102,0.3)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>
    </main>
  );
}
