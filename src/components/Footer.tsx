'use client';
import React, { useEffect, useRef } from 'react';

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About', id: 'why' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={sectionRef} className="mdx-footer" style={{ padding: '8rem 5rem 3rem' }}>
      {/* Top: Big text */}
      <div className="max-w-7xl mx-auto">
        <p
          className="reveal"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#8a8f8d',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Is there a fascinating project
          <span style={{ color: '#FCFCFD' }}> brewing in your mind?</span>
        </p>

        {/* Email link */}
        <a
          href="mailto:hello@chiragdeol.in"
          className="flex items-center gap-4 group mb-16 reveal"
          style={{ textDecoration: 'none', width: 'fit-content' }}
        >
          <div className="overflow-hidden" style={{ width: '3.5rem', height: '3.5rem' }}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FCFCFD"
              strokeWidth="1.5"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.625, 0.05, 0, 1)',
                filter: 'drop-shadow(#FCFCFD -3.5rem 3.5rem 0px)',
              }}
              className="group-hover:translate-x-14 group-hover:-translate-y-14"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 4vw, 4.5rem)',
              fontWeight: 500,
              color: '#FCFCFD',
              letterSpacing: '0.02em',
              lineHeight: 1,
              transition: 'opacity 0.3s ease-out',
            }}
            className="group-hover:opacity-80"
          >
            hello@chiragdeol.in
          </span>
        </a>

        {/* Nav + Social */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 reveal">
          <nav className="flex flex-wrap gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: '#FCFCFD',
                  letterSpacing: '0.02em',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'opacity 0.3s ease-out',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/chirag-deol/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                border: '1px solid rgba(138,143,141,0.4)',
                transition: 'all 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FCFCFD';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(138,143,141,0.4)';
              }}
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#8a8f8d">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="reveal"
          style={{
            height: '1px',
            background: 'rgba(138,143,141,0.2)',
            marginBottom: '3rem',
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 reveal">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#FCFCFD',
                letterSpacing: '0.08em',
              }}
            >
              CD
            </span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF8200' }} />
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#8a8f8d',
              letterSpacing: '0.02em',
            }}
          >
            © 2026 Chirag Deol. All rights reserved.
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#FCFCFD',
                letterSpacing: '0.04em',
                transition: 'opacity 0.3s ease-out',
              }}
              className="group-hover:opacity-70"
            >
              Back to top
            </span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                border: '1px solid rgba(138,143,141,0.4)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8a8f8d"
                strokeWidth="2"
                style={{
                  transform: 'rotate(-90deg)',
                }}
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
