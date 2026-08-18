import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { OFFICE_ADDRESS_LINES, OFFICE_ADDRESS_MAPS_URL } from '../constants/officeAddress';
import { getSocial, FOOTER_DEFAULT_LINKS } from '../constants/socialLinks';
import { getGlobalSettings } from '../utils/globalSettings';

const FOOTER_LOCATION_PRIORITY = [
  'Delhi',
  'New Delhi',
  'Gurgaon',
  'Gurugram',
  'Noida',
  'Greater Noida',
  'Ghaziabad',
  'Faridabad',
  'Mumbai',
  'Pune',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Chandigarh',
  'Jaipur',
  'Lucknow',
  'Ahmedabad',
  'Indore',
];

const CITY_ALIASES = {
  delhi: ['delhi', 'new delhi'],
  'new delhi': ['new delhi', 'delhi'],
  gurgaon: ['gurgaon', 'gurugram'],
  gurugram: ['gurugram', 'gurgaon'],
  noida: ['noida'],
  'greater noida': ['greater noida'],
  ghaziabad: ['ghaziabad'],
  faridabad: ['faridabad'],
  mumbai: ['mumbai'],
  pune: ['pune'],
  bangalore: ['bangalore', 'bengaluru'],
  bengaluru: ['bengaluru', 'bangalore'],
  hyderabad: ['hyderabad'],
  chennai: ['chennai'],
  kolkata: ['kolkata'],
  chandigarh: ['chandigarh'],
  jaipur: ['jaipur'],
  lucknow: ['lucknow'],
  ahmedabad: ['ahmedabad'],
  indore: ['indore'],
};

const normalizeCity = (value = '') => value.toString().trim().toLowerCase();
/** Bump when API slug shape changes (e.g. `*-in-*`) so clients refetch. */
const FOOTER_LOCATIONS_CACHE_KEY = 'gag-footer-locations-v8';
let footerLocationsCache = null;

const isStaleFooterSlug = (slug) =>
  typeof slug === 'string' && slug.length > 0 && !slug.includes('-in-');

const getCityPriority = (cityName) => {
  const normalized = normalizeCity(cityName);

  for (let index = 0; index < FOOTER_LOCATION_PRIORITY.length; index += 1) {
    const priorityCity = FOOTER_LOCATION_PRIORITY[index];
    const aliases = CITY_ALIASES[normalizeCity(priorityCity)] || [normalizeCity(priorityCity)];

    if (aliases.includes(normalized)) {
      return index;
    }
  }

  return Number.MAX_SAFE_INTEGER;
};

const sortFooterLocations = (items) => {
  return [...items].sort((left, right) => {
    const priorityDiff = getCityPriority(left.city) - getCityPriority(right.city);
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    const cityDiff = left.city.localeCompare(right.city);
    if (cityDiff !== 0) {
      return cityDiff;
    }

    return left.serviceName.localeCompare(right.serviceName);
  });
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [locations, setLocations] = useState([]);
  const [practiceServices, setPracticeServices] = useState([]);
  // Social links: fall back to today's exact hardcoded set until a managed list exists.
  const [footerSocials, setFooterSocials] = useState(FOOTER_DEFAULT_LINKS);

  useEffect(() => {
    let cancelled = false;
    getGlobalSettings().then((gs) => {
      if (cancelled) return;
      const arr = gs && Array.isArray(gs.socialLinks) ? gs.socialLinks : null;
      if (arr && arr.length) {
        const f = arr
          .filter((l) => l && l.showInFooter && l.url)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setFooterSocials(f);
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && !cancelled) {
          const sorted = [...data.data].sort((a, b) => {
            const orderA = Number.isFinite(a?.order) ? a.order : Number.MAX_SAFE_INTEGER;
            const orderB = Number.isFinite(b?.order) ? b.order : Number.MAX_SAFE_INTEGER;
            if (orderA !== orderB) return orderA - orderB;
            return String(a?.name || a?.title || '').localeCompare(String(b?.name || b?.title || ''));
          });
          setPracticeServices(sorted.slice(0, 10));
        }
      } catch {
        /* optional */
      }
    };
    loadServices();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLocations = async () => {
      if (
        footerLocationsCache &&
        footerLocationsCache.length > 0 &&
        !footerLocationsCache.some((row) => isStaleFooterSlug(row?.slug))
      ) {
        if (isMounted) {
          setLocations(footerLocationsCache);
        }
      }
      if (footerLocationsCache?.some((row) => isStaleFooterSlug(row?.slug))) {
        footerLocationsCache = null;
      }

      try {
        const cachedLocations = sessionStorage.getItem(FOOTER_LOCATIONS_CACHE_KEY);
        if (cachedLocations) {
          const parsedLocations = JSON.parse(cachedLocations);
          const stale =
            !Array.isArray(parsedLocations) ||
            parsedLocations.length === 0 ||
            parsedLocations.some((row) => isStaleFooterSlug(row?.slug));
          if (!stale) {
            footerLocationsCache = parsedLocations;
            if (isMounted) {
              setLocations(parsedLocations);
            }
          } else {
            sessionStorage.removeItem(FOOTER_LOCATIONS_CACHE_KEY);
            footerLocationsCache = null;
          }
        }
      } catch (error) {
        sessionStorage.removeItem(FOOTER_LOCATIONS_CACHE_KEY);
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/locations/footer-links`, {
          cache: 'no-store',
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          const dedupedLocationsBySlug = new Map();
          const seenSlugs = new Set();

          data.data.forEach((item) => {
            const normalizedCity = normalizeCity(item?.city);
            const city = item?.city?.trim();
            const serviceName = item?.serviceName?.trim();
            const slug = item?.slug?.trim();

            if (!normalizedCity || !city || !serviceName || !slug || seenSlugs.has(slug)) {
              return;
            }

            seenSlugs.add(slug);
            dedupedLocationsBySlug.set(slug, {
              city,
              serviceName,
              slug,
            });
          });

          const nextLocations = Array.from(dedupedLocationsBySlug.values());
          footerLocationsCache = nextLocations;
          sessionStorage.setItem(FOOTER_LOCATIONS_CACHE_KEY, JSON.stringify(nextLocations));
          if (isMounted) {
            setLocations(nextLocations);
          }
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* CTA Section Above Footer */}
      <section className="bg-gradient-to-r from-navy via-[#0a1628] to-navy py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
            Need legal assistance? Speak with our experts today.
          </h2>
          <p className="font-sans text-base lg:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional legal counsel tailored to your specific needs.
          </p>
          <a href="/#consultation">
            <span className="px-8 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 inline-flex items-center gap-2 cursor-pointer">
              Schedule Consultation
              <ArrowRight size={18} />
            </span>
          </a>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-navy text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-6 sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-4">
                {/* Logo Image - Enlarged */}
                <span className="brand-logo-shell">
                  <img width="500" height="500" 
                    src="/logo.png" 
                    alt="GAG Lawyers" 
                    className="h-12 w-auto"
                  />
                </span>
                {/* Text Logo */}
                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-[22px] font-bold text-white leading-none tracking-tight" style={{ fontFamily: '"Baskerville", "Times New Roman", Georgia, serif' }}>
                    Grover & Grover
                  </span>
                  <span className="w-full text-center font-sans text-[9px] text-gold tracking-[0.14em] font-normal leading-none">
                    Advocates and Solicitors
                  </span>
                </div>
              </Link>
              <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-[300px]">
                Delivering excellence in legal services with integrity and precision.
              </p>
              
              {/* Trust Indicators */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                  <p className="font-sans text-sm text-gray-400">25+ Years Experience</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                  <p className="font-sans text-sm text-gray-400">5000+ Cases Handled</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold">Quick Links</h4>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Practice Areas
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="/#consultation"
                    className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Book consultation
                  </a>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            {/* Practice areas */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold">Practice Areas</h4>
              <ul className="space-y-2.5 font-sans text-sm">
                <li>
                  <Link
                    to="/services"
                    className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block font-medium"
                  >
                    View all services
                  </Link>
                </li>
                {practiceServices.map((s) => (
                  <li key={s._id}>
                    <Link
                      to={`/${s.slug}`}
                      className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block line-clamp-2"
                    >
                      {s.name || s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-gold">Contact Info</h4>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <a href="tel:+919996263370" className="text-white text-base font-semibold hover:text-gold transition-colors">
                      +91 99962 63370
                    </a>
                    <p className="text-gray-400 text-xs mt-0.5">Mon-Fri, 9am-6pm</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <a href="mailto:contact@gaglawyers.com" className="text-gray-300 hover:text-gold transition-colors hover:underline">
                    contact@gaglawyers.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <span className="text-gray-300 block">
                      {OFFICE_ADDRESS_LINES.map((line, i) => (
                        <React.Fragment key={line}>
                          {i > 0 && <br />}
                          {line}
                        </React.Fragment>
                      ))}
                    </span>
                    <a
                      href={OFFICE_ADDRESS_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold/90 text-xs font-sans hover:underline mt-1 inline-block"
                    >
                      Open in Maps
                    </a>
                  </div>
                </li>
              </ul>
              
              {/* Social Icons */}
              <div className="mt-6">
                <p className="font-sans text-sm text-gray-400 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {footerSocials.map((s) => {
                    const ic = getSocial(s.platform);
                    return (
                      <a
                        key={`${s.platform}-${s.url}`}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/10 ${ic.footerHover} transition-all duration-300 hover:scale-105`}
                        aria-label={ic.label}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={ic.path} />
                        </svg>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Locations Section */}
          {locations.length > 0 && (
            <div className="border-t border-white/10 mt-12 pt-12">
              <div className="text-center mb-6">
                <h4 className="font-serif text-xl font-semibold text-white">
                  Browse Our Service Locations
                </h4>
                <p className="font-sans text-sm text-gray-400 mt-2">
                  Explore our legal services across cities and regions.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 md:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                <div className="max-h-[26rem] overflow-y-auto pr-2 scrollbar-thin">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {locations.map(({ city, serviceName, slug }, index) => (
                      <Link
                        key={`${slug}-${index}`}
                        to={`/${slug}`}
                        className="group rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.08]"
                      >
                        <span className="block font-sans text-sm font-semibold text-white group-hover:text-gold transition-colors">
                          {serviceName}
                        </span>
                        <span className="mt-1 block font-sans text-xs uppercase tracking-[0.18em] text-gray-400">
                          {city}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="text-gray-500 text-xs font-sans">
                    Showing {locations.length} locations • Scroll to see more
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-sans text-sm text-gray-400">
                © {currentYear} GAG Lawyers. All Rights Reserved.
              </p>
              <div className="flex gap-6 font-sans text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

