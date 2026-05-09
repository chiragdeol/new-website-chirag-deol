'use client';
import React, { useEffect, useRef, useState } from 'react';

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

  const filters = ['ALL', 'REAL ESTATE', 'E-COMMERCE', 'TRAVEL', 'WELLNESS', 'FINANCE'];

  const projects = [
    {
      id: 1,
      title: 'AX Realtors',
      category: 'REAL ESTATE',
      tags: ['Real Estate', 'WordPress', 'Property Listings'],
      desc: 'Luxury real estate platform showcasing premium properties in Dubai including Atlantis The Royal Residences, Palm Jumeirah, and Downtown Dubai.',
      highlight: 'Premium Dubai Properties',
      url: 'https://www.axrealtors.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cf4d2702-1764930716676.png',
      alt: 'Luxury real estate property in Dubai with modern architecture and pool',
    },
    {
      id: 2,
      title: 'AIT Square Properties',
      category: 'REAL ESTATE',
      tags: ['Real Estate', 'WordPress', 'Property Mgmt'],
      desc: 'Boutique real estate brokerage platform in Dubai featuring off-plan projects, property sales, leasing, and comprehensive market research services.',
      highlight: '29+ Properties Managed',
      url: 'https://aitsquare.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15da1dd8d-1773176909130.png',
      alt: 'Modern Dubai real estate office building with glass facade',
    },
    {
      id: 3,
      title: 'Nautical Coast Builders',
      category: 'REAL ESTATE',
      tags: ['Real Estate', 'WordPress', 'Construction'],
      desc: 'Premium coastal construction and real estate platform showcasing luxury waterfront properties and custom home building services.',
      highlight: 'Coastal Luxury Homes',
      url: 'https://nauticalcoastbuilders.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e24b1ccb-1772837443104.png',
      alt: 'Luxury coastal home with ocean view and modern architecture',
    },
    {
      id: 4,
      title: 'Amberwood Doors',
      category: 'E-COMMERCE',
      tags: ['E-commerce', 'WordPress', 'Manufacturing'],
      desc: 'Canadian manufacturer of custom solid wood doors with extensive product catalog, gallery showcase, and e-commerce capabilities for luxury door solutions.',
      highlight: '2.5M+ YouTube Views',
      url: 'https://amberwooddoors.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cdd9dc97-1773905879761.png',
      alt: 'Elegant custom solid wood door with intricate craftsmanship details',
    },
    {
      id: 5,
      title: 'Wecation UAE',
      category: 'TRAVEL',
      tags: ['Travel', 'E-commerce', 'Booking'],
      desc: 'Travel and vacation booking platform for UAE destinations featuring tour packages, activities, and seamless booking experience.',
      highlight: 'Tourism & Travel',
      url: 'https://wecation.ae/',
      image: 'https://images.unsplash.com/photo-1683625895327-52482daed52d',
      alt: 'Dubai skyline at sunset with iconic Burj Khalifa tower',
    },
    {
      id: 6,
      title: 'Dhvani Yogam',
      category: 'WELLNESS',
      tags: ['Wellness', 'WordPress', 'Yoga'],
      desc: 'Spiritual yoga and wellness platform offering online classes, meditation sessions, and holistic health programs with seamless booking.',
      highlight: 'Yoga & Wellness',
      url: 'https://dhvaniyogam.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_189a9c012-1772199854782.png',
      alt: 'Peaceful yoga studio with natural light and meditation space',
    },
    {
      id: 7,
      title: 'Invexa Wealth',
      category: 'FINANCE',
      tags: ['Fintech', 'WordPress', 'Investment'],
      desc: 'Sophisticated wealth management and investment advisory platform with portfolio tracking, market insights, and client portal.',
      highlight: 'Wealth Management',
      url: 'https://invexawealth.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_149d650d1-1767440893200.png',
      alt: 'Modern financial dashboard with investment charts and portfolio analytics',
    },
    {
      id: 8,
      title: 'Audleys International',
      category: 'E-COMMERCE',
      tags: ['E-commerce', 'WordPress', 'International'],
      desc: 'International business platform with premium product catalog, global shipping solutions, and enterprise-grade e-commerce capabilities.',
      highlight: 'Global Commerce',
      url: 'https://audleysinternational.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16358913f-1778318003438.png',
      alt: 'International business website with premium product showcase',
    },
    {
      id: 9,
      title: 'Vardhan Oil',
      category: 'E-COMMERCE',
      tags: ['E-commerce', 'WordPress', 'B2B'],
      desc: 'Oil and petroleum products e-commerce platform with product catalog, ordering system, and business solutions for industrial clients.',
      highlight: 'Industrial E-commerce',
      url: 'https://vardhanoil.com/',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12ef72da1-1766508932092.png',
      alt: 'Industrial oil refinery facility with storage tanks and pipelines',
    },
  ];

  const filteredProjects =
    activeFilter === 'ALL' ? projects : projects?.filter((p) => p?.category === activeFilter);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-20 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="section-label">Featured Projects</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Work That
              <br />
              <span style={{ color: '#8a8f8d' }}>Speaks Volumes.</span>
            </h2>
          </div>
          <p className="body-text" style={{ fontSize: '1rem', maxWidth: '320px', lineHeight: 1.7 }}>
            Real projects, real results. Each site built to convert visitors into loyal customers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 reveal">
          {filters?.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className="filter-tag">
              <span className="tag-fill" />
              <span className={`tag-text ${activeFilter === filter ? 'active' : ''}`}>
                {filter}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects?.map((project, i) => (
            <a
              key={project?.id}
              href={project?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal project-card group"
              style={{
                transitionDelay: `${i * 80}ms`,
                height: '320px',
                display: 'block',
                textDecoration: 'none',
              }}
              onMouseEnter={() => setHoveredProject(project?.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Image */}
              <img
                src={project?.image}
                alt={project?.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.625, 0.05, 0, 1)',
                  transform: hoveredProject === project?.id ? 'scale(1.05)' : 'scale(1)',
                }}
              />

              {/* Category badge */}
              <div
                className="absolute top-4 left-4"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '2rem',
                  padding: '0.3rem 0.8rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: '#111822',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {project?.category}
              </div>

              {/* Arrow icon */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease-out',
                  transform: hoveredProject === project?.id ? 'rotate(-45deg)' : 'rotate(0deg)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111822"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              {/* Overlay */}
              <div
                className="project-overlay"
                style={{ opacity: hoveredProject === project?.id ? 1 : 0 }}
              />

              {/* Info */}
              <div
                className="project-info"
                style={{
                  opacity: hoveredProject === project?.id ? 1 : 0,
                  transform: hoveredProject === project?.id ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.4s cubic-bezier(0.625, 0.05, 0, 1)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: '#FCFCFD',
                    marginBottom: '0.4rem',
                  }}
                >
                  {project?.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(252,252,253,0.7)',
                    lineHeight: 1.5,
                    marginBottom: '0.75rem',
                  }}
                >
                  {project?.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project?.tags?.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        color: 'rgba(252,252,253,0.6)',
                        padding: '0.2rem 0.6rem',
                        border: '1px solid rgba(252,252,253,0.2)',
                        borderRadius: '2rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="flex items-center gap-1 mt-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: '#FF8200',
                    fontWeight: 500,
                  }}
                >
                  <span>{project?.highlight}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF8200"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 flex justify-center reveal">
          <a href="#portfolio" className="btn-cta" style={{ textDecoration: 'none' }}>
            <div className="btn-bg" />
            <span className="btn-text">VIEW ALL PROJECTS</span>
            <span className="btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
