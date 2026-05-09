import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { Inter, Syne } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://chiragdeol.in'),
  alternates: {
    canonical: '/',
  },
  title: 'Chirag Deol – Crafting Digital Excellence That Converts',
  description:
    'Chirag Deol helps brands grow with high-converting websites, UI/UX design, eCommerce builds, real estate platforms, and digital product development.',
  keywords: [
    'Chirag Deol',
    'Web Development India',
    'UI UX Design Services',
    'Next.js Developer',
    'WordPress Development',
    'Ecommerce Website Development',
    'Real Estate Website Development',
    'Performance Marketing Website',
  ],
  authors: [{ name: 'Chirag Deol', url: 'https://chiragdeol.in' }],
  creator: 'Chirag Deol',
  publisher: 'Chirag Deol',
  category: 'technology',
  applicationName: 'Chirag Deol Portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chiragdeol.in',
    title: 'Chirag Deol – Crafting Digital Excellence That Converts',
    description:
      'Your trusted partner in building powerful, conversion-focused digital solutions that drive real business growth and measurable results.',
    siteName: 'Chirag Deol',
    images: [
      {
        url: 'https://img.rocket.new/chirag-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Chirag Deol - Digital Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chirag Deol – Crafting Digital Excellence That Converts',
    description: 'Your trusted partner in building powerful, conversion-focused digital solutions.',
    creator: '@chiragdeol',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Chirag Deol',
    url: 'https://chiragdeol.in',
    email: 'hello@chiragdeol.in',
    areaServed: 'Worldwide',
    serviceType: [
      'Web Development',
      'UI/UX Design',
      'WordPress Development',
      'Ecommerce Development',
      'Real Estate Website Development',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fchiragdeol2422back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.18"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
