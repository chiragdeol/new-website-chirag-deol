'use client';
import React, { useEffect, useRef, useState } from 'react';
import { portfolioProjects } from '@/lib/portfolio-projects';

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
      { threshold: 0.05 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  const filters = ['ALL', 'WEBSITE', 'E-COMMERCE', 'TRAVEL', 'REAL ESTATE'];

  const filteredProjects =
    activeFilter === 'ALL'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-20 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="section-label">Featured Projects</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Work That
              <br />
              <span style={{ color: '#8a8f8d' }}>Speaks Volumes.</span>
            </h2>
          </div>
          <p className="body-text" style={{ fontSize: '1rem', maxWidth: '360px', lineHeight: 1.8 }}>
            Real projects, real results. Each site built to convert visitors into loyal customers.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-14 reveal">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
            >
              <span className="tag-fill" />
              <span className="tag-text">{filter}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal project-card group"
              style={{ transitionDelay: `${i * 80}ms`, minHeight: '360px', display: 'block' }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-[0.7rem] uppercase tracking-[0.18em]">
                    {project.category}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{project.title}</h3>
                </div>
              </div>
              <div className="p-6 bg-white">
                <p className="mb-5 text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Live project</span>
                  <span className="text-sm font-semibold text-slate-900">View site →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
