import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import API_BASE_URL from '../config/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      dropdownType: 'about',
      submenu: [
        { name: 'The Firm', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Awards', path: '/awards' },
        { name: 'Affiliation', path: '/affiliation' },
        { name: 'Image Gallery', path: '/gallery' },
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      dropdownType: 'services',
      submenu: services.map(service => ({
        name: service.name || service.title,
        path: `/services/${service.slug}`
      }))
    },
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
          <Link to="/" className="flex items-center gap-3">
            {/* Logo Image */}
            <img 
              src="/logo.png" 
              alt="GAG Lawyers" 
              className="h-12 w-auto"
            />
            {/* Text Logo - Always show alongside image */}
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-white">
                GAG
              </span>
              <span className="font-serif text-2xl lg:text-3xl font-light text-gold">
                Lawyers
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => (link.dropdownType === 'about' ? setAboutDropdownOpen(true) : setServicesDropdownOpen(true))}
                  onMouseLeave={() => (link.dropdownType === 'about' ? setAboutDropdownOpen(false) : setServicesDropdownOpen(false))}
                >
                  <div className="flex items-center gap-0">
                    <Link
                      to={link.path}
                      className={`font-sans text-sm font-medium transition-colors duration-200 ${
                        location.pathname === link.path || link.submenu.some((sub) => sub.path === location.pathname)
                          ? 'text-gold'
                          : 'text-white hover:text-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={
                        (link.dropdownType === 'about' && aboutDropdownOpen) ||
                        (link.dropdownType === 'services' && servicesDropdownOpen)
                      }
                      aria-haspopup="true"
                      aria-label={`${link.name} submenu`}
                      className={`p-1 rounded-md transition-colors flex-shrink-0 -mr-1 ${
                        location.pathname === link.path || link.submenu.some((sub) => sub.path === location.pathname)
                          ? 'text-gold'
                          : 'text-white hover:text-gold'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (link.dropdownType === 'about') {
                          setAboutDropdownOpen((o) => !o);
                        } else {
                          setServicesDropdownOpen((o) => !o);
                        }
                      }}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          (link.dropdownType === 'about' && aboutDropdownOpen) ||
                          (link.dropdownType === 'services' && servicesDropdownOpen)
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      link.dropdownType === 'services'
                        ? 'w-[90vw] max-w-[900px] left-1/2 -translate-x-1/2'
                        : 'w-56'
                    } ${
                      (link.dropdownType === 'about' && aboutDropdownOpen) ||
                      (link.dropdownType === 'services' && servicesDropdownOpen)
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                      {link.submenu.length > 0 ? (
                        <div className={link.dropdownType === 'services' ? 'grid grid-cols-4 gap-1 p-3' : ''}>
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.path}
                              to={sublink.path}
                              className={`block px-3 py-2.5 font-sans text-xs transition-colors rounded-md ${
                                location.pathname === sublink.path
                                  ? 'bg-gold/10 text-gold font-medium'
                                  : 'text-gray-700 hover:bg-gray-100 hover:text-navy'
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 font-sans">Loading services...</div>
                      )}
                    </div>
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
              <button className="px-5 py-2.5 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Get Consultation
              </button>
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
                  <div className="flex items-center justify-between gap-2 py-2">
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-1 font-sans text-base font-medium transition-colors ${
                        location.pathname === link.path ? 'text-gold' : 'text-white hover:text-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={
                        (link.dropdownType === 'about' && aboutDropdownOpen) ||
                        (link.dropdownType === 'services' && servicesDropdownOpen)
                      }
                      aria-label={`Toggle ${link.name} submenu`}
                      className="p-2 text-white hover:text-gold transition-colors flex-shrink-0"
                      onClick={() =>
                        link.dropdownType === 'about'
                          ? setAboutDropdownOpen(!aboutDropdownOpen)
                          : setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          (link.dropdownType === 'about' && aboutDropdownOpen) ||
                          (link.dropdownType === 'services' && servicesDropdownOpen)
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                  {((link.dropdownType === 'about' && aboutDropdownOpen) || (link.dropdownType === 'services' && servicesDropdownOpen)) && (
                    <div className={`pl-4 space-y-1 ${link.dropdownType === 'services' ? 'max-h-64 overflow-y-auto' : ''}`}>
                      {link.submenu.length > 0 ? (
                        link.submenu.map((sublink) => (
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
                        ))
                      ) : (
                        <div className="py-2 text-sm text-gray-400 font-sans">
                          Loading services...
                        </div>
                      )}
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
