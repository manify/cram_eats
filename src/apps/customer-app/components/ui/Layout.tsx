import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-32">{children}</main> {/* Add padding to avoid overlap */}
    </div>
  );
};

export default Layout;
