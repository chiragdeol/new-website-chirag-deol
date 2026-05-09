'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const serviceOptions = [
    'Website Development',
    'Mobile App Development',
    'WordPress Website',
    'Real Estate Website',
    'Ecommerce Development',
    'UI/UX Design',
    'SEO & Marketing',
    'Maintenance & Support',
  ];

  const budgetOptions = ['Under ₹50K', '₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L+', 'Not Sure'];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    const payload = { ...formData, services: selectedServices };
    try {
      const res = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('Submit failed');
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: '', company: '', email: '', phone: '', budget: '', message: '' });
      setSelectedServices([]);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-20 overflow-hidden"
      style={{ background: '#fafaf9' }}
    >
      {/* Blur orb */}
      <div
        className="absolute"
        style={{
          top: '20%',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 130, 0, 0.06)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="reveal">
            <div className="section-label">Connect with us!</div>
            <h2
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.0 }}
            >
              Turn Your Vision
              <br />
              <span style={{ color: '#8a8f8d' }}>Into Reality.</span>
            </h2>

            {/* Email */}
            <a
              href="mailto:hello@chiragdeol.in"
              className="flex items-center gap-3 group mb-8"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  border: '1px solid rgba(138,143,141,0.3)',
                  transition: 'all 0.3s ease-out',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8a8f8d"
                  strokeWidth="1.5"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '1.1rem',
                  color: '#334049',
                  letterSpacing: '0.02em',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(138,143,141,0.4)',
                  transition: 'color 0.3s ease-out',
                }}
              >
                hello@chiragdeol.in
              </span>
            </a>

            {/* Why Choose Us */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Free consultation to discuss your project',
                'Detailed project proposal within 24 hours',
                'Transparent pricing with no hidden costs',
                'Dedicated project manager assigned',
                'Post-launch support & maintenance included',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255,130,0,0.1)',
                      border: '1px solid rgba(255,130,0,0.2)',
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8200"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.9rem',
                      color: '#334049',
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: '24h', label: 'Response Time' },
                { value: '70+', label: 'Projects Done' },
                { value: '98%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display), sans-serif',
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: '#111822',
                      lineHeight: 1,
                      marginBottom: '0.3rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '0.75rem',
                      color: '#8a8f8d',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/chirag-deol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  border: '1px solid rgba(138,143,141,0.3)',
                  transition: 'all 0.3s ease-out',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#111822';
                  (e.currentTarget as HTMLAnchorElement).style.background = '#111822';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(138,143,141,0.3)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#8a8f8d">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  border: '1px solid rgba(138,143,141,0.3)',
                  transition: 'all 0.3s ease-out',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#25D366';
                  (e.currentTarget as HTMLAnchorElement).style.background = '#25D366';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    'rgba(138,143,141,0.3)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#8a8f8d">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '2rem',
                fontWeight: 500,
                color: '#111822',
                marginBottom: '2rem',
              }}
            >
              Let&apos;s talk
            </h3>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-16 gap-4"
                style={{
                  border: '1px solid rgba(255,130,0,0.3)',
                  borderRadius: '1.5rem',
                  background: 'rgba(255,130,0,0.03)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,130,0,0.1)',
                    border: '1px solid rgba(255,130,0,0.2)',
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF8200"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display), sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: '#111822',
                  }}
                >
                  Message Sent!
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.9rem',
                    color: '#8a8f8d',
                    textAlign: 'center',
                  }}
                >
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mdx-input-label">Fullname *</label>
                    <input
                      type="text"
                      className="mdx-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="mdx-input-label">Company</label>
                    <input
                      type="text"
                      className="mdx-input"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="mdx-input-label">Email *</label>
                    <input
                      type="email"
                      className="mdx-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="mdx-input-label">Phone</label>
                    <input
                      type="tel"
                      className="mdx-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="mdx-input-label" style={{ marginBottom: '0.75rem' }}>
                    I&apos;m Interested in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className="interest-chip"
                        style={{
                          background: selectedServices.includes(service)
                            ? '#111822'
                            : 'transparent',
                          borderColor: selectedServices.includes(service)
                            ? '#111822'
                            : 'rgba(138,143,141,0.4)',
                          color: selectedServices.includes(service) ? '#ffffff' : '#8a8f8d',
                        }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="mdx-input-label" style={{ marginBottom: '0.75rem' }}>
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className="interest-chip"
                        style={{
                          background: formData.budget === b ? 'rgba(255,130,0,0.1)' : 'transparent',
                          borderColor:
                            formData.budget === b ? 'rgba(255,130,0,0.5)' : 'rgba(138,143,141,0.4)',
                          color: formData.budget === b ? '#FF8200' : '#8a8f8d',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mdx-input-label">Message *</label>
                  <textarea
                    className="mdx-input"
                    placeholder="Tell me about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-cta"
                  disabled={isSubmitting}
                  style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                >
                  <div className="btn-bg" />
                  <span className="btn-text">{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  <span className="btn-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </button>
                {submitError && (
                  <p style={{ color: '#b91c1c', fontSize: '0.85rem' }}>{submitError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
