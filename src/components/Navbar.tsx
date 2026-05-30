'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeSection: string;
  isDark?: boolean;
}

export default function Navbar({ activeSection, isDark = false }: NavbarProps) {
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

  const navLinks = [
    { label: 'Home', href: '/#hero', id: 'hero' },
    { label: 'Services', href: '/#services', id: 'services' },
    { label: 'Work', href: '/portfolio', id: 'portfolio' },
  ];

  return (
    <>
      <nav
        className={`mdx-navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ 
          padding: scrolled ? '1rem clamp(1.25rem, 5vw, 5rem)' : '1.8rem clamp(1.25rem, 5vw, 5rem)',
          zIndex: 100,
          transition: 'all 0.3s ease-out',
          ...(isDark && {
            backgroundColor: scrolled ? 'rgba(10, 15, 23, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          })
        }}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/#hero"
            className="flex items-center gap-2 group"
            aria-label="Chirag Deol - Home"
          >
            <div className="flex items-center">
              <span
                className="font-display font-medium tracking-wider"
                style={{
                  fontSize: '1.4rem',
                  color: isDark ? '#FCFCFD' : '#111822',
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
          </Link>
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="relative group"
              style={{
                color: activeSection === link.id ? (isDark ? '#FCFCFD' : '#111822') : (isDark ? 'rgba(252,252,253,0.45)' : '#8a8f8d'),
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease-out',
                textDecoration: 'none',
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
            </Link>
          ))}
        </div>

        {/* Right: CTA + Menu */}
        <div className="flex items-center gap-8">
          {/* Let's Talk - desktop */}
          <Link
            href="/#contact"
            className="hidden md:flex items-center gap-2 group"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: isDark ? '#FCFCFD' : '#111822',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
          >
            <span>Let&apos;s Talk</span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
              }}
              className="group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>

          {/* Divider */}
          <div
            className="hidden md:block w-px h-4"
            style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(17,24,32,0.2)' }}
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
                backgroundColor: isDark ? '#FCFCFD' : '#111822',
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
                backgroundColor: isDark ? '#FCFCFD' : '#111822',
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
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} style={{ padding: '2rem 3rem', zIndex: 110 }}>
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
            { label: 'Home', href: '/#hero' },
            { label: 'Services', href: '/#services' },
            { label: 'Work', href: '/portfolio' },
            { label: 'Contact', href: '/#contact' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-left group flex items-center gap-3"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 500,
                color: '#111822',
                opacity: 0.75,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'opacity 0.3s ease-out',
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#FF8200', opacity: 0, transition: 'opacity 0.3s' }}
              />
              {link.label}
            </Link>
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
