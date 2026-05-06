import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionRenderer from '../components/sections/SectionRenderer';
import API_BASE_URL from '../config/api';

const ServicePageDynamic = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stripDelhiSuffix = (value = '') =>
    String(value)
      .replace(/\s+in\s+delhi\b/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/services/${slug}`);
        const data = await response.json();

        if (data.success) {
          setService(data.data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to load service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#c9a84c] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-sans">Loading service...</p>
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
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-[#c9a84c] text-[#1a2744] font-sans font-bold rounded-lg hover:bg-[#b89840] transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  const displayServiceName = stripDelhiSuffix(service?.name || '');
  const seoTitle = stripDelhiSuffix(
    service?.seo?.title || `${displayServiceName || service?.name} | Grover & Grover Advocates`
  );
  const seoDescription =
    service?.seo?.metaDescription ||
    service?.seo?.description ||
    `Get reliable legal support from Grover & Grover Advocates for ${displayServiceName.toLowerCase() || 'legal matters'}.`;
  const seoKeywords =
    service?.seo?.keywords ||
    `${displayServiceName || service?.name}, ${displayServiceName || service?.name} lawyer, legal services, Grover and Grover Advocates`;
  const finalSeoTitle = seoTitle;
  const finalSeoDescription = seoDescription;
  const finalSeoKeywords = seoKeywords;
  const finalOgTitle = finalSeoTitle;
  const finalOgDescription = finalSeoDescription;
  const finalCanonical = '';

  const displaySections = Array.isArray(service?.sections)
    ? service.sections.map((section) => {
        const nextSection = {
          ...section,
          heading: stripDelhiSuffix(section.heading || ''),
        };

        if (section.type === 'hero' && section.content && typeof section.content === 'object') {
          nextSection.content = {
            ...section.content,
            subheading: stripDelhiSuffix(section.content.subheading || ''),
          };
        }

        if (section.type === 'faq' && section.content && typeof section.content === 'object') {
          const existingItems = Array.isArray(section.content.items) ? section.content.items : [];
          const fallbackFaqs = Array.isArray(section.content.faqs) ? section.content.faqs : [];
          nextSection.content = {
            ...section.content,
            items: existingItems.length > 0 ? existingItems : fallbackFaqs,
          };
        }

        return nextSection;
      })
    : [];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f8fb_0%,_#f1f3f7_45%,_#edf0f5_100%)]">
      <SEOHead
        title={finalSeoTitle}
        description={finalSeoDescription}
        keywords={finalSeoKeywords}
        ogTitle={finalOgTitle}
        ogDescription={finalOgDescription}
        canonical={finalCanonical}
      />

      {/* Breadcrumb */}
      <div className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm font-sans text-slate-600">
            <Link to="/" className="rounded-md p-1 text-slate-500 transition-colors hover:text-[#c9a84c]">
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <Link to="/services" className="transition-colors hover:text-[#c9a84c]">
              Services
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-[#1a2744]">
              {displayServiceName || service.name}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {displaySections.length > 0 ? (
        displaySections.map((section, index) => {
          const isHowGroverSection = /how grover/i.test(section?.heading || '');

          if (isHowGroverSection) {
            const teamImageSrc = section?.content?.imageUrl || null;
            const teamImageAlt =
              section?.content?.imageAlt || 'Grover & Grover Advocates team';

            return (
              <div key={section._id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
                <div className={teamImageSrc ? 'section-split' : ''}>
                  <div className={teamImageSrc ? 'section-split__text' : ''}>
                    <SectionRenderer section={section} sectionIndex={index} serviceSlug={slug} />
                  </div>
                  {teamImageSrc && (
                    <div className="section-split__image">
                      <img
                        src={teamImageSrc}
                        alt={teamImageAlt}
                        loading="lazy"
                        style={{ borderRadius: '12px', width: '100%', objectFit: 'cover', maxHeight: '360px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return <SectionRenderer key={section._id} section={section} sectionIndex={index} serviceSlug={slug} />;
        })
      ) : (
        <div className="py-20 text-center">
          <p className="text-gray-600 font-sans">No content available for this service yet.</p>
        </div>
      )}
    </div>
  );
};

export default ServicePageDynamic;

