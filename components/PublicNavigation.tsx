import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const PublicNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/approach', label: 'Approach' },
    { path: '/blog', label: 'Blog' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-brand-navy hover:text-brand-gold transition-colors">
            2EQUILIBRIUM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-brand-gold border-b-2 border-brand-gold pb-1'
                    : 'text-brand-navy hover:text-brand-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={scrollToDownload}
              className="bg-brand-navy text-white px-6 py-2 text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-gold transition-all duration-300"
            >
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-brand-navy hover:text-brand-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-navy/20 backdrop-blur-sm"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-brand-cream shadow-2xl">
            <div className="flex flex-col h-full pt-24 px-6">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`py-4 border-b border-brand-navy/10 text-sm uppercase tracking-[0.2em] font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-brand-gold'
                      : 'text-brand-navy hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Download App Button */}
              <button
                onClick={() => {
                  closeMobileMenu();
                  scrollToDownload();
                }}
                className="mt-8 bg-brand-navy text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-gold transition-all duration-300"
              >
                Download App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicNavigation;
