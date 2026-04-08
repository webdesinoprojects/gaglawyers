import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

// List of supported cities - can be expanded
const SUPPORTED_CITIES = [
  { name: 'Delhi', slug: 'delhi', state: 'Delhi' },
  { name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana' },
  { name: 'Gurugram', slug: 'gurugram', state: 'Haryana' },
  { name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra' },
  { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka' },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana' },
  { name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu' },
  { name: 'Pune', slug: 'pune', state: 'Maharashtra' },
  { name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan' },
  { name: 'Indore', slug: 'indore', state: 'Madhya Pradesh' },
];

const getCityName = (slug) => {
  const city = SUPPORTED_CITIES.find(c => c.slug === slug);
  return city ? city.name : slug.charAt(0).toUpperCase() + slug.slice(1);
};

const SERVICES_CACHE_KEY = 'gag-services-cache-v1';
let servicesCache = null;

const LocationPage = () => {
  const { service, city } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getServices = async () => {
      if (servicesCache) {
        return servicesCache;
      }

      try {
        const cachedServices = sessionStorage.getItem(SERVICES_CACHE_KEY);
        if (cachedServices) {
          const parsedServices = JSON.parse(cachedServices);
          if (Array.isArray(parsedServices) && parsedServices.length > 0) {
            servicesCache = parsedServices;
            return parsedServices;
          }
        }
      } catch (error) {
        sessionStorage.removeItem(SERVICES_CACHE_KEY);
      }

      const response = await fetch(`${API_BASE_URL}/api/services`, {
        signal: controller.signal,
      });
      const data = await response.json();
      const nextServices = data.success && Array.isArray(data.data) ? data.data : [];
      servicesCache = nextServices;
      sessionStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(nextServices));
      return nextServices;
    };

    const fetchService = async () => {
      try {
        if (service && city) {
          const services = await getServices();

          if (services.length > 0) {
            const foundService = services.find(s => s.slug === service);
            if (foundService) {
              if (isMounted) {
                setServiceData(foundService);
                setCityName(getCityName(city));
              }
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching service:', error);
          navigate('/');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchService();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [service, city, navigate]);

  if (loading || !serviceData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const pageTitle = `Best ${serviceData.name} Lawyer in ${cityName} | Grover & Grover Advocates`;
  const pageDescription = `Expert ${serviceData.name.toLowerCase()} services in ${cityName}. Our experienced advocates provide specialized legal counsel and representation in ${cityName}. Schedule a consultation today.`;

  return (
    <div>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={`${serviceData.name} in ${cityName}, ${serviceData.name.toLowerCase()} lawyer ${cityName}, advocates ${cityName}`}
      />

      {/* HERO SECTION */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-300">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <ChevronRight size={16} />
            <Link to="/services" className="hover:text-gold transition">Services</Link>
            <ChevronRight size={16} />
            <Link to={`/services/${service}`} className="hover:text-gold transition">{serviceData.name}</Link>
            <ChevronRight size={16} />
            <span className="text-gold">{cityName}</span>
          </div>

          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-6 text-gold">
              <MapPin size={20} />
              <span className="font-sans text-sm font-semibold uppercase tracking-wide">{cityName}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Best {serviceData.name} Lawyer in {cityName}
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Expert {serviceData.name.toLowerCase()} services in {cityName}. Our specialized advocates combine deep legal expertise with local knowledge to provide exceptional representation and counsel.
            </p>

            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* LOCALIZED INTRO */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-6">
              Why Choose Our {serviceData.name} Services in {cityName}?
            </h2>
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
              At Grover & Grover Advocates, we have extensive experience serving clients throughout {cityName} and {SUPPORTED_CITIES.find(c => c.slug === city)?.state || 'the region'}. Our {serviceData.name.toLowerCase()} specialists understand local court procedures, judicial practices, and the specific legal landscape of {cityName}.
            </p>
            <p className="font-sans text-lg text-gray-700 leading-relaxed">
              Whether you're facing {serviceData.typesOfCases?.[0]?.toLowerCase() || 'a complex legal matter'} or need ongoing counsel, our team is committed to delivering strategic, results-oriented legal solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-12">
            Our {cityName} Practice
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Local Expertise */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    Local Court Knowledge
                  </h3>
                  <p className="font-sans text-gray-700">
                    Deep familiarity with {cityName} courts, judges, and local legal procedures ensures effective representation tailored to local practice.
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Team */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    Specialized Expertise
                  </h3>
                  <p className="font-sans text-gray-700">
                    Our {serviceData.name} specialists have years of focused experience in this specific practice area with proven results.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessible */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    Conveniently Located
                  </h3>
                  <p className="font-sans text-gray-700">
                    Based in {cityName}, we're easily accessible for in-person consultations, court appearances, and ongoing support.
                  </p>
                </div>
              </div>
            </div>

            {/* Proven Results */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-3">
                    Proven Track Record
                  </h3>
                  <p className="font-sans text-gray-700">
                    98% success rate with satisfied clients across {cityName} and beyond, backed by successful case resolutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES WE HANDLE */}
      {serviceData.typesOfCases && serviceData.typesOfCases.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-12">
              {serviceData.name} Services in {cityName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceData.typesOfCases.map((caseType, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-md hover:border-gold/50"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle size={24} className="text-gold flex-shrink-0 mt-1" />
                    <h3 className="font-serif text-lg font-bold text-navy">
                      {caseType} in {cityName}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Get Expert {serviceData.name} Support in {cityName}
          </h2>
          <p className="font-sans text-lg text-gray-200 mb-8 max-w-2xl mx-auto mb-10">
            Don't handle complex legal matters alone. Our experienced team is ready to provide the strategic counsel and vigorous representation you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/contact">
              <button className="px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Schedule Consultation
              </button>
            </Link>
            <Link to={`/services/${service}`}>
              <button className="px-8 py-4 bg-transparent text-white font-sans font-semibold rounded-md border-2 border-white/30 transition-all duration-200 hover:bg-white/10">
                Learn More About This Service
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gold" />
              <a href="tel:+919996263370" className="font-sans text-white hover:text-gold transition-colors">
                +91 99962 63370
              </a>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gold" />
              <span className="font-sans">contact@gaglawyers.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-bold text-navy mb-3">
                Where is your {cityName} office located?
              </h3>
              <p className="font-sans text-gray-700">
                Our {cityName} office is centrally located for easy access. Contact us for our exact address and directions. We're committed to being conveniently accessible to our clients.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-bold text-navy mb-3">
                Do you offer emergency {serviceData.name} services in {cityName}?
              </h3>
              <p className="font-sans text-gray-700">
                Yes, we provide emergency legal assistance. Many legal matters require urgent attention. Contact us immediately for urgent matters, and we'll respond promptly to help you.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-bold text-navy mb-3">
                What is your consultation fee for {cityName} clients?
              </h3>
              <p className="font-sans text-gray-700">
                Our consultation fees are competitive and transparent. We offer flexible engagement options tailored to your needs. Contact us for a detailed quote and discuss payment options.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-serif text-lg font-bold text-navy mb-3">
                How long does {serviceData.name} typically take?
              </h3>
              <p className="font-sans text-gray-700">
                Timeline depends on case complexity and circumstances. During consultation, we'll provide a realistic timeline and keep you informed of all developments throughout your case.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
