import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config/api';
import { OFFICE_ADDRESS_LINES, OFFICE_ADDRESS_MAPS_URL } from '../constants/officeAddress';

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
const FOOTER_LOCATION_LIMIT = 200;
const FOOTER_FETCH_LIMIT = 1000;
/** Bump when API slug shape changes (e.g. `*-lawyer-in-*`) so clients refetch. */
const FOOTER_LOCATIONS_CACHE_KEY = 'gag-footer-locations-v4';
let footerLocationsCache = null;

const isStaleFooterSlug = (slug) =>
  typeof slug === 'string' && slug.length > 0 && !slug.includes('-lawyer-in-');

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

  useEffect(() => {
    let cancelled = false;
    const loadServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && !cancelled) {
          setPracticeServices(data.data.slice(0, 10));
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
        return;
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
            return;
          }
          sessionStorage.removeItem(FOOTER_LOCATIONS_CACHE_KEY);
          footerLocationsCache = null;
        }
      } catch (error) {
        sessionStorage.removeItem(FOOTER_LOCATIONS_CACHE_KEY);
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/locations/footer-links?limit=${FOOTER_FETCH_LIMIT}`);
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

          const nextLocations = sortFooterLocations(
            Array.from(dedupedLocationsBySlug.values())
          ).slice(0, FOOTER_LOCATION_LIMIT);
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
                <img 
                  src="/logo.png" 
                  alt="GAG Lawyers" 
                  className="h-14 w-auto"
                />
                {/* Text Logo */}
                <div className="flex flex-col gap-0.5 items-center">
                  <span className="text-[22px] font-bold text-white leading-none tracking-tight" style={{ fontFamily: '"Baskerville", "Times New Roman", Georgia, serif' }}>
                    Grover & Grover
                  </span>
                  <span className="font-sans text-[11px] text-gold tracking-wide font-normal leading-none">
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
              <h4 className="font-serif text-lg font-semibold mb-6 text-white">Quick Links</h4>
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
                  <Link to="/blog" className="text-gray-300 hover:text-gold transition-all duration-200 hover:translate-x-1 inline-block">
                    Blog
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
              </ul>
            </div>

            {/* Practice areas */}
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-white">Practice Areas</h4>
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
                      to={`/services/${s.slug}`}
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
              <h4 className="font-serif text-lg font-semibold mb-6 text-white">Contact Info</h4>
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
                  <a
                    href="https://www.facebook.com/gaglawyers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-all duration-300 hover:scale-105"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gaglawyers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-105"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/gaglawyers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1DA1F2] transition-all duration-300 hover:scale-105"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
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
                  200 live location pages, arranged to stay useful and pleasantly scrollable.
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
