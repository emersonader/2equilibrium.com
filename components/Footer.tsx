import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-brand-white border-t border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="font-serif text-2xl text-brand-navy mb-6 tracking-tight">2EQUILIBRIUM</p>
          <p className="text-brand-navy/50 text-sm mb-4">This is Graziella's private world.</p>

          <nav className="flex justify-center gap-8 mb-6">
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.2em] text-brand-navy/60 hover:text-brand-gold transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-xs uppercase tracking-[0.2em] text-brand-navy/60 hover:text-brand-gold transition-colors"
            >
              About
            </Link>
            <Link
              to="/approach"
              className="text-xs uppercase tracking-[0.2em] text-brand-navy/60 hover:text-brand-gold transition-colors"
            >
              Approach
            </Link>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-[0.2em] text-brand-navy/60 hover:text-brand-gold transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>

        <p className="text-brand-navy/30 text-xs text-center">
          © 2025 Graziella De Souza. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
