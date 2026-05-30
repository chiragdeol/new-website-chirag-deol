'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function PortfolioHero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Subtle floating particle field (sparse, dark — not dot-grid)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; a: number; vx: number; vy: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn sparse warm particles
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.35 + 0.05,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.18,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 145, 30, ${p.a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '60vh',
        paddingTop: '80px',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* ── Volumetric orange glow — pushed below navbar ── */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(380px, 60vw, 750px)',
          height: 'clamp(240px, 38vw, 480px)',
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(220, 95, 10, 0.45) 0%, rgba(190, 60, 5, 0.28) 28%, rgba(130, 35, 0, 0.12) 55%, transparent 78%)',
          filter: 'blur(52px)',
          zIndex: 1,
          pointerEvents: 'none',
          animation: 'glowPulse 6s ease-in-out infinite',
        }}
      />
      {/* Secondary cooler inner bloom — also pushed down */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(180px, 30vw, 400px)',
          height: 'clamp(140px, 24vw, 320px)',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(255, 200, 100, 0.12) 0%, rgba(255, 120, 20, 0.06) 45%, transparent 72%)',
          filter: 'blur(28px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── 3D Sphere with orbiting rings ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div className="sphere-scene">
          {/* Core sphere */}
          <div className="sphere-core" />
          {/* Orbit ring 1 */}
          <div className="orbit orbit-1">
            <div className="orbit-dot" />
          </div>
          {/* Orbit ring 2 */}
          <div className="orbit orbit-2">
            <div className="orbit-dot orbit-dot-2" />
          </div>
          {/* Orbit ring 3 */}
          <div className="orbit orbit-3">
            <div className="orbit-dot orbit-dot-3" />
          </div>
          {/* Equatorial glow ring */}
          <div className="equator-ring" />
        </div>
      </div>

      {/* ── PORTFOLIO Heading ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: '0 1rem',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s cubic-bezier(0.625,0.05,0,1), transform 1s cubic-bezier(0.625,0.05,0,1)',
        }}
      >
        <h1
          style={{
            fontFamily: '"Syne", var(--font-display), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 8vw, 7.5rem)',
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 0 80px rgba(255,100,0,0.15)',
          }}
        >
          PORTFOLIO
        </h1>
      </div>

      {/* Bottom fade to project grid */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* ── Scroll cue ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: mounted ? 0.55 : 0,
          transition: 'opacity 1.2s ease 0.6s',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '52px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,100,20,0.7))',
            animation: 'scrollLinePulse 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        /* Glow orb breathe */
        @keyframes glowPulse {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50%       { opacity: 0.82; transform: translateX(-50%) scale(1.04); }
        }

        /* Scroll indicator */
        @keyframes scrollLinePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ── 3-D Sphere scene ── */
        .sphere-scene {
          position: relative;
          width: clamp(140px, 22vw, 260px);
          height: clamp(140px, 22vw, 260px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Core sphere — warm glowing CSS ball */
        .sphere-core {
          position: absolute;
          width: 52%;
          height: 52%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 36% 32%,
            rgba(255, 200, 120, 0.95) 0%,
            rgba(230, 110, 20, 0.85) 35%,
            rgba(160, 55, 5, 0.75) 65%,
            rgba(80, 20, 0, 0.55) 100%
          );
          box-shadow:
            0 0 40px 8px rgba(230, 100, 10, 0.45),
            0 0 80px 20px rgba(200, 70, 5, 0.22),
            0 0 120px 40px rgba(180, 50, 0, 0.10),
            inset -8px -8px 24px rgba(0,0,0,0.35),
            inset 6px 6px 18px rgba(255,200,120,0.45);
          animation: sphereFloat 7s ease-in-out infinite, spherePulse 5s ease-in-out infinite;
        }

        @keyframes sphereFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        @keyframes spherePulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255,100,10,0.5)); }
          50%       { filter: drop-shadow(0 0 38px rgba(255,140,10,0.7)); }
        }

        /* Shared orbit ring style */
        .orbit {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(255,120,20,0.28);
        }

        /* Orbit dot — small bright bead on each ring */
        .orbit-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffb060 0%, #ff6010 70%);
          box-shadow: 0 0 10px 2px rgba(255,120,20,0.7);
          top: -4px;
          left: calc(50% - 3.5px);
        }
        .orbit-dot-2 { background: radial-gradient(circle, #ffd090 0%, #ff8020 70%); top: calc(50% - 3.5px); left: -4px; }
        .orbit-dot-3 { background: radial-gradient(circle, #ffe0b0 0%, #ffaa40 70%); bottom: -4px; top: auto; }

        /* Individual ring transforms + rotation speeds */
        .orbit-1 {
          transform: rotateX(72deg) rotateY(18deg);
          animation: spin1 9s linear infinite;
        }
        .orbit-2 {
          transform: rotateX(20deg) rotateY(68deg);
          animation: spin2 14s linear infinite reverse;
        }
        .orbit-3 {
          transform: rotateX(48deg) rotateZ(38deg);
          animation: spin3 11s linear infinite;
        }

        @keyframes spin1 { from { transform: rotateX(72deg) rotateY(18deg) rotateZ(0deg);   } to { transform: rotateX(72deg) rotateY(18deg) rotateZ(360deg);   } }
        @keyframes spin2 { from { transform: rotateX(20deg) rotateY(68deg) rotateZ(0deg);   } to { transform: rotateX(20deg) rotateY(68deg) rotateZ(360deg);   } }
        @keyframes spin3 { from { transform: rotateX(48deg) rotateZ(38deg) rotateY(0deg);   } to { transform: rotateX(48deg) rotateZ(38deg) rotateY(360deg);   } }

        /* Equatorial flat ring (disc at horizon) */
        .equator-ring {
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 140, 30, 0.18);
          transform: rotateX(80deg);
          box-shadow: 0 0 12px 2px rgba(255,100,10,0.08);
        }
      `}</style>
    </section>
  );
}
