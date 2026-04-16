import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, ChevronRight, FileText, Scale, Shield, CheckCircle, 
  Users, Briefcase, HelpCircle, AlertCircle, Loader2
} from 'lucide-react';
import ContentBlockRenderer from '../components/service/ContentBlockRenderer';
import FAQAccordion from '../components/service/FAQAccordion';
import ConsultationForm from '../components/service/ConsultationForm';
import API_BASE_URL from '../config/api';

/**
 * Dynamic Service Page - Fetches content from database
 * Renders rich content blocks that are admin-controllable
 */

const ServicePageDynamic = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [officePhone, setOfficePhone] = useState('+919996263370');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch service data
        const serviceResponse = await fetch(`${API_BASE_URL}/api/services`);
        const serviceData = await serviceResponse.json();
        
        if (serviceData.success) {
          const foundService = serviceData.data.find(s => s.slug === slug);
          if (foundService) {
            setService(foundService);
          } else {
            setError('Service not found');
          }
        } else {
          setError('Failed to load service');
        }

        // Fetch office phone
        try {
          const settingsResponse = await fetch(`${API_BASE_URL}/api/settings/global`);
          const settingsData = await settingsResponse.json();
          if (settingsData.success && settingsData.data?.phone) {
            setOfficePhone(settingsData.data.phone);
          }
        } catch (err) {
          console.error('Error fetching phone:', err);
        }

      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#c9a84c] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-sans">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="mb-4 font-serif text-2xl font-bold text-[#1a2744] md:text-4xl">
            Service Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error || 'The service you are looking for does not exist.'}</p>
          <Link to="/services" className="inline-block px-6 py-3 bg-[#c9a84c] text-[#1a2744] font-sans font-bold rounded-lg hover:bg-[#b89840] transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-sans">
            <Link to="/" className="text-gray-600 hover:text-[#c9a84c] transition-colors">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/services" className="text-gray-600 hover:text-[#c9a84c] transition-colors">
              Services
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-[#1a2744] font-semibold">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-br from-[#1a2744] to-[#1a2744]/90 py-16 text-white md:py-20"
        style={service.heroImage ? {
          backgroundImage: `linear-gradient(rgba(26, 39, 68, 0.85), rgba(26, 39, 68, 0.85)), url(${service.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl">
            <div className="mb-4 inline-block rounded-full bg-[#c9a84c] px-4 py-2 font-sans text-sm font-bold text-[#1a2744]">
              {service.category?.toUpperCase() || 'LEGAL SERVICES'}
            </div>
            <h1 className="mb-4 font-serif text-3xl font-bold leading-snug md:text-5xl md:leading-tight">
              {service.heroTitle || service.title || service.name}
            </h1>
            <p className="mb-8 font-sans text-lg leading-relaxed text-white/90 md:text-xl">
              {service.heroDescription || service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${officePhone}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-white px-8 py-4 font-sans text-base font-bold text-[#1a2744] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                Talk to Lawyer
              </a>
              <a
                href="#consultation-form"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#c9a84c] px-8 py-4 font-sans text-base font-bold text-[#1a2744] shadow-lg transition-all hover:bg-[#b89840] hover:shadow-xl"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Section */}
            {service.overview && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    Overview
                  </h2>
                </div>
                <p className="font-sans text-gray-700 leading-relaxed">
                  {service.overview}
                </p>
              </section>
            )}

            {/* Dynamic Content Blocks */}
            {service.contentBlocks && service.contentBlocks.length > 0 && (
              <>
                {service.contentBlocks.map((block, index) => (
                  <ContentBlockRenderer key={index} block={block} />
                ))}
              </>
            )}

            {/* Key Points */}
            {service.keyPoints && service.keyPoints.length > 0 && (
              <section className="bg-gradient-to-br from-[#c9a84c]/10 to-[#c9a84c]/5 rounded-xl border-2 border-[#c9a84c]/30 p-8">
                <h2 className="font-serif text-2xl font-bold text-[#1a2744] mb-6">
                  Key Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Process Steps */}
            {service.process && service.process.length > 0 && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    Our Process
                  </h2>
                </div>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#c9a84c] rounded-full flex items-center justify-center">
                          <span className="font-sans font-bold text-[#1a2744] text-lg">
                            {step.step || index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-2">
                          {step.title}
                        </h3>
                        <p className="font-sans text-gray-700">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
                    <HelpCircle size={24} className="text-white" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <FAQAccordion faqs={service.faqs} />
              </section>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-[calc(var(--site-header-height,80px)+1rem)]">
              <ConsultationForm serviceName={service.name} />
              
              {/* Quick Info Card */}
              <div className="bg-gradient-to-br from-[#1a2744] to-[#1a2744]/90 rounded-xl p-6 mt-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-4">Need Legal Help?</h3>
                <p className="font-sans text-sm text-white/90 mb-4">
                  Get expert legal advice from experienced lawyers. Free initial consultation available.
                </p>
                <a
                  href="tel:+919996263370"
                  className="block bg-[#c9a84c] text-[#1a2744] font-sans font-bold py-3 px-6 rounded-lg hover:bg-[#b89840] transition-all text-center"
                >
                  Call: +91 99962 63370
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePageDynamic;
