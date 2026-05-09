'use client';
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const sphereRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tags = ['WordPress', '3D Design', 'E-commerce', '+'];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #f8f6f3 0%, #f0ece6 30%, #e8e2da 60%, #f5f3f0 100%)',
      }}
    >
      {/* Background blur orbs */}
      <div
        className="blur-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'rgba(255, 170, 82, 0.15)',
          top: '-100px',
          right: '-100px',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="blur-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'rgba(255, 130, 0, 0.08)',
          bottom: '100px',
          left: '-50px',
          filter: 'blur(100px)',
        }}
      />

      {/* 3D Sphere - Center */}
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 1,
        }}
      >
        <div
          ref={sphereRef}
          className="sphere-3d"
          style={{
            width: 'clamp(280px, 40vw, 520px)',
            height: 'clamp(280px, 40vw, 520px)',
          }}
        />
        {/* Orbit ring */}
        <div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(340px, 48vw, 620px)',
            height: 'clamp(340px, 48vw, 620px)',
            borderRadius: '50%',
            border: '1px solid rgba(138,143,141,0.15)',
            animation: 'orbitRing 30s linear infinite',
          }}
        >
          {/* Orbit dot */}
          <div
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: '#FF8200',
              top: '0',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 12px rgba(255,130,0,0.6)',
            }}
          />
        </div>
      </div>

      {/* Hero Content */}
      <div
        className="relative flex flex-col justify-end pb-16 px-8 md:px-20 flex-1"
        style={{ zIndex: 2, paddingTop: '120px' }}
      >
        {/* Trust badge */}
        <div
          className="flex items-center gap-2 mb-6"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.625, 0.05, 0, 1) 0.1s',
          }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white"
                style={{
                  background: `hsl(${i * 40 + 20}, 60%, 65%)`,
                  zIndex: 4 - i,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#8a8f8d',
              letterSpacing: '0.02em',
            }}
          >
            Trusted by 60+ Happy Clients Worldwide
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.625, 0.05, 0, 1) 0.2s',
          }}
        >
          <h1
            className="display-heading"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              lineHeight: '1.0',
              maxWidth: '700px',
              marginBottom: '0.3rem',
            }}
          >
            Crafting Digital
          </h1>
          <h2
            className="display-heading"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 6rem)',
              lineHeight: '1.0',
              maxWidth: '700px',
              color: '#8a8f8d',
              marginBottom: '1.5rem',
            }}
          >
            Excellence.
          </h2>
        </div>

        {/* Subtext + CTA row */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.625, 0.05, 0, 1) 0.35s',
          }}
        >
          {/* Left: description + CTA */}
          <div className="flex flex-col gap-6">
            <p
              className="body-text"
              style={{
                fontSize: '1rem',
                maxWidth: '380px',
                lineHeight: 1.6,
              }}
            >
              Your trusted partner in building powerful, conversion-focused digital solutions that
              drive real business growth.
            </p>
            <button
              onClick={() => onScrollTo('contact')}
              className="btn-cta"
              style={{ alignSelf: 'flex-start' }}
            >
              <div className="btn-bg" />
              <span className="btn-text">LET&apos;S TALK</span>
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </button>
          </div>

          {/* Right: description + tags */}
          <div className="flex flex-col gap-4 max-w-xs">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: '#8a8f8d',
                lineHeight: 1.6,
              }}
            >
              Whether through intuitive interfaces, immersive 3D, or bold visual storytelling,{' '}
              <span style={{ color: '#111822', fontWeight: 500 }}>
                we design moments that people don&apos;t just see — they feel.
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="btn-outline" style={{ padding: '0.4rem 1rem' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      color: '#8a8f8d',
                    }}
                  >
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex flex-wrap gap-6 mt-12 pt-8"
          style={{
            borderTop: '1px solid rgba(138,143,141,0.2)',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.9s cubic-bezier(0.625, 0.05, 0, 1) 0.5s',
          }}
        >
          {[
            { value: '6+', label: 'Years of Excellence' },
            { value: '70+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#111822',
                  letterSpacing: '0.02em',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: '#8a8f8d',
                  letterSpacing: '0.04em',
                }}
              >
                {stat.label}
              </span>
              <div className="w-px h-6 ml-3" style={{ backgroundColor: 'rgba(138,143,141,0.3)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(138,143,141,0.5))',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
