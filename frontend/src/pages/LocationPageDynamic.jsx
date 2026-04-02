import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const LocationPageDynamic = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationPage = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/locations/slug/${slug}`);
        const data = await response.json();

        if (data.success && data.data) {
          setPageData(data.data);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.error('Error fetching location page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchLocationPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-navy mb-4">Page Not Found</h1>
          <p className="font-sans text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/">
            <button className="px-6 py-3 bg-navy text-white font-sans font-semibold rounded-md hover:bg-navy/90">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { serviceName, city, content, seo, images } = pageData;

  return (
    <div>
      <SEOHead
        title={seo?.title || `${serviceName} in ${city} | GAG Lawyers`}
        description={seo?.description || `Expert ${serviceName.toLowerCase()} services in ${city}.`}
        keywords={seo?.keywords || `${serviceName}, ${city}, lawyers`}
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
            <span className="text-gold">{city}</span>
          </div>

          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-6 text-gold">
              <MapPin size={20} />
              <span className="font-sans text-sm font-semibold uppercase tracking-wide">{city}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {content?.heading || `${serviceName} in ${city}`}
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {content?.intro || `Expert ${serviceName.toLowerCase()} services in ${city}. Contact GAG Lawyers for professional legal assistance.`}
            </p>

            <Link to="/contact">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Schedule Free Consultation
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGES SECTION */}
      {images && images.some(img => img.url) && (
        <section className="bg-white py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {images.filter(img => img.url).map((image, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={image.url} 
                    alt={image.alt || `${serviceName} in ${city}`}
                    className="w-full h-64 object-cover"
                  />
                  {image.caption && (
                    <p className="p-4 bg-gray-50 text-sm text-gray-600 font-sans">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTENT SECTIONS */}
      {content?.sections && content.sections.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {content.sections.map((section, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-4">
                    {section.title}
                  </h2>
                  <p className="font-sans text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
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
            Get Expert {serviceName} Support in {city}
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
            <Link to="/services">
              <button className="px-8 py-4 bg-transparent text-white font-sans font-semibold rounded-md border-2 border-white/30 transition-all duration-200 hover:bg-white/10">
                View All Services
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gold" />
              <span className="font-sans">+91 98765 43210</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gold" />
              <span className="font-sans">contact@gaglawyers.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPageDynamic;
