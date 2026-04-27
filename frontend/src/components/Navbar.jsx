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
  const [resourceDropdownOpen, setResourceDropdownOpen] = useState(false);
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
        const sorted = [...(data.data || [])].sort((a, b) =>
          String(a?.name || a?.title || '').localeCompare(
            String(b?.name || b?.title || ''),
            undefined,
            { sensitivity: 'base' }
          )
        );
        setServices(sorted);
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
        path: `/${service.slug}`
      }))
    },
    {
      name: 'Resource Center',
      path: '/blog',
      hasDropdown: true,
      dropdownType: 'resource',
      submenu: [
        { name: 'Articles', path: '/blog' },
        { name: 'Newsletter', path: '/newsletter' },
      ],
    },
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
            <span className="brand-logo-shell">
              <img 
                src="/logo.png" 
                alt="GAG Lawyers" 
                className="h-10 w-auto"
              />
            </span>
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
                  onMouseEnter={() => {
                    if (link.dropdownType === 'about') setAboutDropdownOpen(true);
                    else if (link.dropdownType === 'services') setServicesDropdownOpen(true);
                    else if (link.dropdownType === 'resource') setResourceDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (link.dropdownType === 'about') setAboutDropdownOpen(false);
                    else if (link.dropdownType === 'services') setServicesDropdownOpen(false);
                    else if (link.dropdownType === 'resource') setResourceDropdownOpen(false);
                  }}
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
                        (link.dropdownType === 'services' && servicesDropdownOpen) ||
                        (link.dropdownType === 'resource' && resourceDropdownOpen)
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
                        } else if (link.dropdownType === 'services') {
                          setServicesDropdownOpen((o) => !o);
                        } else if (link.dropdownType === 'resource') {
                          setResourceDropdownOpen((o) => !o);
                        }
                      }}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          (link.dropdownType === 'about' && aboutDropdownOpen) ||
                          (link.dropdownType === 'services' && servicesDropdownOpen) ||
                          (link.dropdownType === 'resource' && resourceDropdownOpen)
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
                      (link.dropdownType === 'services' && servicesDropdownOpen) ||
                      (link.dropdownType === 'resource' && resourceDropdownOpen)
                        ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div
                      className={`bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden ${
                        link.dropdownType === 'services' ? 'max-h-[72vh]' : ''
                      }`}
                    >
                      {link.submenu.length > 0 ? (
                        <div>
                          <div
                            className={
                              link.dropdownType === 'services'
                                ? 'max-h-[56vh] overflow-y-auto services-sidebar-scroll p-3'
                                : ''
                            }
                          >
                            {link.dropdownType === 'services' ? (
                              <div className="grid grid-cols-1 lg:grid-cols-3">
                                {[
                                  link.submenu.slice(0, 19),
                                  link.submenu.slice(19, 38),
                                  link.submenu.slice(38, 56),
                                ].map((columnLinks, columnIndex) => (
                                  <div
                                    key={`services-col-${columnIndex}`}
                                    className="px-2"
                                    style={
                                      columnIndex < 2
                                        ? { borderRight: '1px solid #e5e7eb' }
                                        : undefined
                                    }
                                  >
                                    {columnLinks.map((sublink) => (
                                      <Link
                                        key={sublink.path}
                                        to={sublink.path}
                                        className={`block px-3 py-2.5 font-sans text-sm transition-colors rounded-md ${
                                          location.pathname === sublink.path
                                            ? 'bg-gold/10 text-gold font-medium'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-navy'
                                        }`}
                                      >
                                        {sublink.name}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>
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
                            )}
                          </div>
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
                        (link.dropdownType === 'services' && servicesDropdownOpen) ||
                        (link.dropdownType === 'resource' && resourceDropdownOpen)
                      }
                      aria-label={`Toggle ${link.name} submenu`}
                      className="p-2 text-white hover:text-gold transition-colors flex-shrink-0"
                      onClick={() =>
                        link.dropdownType === 'about'
                          ? setAboutDropdownOpen(!aboutDropdownOpen)
                          : link.dropdownType === 'services'
                            ? setServicesDropdownOpen(!servicesDropdownOpen)
                            : setResourceDropdownOpen(!resourceDropdownOpen)
                      }
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          (link.dropdownType === 'about' && aboutDropdownOpen) ||
                          (link.dropdownType === 'services' && servicesDropdownOpen) ||
                          (link.dropdownType === 'resource' && resourceDropdownOpen)
                            ? 'rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                  {((link.dropdownType === 'about' && aboutDropdownOpen) ||
                    (link.dropdownType === 'services' && servicesDropdownOpen) ||
                    (link.dropdownType === 'resource' && resourceDropdownOpen)) && (
                    <div className={`pl-4 space-y-1 ${link.dropdownType === 'services' ? 'max-h-64 overflow-y-auto services-sidebar-scroll' : ''}`}>
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

