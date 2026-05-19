'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/lib/portfolio-projects';

const categories = ['ALL', 'WEBSITE', 'E-COMMERCE', 'TRAVEL', 'REAL ESTATE'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const filteredProjects =
    activeCategory === 'ALL'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111822] font-sans">
      <section className="max-w-7xl mx-auto px-6 py-24 sm:px-8 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="section-label mb-4 text-[#FF8200] font-semibold tracking-[0.22em] uppercase text-sm">
            Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight tracking-tight">
            A curated portfolio of websites, e-commerce, travel and real estate projects.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-[#5d697a]">
            Explore a selected collection of recent work built for brands that need strong visual presence, clear conversion paths, and memorable digital experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'border-[#111822] bg-[#111822] text-white'
                  : 'border-[#d1d5db] bg-white text-[#111822] hover:border-[#111822]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-[1.5rem] border border-[#e5e7eb] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-56 overflow-hidden bg-[#111822]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#111822] shadow-sm">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  {project.category}
                </div>
                <h2 className="text-2xl font-semibold text-[#111822] mb-3">
                  {project.title}
                </h2>
                <p className="mb-6 text-sm leading-6 text-[#4b5563]">{project.description}</p>
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#111822] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#333333]"
                  >
                    Visit site
                    <span aria-hidden="true">→</span>
                  </Link>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#9ca3af]">Live project</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
