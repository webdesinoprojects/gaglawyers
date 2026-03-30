import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
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
      hasDropdown: true,
      submenu: [
        { name: 'The Firm', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Awards', path: '/awards' },
        { name: 'Affiliation', path: '/affiliation' },
        { name: 'Image Gallery', path: '/gallery' },
      ]
    },
    { name: 'Services', path: '/services' },
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <button
                    className={`font-sans text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      location.pathname === link.path || link.submenu.some(sub => sub.path === location.pathname)
                        ? 'text-gold'
                        : 'text-white hover:text-gold'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    {link.submenu.map((sublink, index) => (
                      <Link
                        key={sublink.path}
                        to={sublink.path}
                        className={`block px-4 py-3 font-sans text-sm transition-colors ${
                          location.pathname === sublink.path
                            ? 'bg-gold/10 text-gold font-medium'
                            : 'text-gray-700 hover:bg-grey-light hover:text-navy'
                        } ${index !== link.submenu.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
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
              )
            ))}
            <Link to="/contact">
              <Button variant="gold" size="sm">
                Get Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.name}>
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className="w-full flex items-center justify-between py-2 font-sans text-base font-medium text-white hover:text-gold transition-colors"
                  >
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {aboutDropdownOpen && (
                    <div className="pl-4 space-y-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-2 font-sans text-sm transition-colors ${
                            location.pathname === sublink.path
                              ? 'text-gold font-medium'
                              : 'text-gray-300 hover:text-gold'
                          }`}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="gold" size="sm" className="w-full mt-2">
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
