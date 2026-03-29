import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import API_BASE_URL from '../config/api';

const LocationPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocationPage();
  }, [slug]);

  const fetchLocationPage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/${slug}`);
      const data = await response.json();
      if (data.success) {
        setPageData(data.data);
      }
    } catch (error) {
      console.error('Error fetching location page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-navy mb-4">Page Not Found</h2>
          <Link to="/services" className="font-sans text-gold hover:text-navy transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4 text-gold">
            <MapPin size={20} />
            <span className="font-sans text-sm">{pageData.city}</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            {pageData.seo.h1}
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-4xl">
            {pageData.content.intro}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-3xl font-bold text-navy mb-6">
              {pageData.content.heading}
            </h2>
            
            {pageData.content.sections && pageData.content.sections.length > 0 && (
              <div className="space-y-8">
                {pageData.content.sections.map((section, index) => (
                  <div key={index}>
                    {section.title && (
                      <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
                        {section.title}
                      </h3>
                    )}
                    <p className="font-sans text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 p-8 bg-grey-light rounded-sm">
            <h3 className="font-serif text-2xl font-bold text-navy mb-6 text-center">
              Need Legal Assistance in {pageData.city}?
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">
                  View All Services <ArrowRight className="inline ml-2" size={20} />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-gold" />
                <span className="font-sans">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-gold" />
                <span className="font-sans">contact@gaglawyers.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
