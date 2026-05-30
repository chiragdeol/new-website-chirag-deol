'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PortfolioFooter() {
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
    { label: 'Services', href: '/#services' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'About', href: '/#why' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <footer
      ref={sectionRef}
      style={{
        background: '#070c12',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem) 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle orange glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          left: '10%',
          width: '500px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,130,0,0.04)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Pre-heading label */}
        <p
          className="reveal"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: 'rgba(252,252,253,0.3)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ width: '18px', height: '1px', background: 'rgba(255,130,0,0.5)', display: 'inline-block' }} />
          Is there a fascinating project brewing in your mind?
        </p>

        {/* Email link — large mdx.so style */}
        <a
          href="mailto:hello@chiragdeol.in"
          className="group reveal"
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FCFCFD"
              strokeWidth="1.5"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.625,0.05,0,1)',
                filter: 'drop-shadow(#FCFCFD -3rem 3rem 0px)',
              }}
              className="group-hover:translate-x-12 group-hover:-translate-y-12"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.8rem, 6vw, 5rem)',
              fontWeight: 500,
              color: '#FCFCFD',
              letterSpacing: '0.01em',
              lineHeight: 1.05,
              transition: 'opacity 0.3s ease',
              wordBreak: 'break-word',
            }}
            className="group-hover:opacity-70"
          >
            hello@chiragdeol.in
          </span>
        </a>

        {/* Middle row: nav + socials */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '2.5rem',
            marginBottom: '3.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Nav */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 2rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: 'rgba(252,252,253,0.5)',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  padding: '0.3rem 0',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#FCFCFD';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(252,252,253,0.5)';
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919870903026"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                color: 'rgba(252,252,253,0.45)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#25d366';
                el.style.color = '#25d366';
                el.style.background = 'rgba(37,211,102,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.color = 'rgba(252,252,253,0.45)';
                el.style.background = 'transparent';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/chirag-deol/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                color: 'rgba(252,252,253,0.45)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#0077b5';
                el.style.color = '#0077b5';
                el.style.background = 'rgba(0,119,181,0.08)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.color = 'rgba(252,252,253,0.45)';
                el.style.background = 'transparent';
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#FCFCFD',
                letterSpacing: '0.08em',
              }}
            >
              CD
            </span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF8200' }} />
          </div>

          {/* Copyright */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(252,252,253,0.25)',
              letterSpacing: '0.04em',
            }}
          >
            © 2026 Chirag Deol · All rights reserved
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              color: 'rgba(252,252,253,0.35)',
              letterSpacing: '0.06em',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#FCFCFD';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(252,252,253,0.35)';
            }}
          >
            BACK TO TOP
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(-90deg)' }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
