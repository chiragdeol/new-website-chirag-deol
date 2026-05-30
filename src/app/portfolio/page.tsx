import React from 'react';
import Navbar from '@/components/Navbar';
import PortfolioPage from '@/components/PortfolioPage';

export default function PortfolioRoute() {
  return (
    <>
      <Navbar activeSection="portfolio" isDark={true} />
      <PortfolioPage />
    </>
  );
}
