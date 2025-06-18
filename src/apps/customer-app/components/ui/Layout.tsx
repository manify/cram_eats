import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [colorFilter, setColorFilter] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('none');

  // Load saved filter mode on first render
  useEffect(() => {
    const savedFilter = localStorage.getItem('colorFilter') as 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia' | null;
    if (savedFilter) {
      setColorFilter(savedFilter);
    }
  }, []);

  // Save filter mode whenever it changes
  useEffect(() => {
    localStorage.setItem('colorFilter', colorFilter);
  }, [colorFilter]);

  return (
    <div style={{ filter: colorFilter !== 'none' ? `url(#${colorFilter})` : 'none' }} className="flex flex-col min-h-screen">
      <Header colorFilter={colorFilter} setColorFilter={setColorFilter} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
