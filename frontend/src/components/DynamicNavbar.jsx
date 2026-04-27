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

const DEFAULT_MENU_ITEMS = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about' },
  { label: 'Services', url: '/services' },
  { label: 'Resource Center', url: '/blog' },
  { label: 'Careers', url: '/careers' },
  { label: 'Contact', url: '/contact' },
];

const DynamicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [resourceDropdownOpen, setResourceDropdownOpen] = useState(false);
  const [homeAnchorsOpen, setHomeAnchorsOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    setResourceDropdownOpen(false);
    setHomeAnchorsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

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
      setMenuItems(DEFAULT_MENU_ITEMS);
    }
  };

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
  const menuItemsToRender = menuItems.length > 0 ? menuItems : DEFAULT_MENU_ITEMS;
  const normalizedMenuItems = [...menuItemsToRender];
  const hasCareers = normalizedMenuItems.some((item) => item.url === '/careers' || item.label === 'Careers');
  if (!hasCareers) {
    const contactIndex = normalizedMenuItems.findIndex((item) => item.url === '/contact' || item.label === 'Contact');
    const careersItem = { label: 'Careers', url: '/careers' };
    if (contactIndex >= 0) {
      normalizedMenuItems.splice(contactIndex, 0, careersItem);
    } else {
      normalizedMenuItems.push(careersItem);
    }
  }

  const navLinks = normalizedMenuItems.map(item => {
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
          path: `/${service.slug}`
        }))
      };
    } else if (item.label === 'Blog' || item.label === 'Resource Center') {
      return {
        ...item,
        label: 'Resource Center',
        url: '/blog',
        hasDropdown: true,
        dropdownType: 'resource',
        submenu: [
          { name: 'Articles', path: '/blog' },
          { name: 'Newsletter', path: '/newsletter' },
        ],
      };
    }
    return item;
  });

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-[70] w-full transition-shadow duration-300 ${
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
        <div className="flex min-h-[56px] items-center justify-between md:h-[72px]">
          <Link to="/" className="flex max-w-[min(100%,calc(100vw-4rem))] items-center gap-2 py-2 md:gap-4 md:py-3">
            <span className="brand-logo-shell">
              <img
                src="/logo.png"
                alt="GAG Lawyers"
                className="h-7 w-auto md:h-9 lg:h-11"
              />
            </span>
            <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 text-center">
              <span
                className="truncate text-base font-bold leading-none tracking-tight text-white md:text-[22px] lg:text-[22px]"
                style={{ fontFamily: '"Baskerville", "Times New Roman", Georgia, serif' }}
              >
                Grover & Grover
              </span>
              <span className="font-sans text-[11px] font-normal leading-none tracking-wide text-gold">
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
                        (link.dropdownType === 'services' && servicesDropdownOpen) ||
                        (link.dropdownType === 'resource' && resourceDropdownOpen)
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

                  {/* pt-2 bridges the gap so moving into the panel does not fire mouseLeave */}
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
                      {link.submenu && link.submenu.length > 0 ? (
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
                                        className={`group relative block px-3 py-2.5 font-sans text-sm transition-all duration-200 rounded-md ${
                                          location.pathname === sublink.path
                                            ? 'bg-gold/15 text-gold font-semibold shadow-sm'
                                            : 'text-gray-700 hover:text-white hover:bg-navy hover:shadow-md font-medium'
                                        }`}
                                      >
                                        <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200">
                                          {sublink.name}
                                        </span>
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
                                    className={`group relative block px-3 py-2.5 font-sans text-xs transition-all duration-200 rounded-md ${
                                      location.pathname === sublink.path
                                        ? 'bg-gold/15 text-gold font-semibold shadow-sm'
                                        : 'text-gray-700 hover:text-white hover:bg-navy hover:shadow-md font-medium'
                                    }`}
                                  >
                                    <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200">
                                      {sublink.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
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
                      className="block px-3 py-2.5 font-sans text-xs text-gray-700 hover:text-white hover:bg-navy hover:shadow-md font-medium rounded-md mx-1 transition-all duration-200"
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

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-white md:hidden hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="absolute left-0 right-0 top-full z-[60] h-[calc(100dvh-var(--site-header-height,7.25rem))] bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="absolute left-0 right-0 top-full z-[61] max-h-[calc(100dvh-var(--site-header-height,7.25rem))] overflow-y-auto border-t border-white/15 bg-navy shadow-2xl md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-0 px-4 py-4 pb-safe">
            {location.pathname === '/' && (
              <div className="border-b border-white/10 pb-2 mb-2">
                <button
                  type="button"
                  aria-expanded={homeAnchorsOpen}
                  aria-label="Toggle on this page links"
                  className="flex min-h-[44px] w-full items-center justify-between py-2 text-left"
                  onClick={() => setHomeAnchorsOpen((o) => !o)}
                >
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold/90">
                    On this page
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gold transition-transform duration-200 ${homeAnchorsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {homeAnchorsOpen && (
                  <div className="space-y-0.5">
                    {HOME_ANCHOR_LINKS.map((item) => (
                      <a
                        key={item.hash}
                        href={`/#${item.hash}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block min-h-[44px] py-3 font-sans text-sm text-gray-300 hover:text-gold"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.label}>
                  <div className="flex min-h-[44px] items-center justify-between gap-2 py-1">
                    <Link
                      to={link.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex min-h-[44px] flex-1 items-center font-sans text-base font-medium transition-colors ${
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
                        (link.dropdownType === 'services' && servicesDropdownOpen) ||
                        (link.dropdownType === 'resource' && resourceDropdownOpen)
                      }
                      aria-label={`Toggle ${link.label} submenu`}
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-gold"
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
                      {link.submenu && link.submenu.length > 0 ? (
                        link.submenu.map((sublink) => (
                          <Link
                            key={sublink.path}
                            to={sublink.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block min-h-[44px] py-3 font-sans text-sm transition-colors ${
                              location.pathname === sublink.path
                                ? 'font-medium text-gold'
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
                  className={`flex min-h-[44px] items-center py-3 font-sans text-base font-medium transition-colors ${
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
              <a href="/#consultation" onClick={() => setIsMobileMenuOpen(false)} className="mt-3 block">
                <Button variant="gold" size="sm" className="min-h-[48px] w-full">
                  Book consultation
                </Button>
              </a>
            ) : (
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-3 block">
                <Button variant="gold" size="sm" className="min-h-[48px] w-full">
                  Get Consultation
                </Button>
              </Link>
            )}
            </div>
          </div>
        </>
      )}
    </nav>
    </header>
  );
};

export default DynamicNavbar;

