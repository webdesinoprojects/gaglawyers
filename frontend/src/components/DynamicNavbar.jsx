import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import TopBar from './TopBar';
import API_BASE_URL from '../config/api';

const HOME_ANCHOR_LINKS = [
  { label: 'Practice areas', hash: 'practice-areas' },
  { label: 'About the firm', hash: 'about' },
  { label: 'Our team', hash: 'team' },
  { label: 'Testimonials', hash: 'testimonials' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Articles', hash: 'articles' },
  { label: 'Awards', hash: 'awards' },
  { label: 'Consultation', hash: 'consultation' },
];

const DynamicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [homePageNavOpen, setHomePageNavOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [services, setServices] = useState([]);
  const [globalSettings, setGlobalSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchNavigation();
    fetchServices();
    fetchGlobalSettings();
  }, []);

  const fetchNavigation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/navigation/header`);
      const data = await response.json();
      if (data.success && data.data.items) {
        // Filter to only show visible items
        const visibleItems = data.data.items.filter(item => item.isVisible !== false);
        setMenuItems(visibleItems);
      }
    } catch (error) {
      console.error('Error fetching navigation:', error);
      // Fallback to default menu
      setMenuItems([
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Blog', url: '/blog' },
        { label: 'Contact', url: '/contact' },
      ]);
    }
  };

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

  const fetchGlobalSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cms/global-settings`);
      const data = await response.json();
      if (data.success) {
        setGlobalSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching global settings:', error);
    }
  };

  // Build nav links with dropdowns
  const navLinks = menuItems.map(item => {
    if (item.label === 'About') {
      return {
        ...item,
        hasDropdown: true,
        dropdownType: 'about',
        submenu: [
          { name: 'The Firm', path: '/about' },
          { name: 'Our Team', path: '/team' },
          { name: 'Awards', path: '/awards' },
          { name: 'Affiliation', path: '/affiliation' },
          { name: 'Image Gallery', path: '/gallery' },
        ]
      };
    } else if (item.label === 'Services') {
      return {
        ...item,
        hasDropdown: true,
        dropdownType: 'services',
        submenu: services.map(service => ({
          name: service.name || service.title,
          path: `/services/${service.slug}`
        }))
      };
    }
    return item;
  });

  return (
    <header
      id="site-header"
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <TopBar />
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md'
            : 'bg-navy/80 backdrop-blur-sm'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center gap-4 py-3">
            {/* Logo Image - Enlarged */}
            <img 
              src="/logo.png" 
              alt="GAG Lawyers" 
              className="h-14 w-auto lg:h-16"
            />
            {/* Text Logo */}
            <div className="flex flex-col justify-center gap-0.5 items-center">
              <span className="text-[22px] lg:text-[26px] font-bold text-white leading-none tracking-tight" style={{ fontFamily: '"Baskerville", "Times New Roman", Georgia, serif' }}>
                Grover & Grover
              </span>
              <span className="font-sans text-[11px] lg:text-[12px] text-gray-400 tracking-wide font-normal leading-none">
                Advocates and Solicitors
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => (link.dropdownType === 'about' ? setAboutDropdownOpen(true) : setServicesDropdownOpen(true))}
                  onMouseLeave={() => (link.dropdownType === 'about' ? setAboutDropdownOpen(false) : setServicesDropdownOpen(false))}
                >
                  <div className="flex items-center gap-0">
                    <Link
                      to={link.url}
                      className={`font-sans text-sm font-medium transition-colors duration-200 ${
                        location.pathname === link.url || (link.submenu && link.submenu.some((sub) => sub.path === location.pathname))
                          ? 'text-gold'
                          : 'text-white hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={
                        (link.dropdownType === 'about' && aboutDropdownOpen) ||
                        (link.dropdownType === 'services' && servicesDropdownOpen)
                      }
                      aria-haspopup="true"
                      aria-label={`${link.label} submenu`}
                      className={`p-1 rounded-md transition-colors flex-shrink-0 -mr-1 ${
                        location.pathname === link.url || (link.submenu && link.submenu.some((sub) => sub.path === location.pathname))
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

                  {/* pt-2 bridges the gap so moving into the panel does not fire mouseLeave */}
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
                      {link.submenu && link.submenu.length > 0 ? (
                        <div className={link.dropdownType === 'services' ? 'grid grid-cols-4 gap-1 p-3' : ''}>
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.path}
                              to={sublink.path}
                              className={`group relative block px-3 py-2.5 font-sans text-xs transition-all duration-200 rounded-md ${
                                location.pathname === sublink.path
                                  ? 'bg-gold/15 text-gold font-semibold shadow-sm'
                                  : 'text-gray-700 hover:text-white hover:bg-navy hover:shadow-md font-medium'
                              }`}
                            >
                              {/* Content */}
                              <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200">
                                {sublink.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 font-sans">Loading...</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.url}
                  to={link.url}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  className={`font-sans text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.url
                      ? 'text-gold'
                      : 'text-white hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            {location.pathname === '/' && (
              <div
                className="relative"
                onMouseEnter={() => setHomePageNavOpen(true)}
                onMouseLeave={() => setHomePageNavOpen(false)}
              >
                <button
                  type="button"
                  className={`font-sans text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                    homePageNavOpen ? 'text-gold' : 'text-white hover:text-gold'
                  }`}
                >
                  On this page
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${homePageNavOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 transition-all duration-200 ${
                    homePageNavOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  {HOME_ANCHOR_LINKS.map((item) => (
                    <a
                      key={item.hash}
                      href={`/#${item.hash}`}
                      className="block px-3 py-2.5 font-sans text-xs text-gray-700 hover:bg-gray-100 hover:text-navy rounded-md mx-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {location.pathname === '/' ? (
              <a
                href="/#consultation"
                className="px-5 py-2.5 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 inline-block text-center"
              >
                Book consultation
              </a>
            ) : (
              <Link to="/contact">
                <button
                  type="button"
                  className="px-5 py-2.5 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105"
                >
                  Get Consultation
                </button>
              </Link>
            )}
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
            {location.pathname === '/' && (
              <div className="border-b border-white/10 pb-2 mb-2">
                <p className="py-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold/90">
                  On this page
                </p>
                <div className="space-y-0.5">
                  {HOME_ANCHOR_LINKS.map((item) => (
                    <a
                      key={item.hash}
                      href={`/#${item.hash}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5 font-sans text-sm text-gray-300 hover:text-gold"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.label}>
                  <div className="flex items-center justify-between gap-2 py-2">
                    <Link
                      to={link.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex-1 font-sans text-base font-medium transition-colors ${
                        location.pathname === link.url
                          ? 'text-gold'
                          : 'text-white hover:text-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={
                        (link.dropdownType === 'about' && aboutDropdownOpen) ||
                        (link.dropdownType === 'services' && servicesDropdownOpen)
                      }
                      aria-label={`Toggle ${link.label} submenu`}
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
                      {link.submenu && link.submenu.length > 0 ? (
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
                          Loading...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.url}
                  to={link.url}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-sans text-base font-medium transition-colors ${
                    location.pathname === link.url
                      ? 'text-gold'
                      : 'text-white hover:text-gold'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            {location.pathname === '/' ? (
              <a href="/#consultation" onClick={() => setIsMobileMenuOpen(false)} className="block mt-2">
                <Button variant="gold" size="sm" className="w-full">
                  Book consultation
                </Button>
              </a>
            ) : (
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="gold" size="sm" className="w-full mt-2">
                  Get Consultation
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
    </header>
  );
};

export default DynamicNavbar;
