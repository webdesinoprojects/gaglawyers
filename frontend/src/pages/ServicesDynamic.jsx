import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlockRenderer from '../components/blocks/BlockRenderer';
import API_BASE_URL from '../config/api';

const ServicesDynamic = () => {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState([]);
  const [pageBlocks, setPageBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, blocksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/cms/page-blocks/services`),
      ]);

      const servicesData = await servicesRes.json();
      const blocksData = await blocksRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data.map((service) => ({
          id: service._id,
          title: service.name || service.title,
          slug: service.slug,
          description: service.shortDescription || service.description,
          details: service.typesOfCases || [],
          longDescription: service.longDescription || service.description,
          iconName: service.iconName || 'Briefcase',
        })));
      }

      if (blocksData.success && blocksData.data.blocks) {
        setPageBlocks(blocksData.data.blocks);
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-sans text-gray-500">No services available</p>
      </div>
    );
  }

  const IconComponent = Icons[services[activeService]?.iconName] || Icons.Briefcase;
  const currentService = services[activeService];

  return (
    <div>
      <SEOHead 
        title="Legal Services - GAG Lawyers | 25+ Practice Areas"
        description="Comprehensive legal services across 25+ practice areas including corporate law, criminal defense, civil litigation, family law, real estate, and more."
        keywords="legal services, corporate lawyers, civil litigation, real estate law, family law, criminal defense, administrative law, arbitration"
      />
      
      {/* HERO SECTION */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">
            Practice Areas
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive legal expertise across 25+ practice areas to serve your diverse needs
          </p>
          <div className="mt-8 inline-block text-sm font-sans text-gold">
            {services.length} Specialized Practice Areas
          </div>
        </div>
      </section>

      {/* SERVICES GRID & DETAIL VIEW */}
      <section className="bg-gray-50 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* SIDEBAR - Services List */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 lg:sticky lg:top-40 max-h-[650px] overflow-y-auto border-l-4 border-gold">
                <h3 className="font-serif text-lg font-bold text-navy mb-6 px-2">
                  All Services
                </h3>
                <nav className="space-y-2">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-sans text-sm font-medium ${
                        activeService === index
                          ? 'bg-navy text-white shadow-lg scale-105'
                          : 'text-gray-700 hover:bg-gold/10 hover:text-navy'
                      }`}
                    >
                      {service.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* MAIN CONTENT - Service Details */}
            <main className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 space-y-10 border-t-4 border-gold">
                <div className="border-b-2 border-gray-200 pb-6">
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
                    {currentService.title}
                  </h2>
                  <p className="font-sans text-gray-600 text-base lg:text-lg">
                    {currentService.description}
                  </p>
                  <Link 
                    to={`/services/${currentService.slug}`}
                    className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold/80 transition mt-4"
                  >
                    View full service details →
                  </Link>
                </div>

                {currentService.details && currentService.details.length > 0 && (
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-navy mb-6">
                      Types of Cases We Handle
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentService.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-gold/5 rounded-lg border-l-2 border-gold hover:shadow-md transition"
                        >
                          <span className="text-gold font-bold flex-shrink-0 text-lg">✓</span>
                          <span className="font-sans text-gray-700 text-sm lg:text-base">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="flex-1">
                    <button className="w-full px-6 py-4 bg-navy text-white font-sans font-semibold rounded-lg transition-all duration-200 hover:bg-navy/90 hover:shadow-lg transform hover:scale-105">
                      Schedule Consultation
                    </button>
                  </Link>
                  <Link to={`/services/${currentService.slug}`} className="flex-1">
                    <button className="w-full px-6 py-4 bg-transparent text-navy font-sans font-semibold rounded-lg border-2 border-navy transition-all duration-200 hover:bg-navy/5">
                      Full Details & More
                    </button>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Render Dynamic Blocks (FAQ, etc) */}
      {pageBlocks.map((block, index) => (
        <BlockRenderer 
          key={block._id || index} 
          block={block}
          overrideContent={block.overrideContent}
        />
      ))}

      {/* ALL SERVICES CTA */}
      <section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6">
            Need Specialized Legal Services?
          </h2>
          <p className="font-sans text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            With expertise across {services.length}+ practice areas, we're equipped to handle your unique legal challenges.
          </p>
          <Link to="/contact">
            <button className="px-8 py-4 bg-gold text-navy font-sans font-semibold rounded transition-all duration-200 hover:brightness-110 hover:scale-105">
              Get in Touch Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesDynamic;
