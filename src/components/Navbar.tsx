'use client';
import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuBarHovered, setMenuBarHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'portfolio' },
  ];

  return (
    <>
      <nav
        className={`mdx-navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ padding: '1.8rem 5rem' }}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
            aria-label="Chirag Deol - Home"
          >
            <div className="flex items-center">
              <span
                className="font-display font-medium tracking-wider"
                style={{
                  fontSize: '1.4rem',
                  color: '#111822',
                  letterSpacing: '0.08em',
                }}
              >
                CD
              </span>
              <div
                className="ml-2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#FF8200' }}
              />
            </div>
          </button>
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative group"
              style={{
                color: activeSection === link.id ? '#111822' : '#8a8f8d',
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease-out',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px bg-current transition-transform duration-500"
                style={{
                  width: '100%',
                  transform: activeSection === link.id ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transitionTimingFunction: 'cubic-bezier(0.625, 0.05, 0, 1)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Right: CTA + Menu */}
        <div className="flex items-center gap-8">
          {/* Let's Talk - desktop */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:flex btn-cta"
            style={{ padding: '1rem 2.4rem' }}
          >
            <div className="btn-bg" />
            <span className="btn-text" style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}>
              Let&apos;s Talk
            </span>
            <span className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>

          {/* Divider */}
          <div
            className="hidden md:block w-px h-4"
            style={{ backgroundColor: 'rgba(17,24,32,0.2)' }}
          />

          {/* Hamburger */}
          <button
            className="flex flex-col justify-between items-center cursor-pointer"
            style={{
              width: '52px',
              height: '14px',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setMenuBarHovered(true)}
            onMouseLeave={() => setMenuBarHovered(false)}
            aria-label="Toggle menu"
          >
            <span
              className="block rounded-full"
              style={{
                width: '36px',
                height: '2px',
                backgroundColor: '#111822',
                transition: 'transform 0.6s cubic-bezier(0.625, 0.05, 0, 1)',
                transform: menuOpen
                  ? 'translateY(6px) rotate(45deg)'
                  : menuBarHovered
                    ? 'translateX(0)'
                    : 'translateX(-25%)',
              }}
            />
            <span
              className="block rounded-full"
              style={{
                width: '36px',
                height: '2px',
                backgroundColor: '#111822',
                transition: 'transform 0.6s cubic-bezier(0.625, 0.05, 0, 1)',
                transform: menuOpen
                  ? 'translateY(-6px) rotate(-45deg)'
                  : menuBarHovered
                    ? 'translateX(0)'
                    : 'translateX(25%)',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile/Full Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{ padding: '2rem 3rem' }}>
        {/* Close button */}
        <div className="flex justify-between items-center mb-16">
          <span
            className="font-display font-medium"
            style={{ fontSize: '1.4rem', color: '#111822', letterSpacing: '0.08em' }}
          >
            CD<span style={{ color: '#FF8200' }}>.</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full border"
            style={{ borderColor: 'rgba(138,143,141,0.3)' }}
            aria-label="Close menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111822"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-6 flex-1">
          {[
            { label: 'Home', id: 'hero' },
            { label: 'Services', id: 'services' },
            { label: 'Portfolio', id: 'portfolio' },
            { label: 'About', id: 'why' },
            { label: 'Contact', id: 'contact' },
          ].map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left group flex items-center gap-3"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                color: '#111822',
                opacity: 0.5,
                letterSpacing: '0.02em',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'opacity 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.5';
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#FF8200', opacity: 0, transition: 'opacity 0.3s' }}
              />
              {link.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="mt-auto pt-8 border-t" style={{ borderColor: 'rgba(138,143,141,0.2)' }}>
          <p style={{ color: '#8a8f8d', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
            hello@chiragdeol.in
          </p>
          <p
            style={{
              color: '#8a8f8d',
              fontSize: '0.85rem',
              fontFamily: 'Inter, sans-serif',
              marginTop: '0.5rem',
            }}
          >
            © 2026 Chirag Deol
          </p>
        </div>
      </div>
    </>
  );
}
