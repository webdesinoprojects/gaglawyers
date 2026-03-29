import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      submenu: [
        { name: 'About Us', path: '/about' },
        { name: 'The Firm', path: '/firm' },
        { name: 'Our Team', path: '/team' },
        { name: 'Awards', path: '/awards' },
      ]
    },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-navy/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-white">
              GAG
            </span>
            <span className="font-serif text-2xl lg:text-3xl font-light text-gold">
              Lawyers
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="gold" size="sm">
                Get Consultation
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 font-sans text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="gold" size="sm" className="w-full">
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
