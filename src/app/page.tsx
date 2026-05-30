'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Industries from '@/components/Industries';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Marquee from '@/components/Marquee';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const sections = ['hero', 'why', 'services', 'industries', 'process', 'portfolio', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px',
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative pb-40 sm:pb-44">
      {/* Loader overlay - fades out */}
      <div
        id="page-loader"
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{
          background: '#000000',
          animation: 'fadeOut 0.8s ease-out 0.5s forwards',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#FCFCFD',
            letterSpacing: '0.15em',
            animation: 'pulse 1s ease-in-out infinite',
          }}
        >
          CD<span style={{ color: '#FF8200' }}>.</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes orbitRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
      `}</style>

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Hero */}
      <Hero onScrollTo={scrollTo} />

      {/* Marquee */}
      <Marquee />

      {/* About / Why Choose Me */}
      <About onScrollTo={scrollTo} />

      {/* Stats */}
      <Stats />

      {/* Services — 3D sphere + floating pills */}
      <Services onScrollTo={scrollTo} />

      {/* Industries */}
      <Industries />

      {/* Development Process */}
      <Process />

      {/* Portfolio */}
      <Portfolio />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Lead Chatbot */}
      <Chatbot />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/919870903026"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[6.5rem] right-3 z-40 flex h-12 w-12 items-center justify-center rounded-full sm:bottom-[7.5rem] sm:right-8 sm:h-14 sm:w-14"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 6px 28px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            '0 4px 20px rgba(37, 211, 102, 0.4)';
        }}
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
