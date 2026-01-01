import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavigation from './PublicNavigation';
import Footer from './Footer';

const PublicLayout: React.FC = () => {
  return (
    <div className="font-sans text-brand-navy bg-brand-cream overflow-x-hidden selection:bg-brand-gold selection:text-white">
      <PublicNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
