'use client';
import React, { useEffect, useState } from 'react';

export default function PortfolioHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(340px, 50vh, 520px)',
        paddingTop: '120px',
        paddingBottom: '60px',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(150px, 25vw, 300px)',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255,130,0,0.08) 0%, rgba(255,100,0,0.03) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main heading */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 1.5rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition:
            'opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: 'Inter, var(--font-body), sans-serif',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF8200',
            marginBottom: '1.5rem',
          }}
        >
          Selected Work
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Projects
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Inter, var(--font-body), sans-serif',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.65,
            maxWidth: '480px',
            margin: '1.5rem auto 0',
          }}
        >
          A curated collection of digital products and platforms
          we&apos;ve designed, built, and shipped for ambitious brands.
        </p>
      </div>

      {/* Decorative line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '60px',
          background:
            'linear-gradient(to bottom, transparent, rgba(255,130,0,0.35))',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1.2s ease 0.5s',
        }}
      />
    </section>
  );
}
