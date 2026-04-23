import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronRight, Scale, MessageCircleQuestion } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const parseServiceAndCityFromSlug = (slug = '') => {
  const marker = '-in-';
  const idx = slug.lastIndexOf(marker);
  if (idx === -1) return { serviceSlugPart: '', citySlug: '' };
  return {
    serviceSlugPart: slug.slice(0, idx),
    citySlug: slug.slice(idx + marker.length),
  };
};

const toTitleCaseFromSlug = (value = '') =>
  String(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const deriveServiceSlug = (locationSlug = '', pageData = null) => {
  if (pageData?.service?.slug) return pageData.service.slug;
  const { serviceSlugPart } = parseServiceAndCityFromSlug(locationSlug);
  if (!serviceSlugPart) return '';
  return serviceSlugPart;
};

const localizeText = (value, city) => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\bNew Delhi\b/gi, city)
    .replace(/\bDelhi\b/gi, city)
    .replace(/\{city\}/gi, city);
};

const localizeObject = (input, city) => {
  if (typeof input === 'string') return localizeText(input, city);
  if (Array.isArray(input)) return input.map((item) => localizeObject(item, city));
  if (input && typeof input === 'object') {
    const output = {};
    Object.entries(input).forEach(([key, value]) => {
      output[key] = localizeObject(value, city);
    });
    return output;
  }
  return input;
};

const parseBody = (text) => {
  if (!text || typeof text !== 'string') return { paragraphs: [], bullets: [] };
  const cleaned = text.replace(/\r/g, '').trim();
  if (!cleaned) return { paragraphs: [], bullets: [] };

  if (cleaned.includes('•') || cleaned.includes('â€¢')) {
    const [head, ...tail] = cleaned.split(/(?:•|â€¢)/);
    return {
      paragraphs: head.trim() ? [head.trim()] : [],
      bullets: tail.map((x) => x.trim()).filter(Boolean),
    };
  }

  const lines = cleaned.split('\n').map((line) => line.trim()).filter(Boolean);
  const bullets = lines
    .filter((line) => /^([-*]|\d+\.)\s+/.test(line))
    .map((line) => line.replace(/^([-*]|\d+\.)\s+/, '').trim());
  const paragraphs = lines.filter((line) => !/^([-*]|\d+\.)\s+/.test(line));

  return { paragraphs, bullets };
};

const getLocationImages = (pageData) => {
  const source = Array.isArray(pageData?.images) ? pageData.images : [];
  return source
    .filter((img) => img && (img.url || img.alt || img.caption))
    .slice(0, 3)
    .map((img, idx) => ({
      url: img.url || '',
      alt: img.alt || `Location legal support visual ${idx + 1}`,
      caption: img.caption || '',
    }));
};

const hasCityReference = (text, city) =>
  typeof text === 'string' &&
  new RegExp(`\\b${city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text);

const withLocationQuestion = (question, city) => {
  if (!question) return `How does this legal process work in ${city}?`;
  if (hasCityReference(question, city)) return question;
  const trimmed = question.trim();
  if (trimmed.endsWith('?')) return `${trimmed.slice(0, -1)} in ${city}?`;
  return `${trimmed} in ${city}?`;
};

const withLocationAnswer = (answer, city) => {
  if (!answer) return `This depends on your facts, timeline, and court process in ${city}.`;
  if (hasCityReference(answer, city)) return answer;
  return `${answer.trim()} This guidance is specifically relevant for matters in ${city}.`;
};

const LocationPageDynamic = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const pageRes = await fetch(`${API_BASE_URL}/api/locations/slug/${slug}`, {
          signal: controller.signal,
        });
        const pageJson = await pageRes.json();

        if (!pageJson.success || !pageJson.data) {
          if (mounted) {
            setError('Page not found');
            setPageData(null);
            setServiceData(null);
          }
          return;
        }

        const nextPage = pageJson.data;
        const templateMode = nextPage?.content?.templateMode === 'custom' ? 'custom' : 'service';
        const serviceSlug = deriveServiceSlug(slug, nextPage);
        let nextService = null;

        if (serviceSlug) {
          const serviceRes = await fetch(`${API_BASE_URL}/api/services/${serviceSlug}`, {
            signal: controller.signal,
          });
          const serviceJson = await serviceRes.json();
          if (serviceJson.success && serviceJson.data) {
            nextService = serviceJson.data;
          }
        }

        if (templateMode === 'service' && !nextService) {
          if (mounted) {
            setError('Page not found');
            setPageData(null);
            setServiceData(null);
          }
          return;
        }

        if (mounted) {
          setPageData(nextPage);
          setServiceData(nextService);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && mounted) {
          console.error('Location page load error:', err);
          setError('Failed to load page');
          setPageData(null);
          setServiceData(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (slug) fetchAll();
    else {
      setLoading(false);
      setError('Page not found');
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [slug]);

  const template = useMemo(() => {
    if (!pageData) return null;

    const { citySlug } = parseServiceAndCityFromSlug(slug || '');
    const city = pageData.city || toTitleCaseFromSlug(citySlug) || 'Your City';
    const serviceName = serviceData?.name || pageData?.serviceName || pageData?.service?.name || 'Legal Service';
    const templateMode = pageData?.content?.templateMode === 'custom' ? 'custom' : 'service';

    const serviceSections = Array.isArray(serviceData?.sections)
      ? serviceData.sections.map((section) => ({
          ...section,
          heading: localizeText(section.heading, city),
          content: localizeObject(section.content || {}, city),
        }))
      : [];

    const heroSection = serviceSections.find((section) => section.type === 'hero');
    const contentSections = serviceSections.filter((section) => section.type !== 'hero');
    const fallbackSections = Array.isArray(pageData?.content?.sections)
      ? pageData.content.sections.map((section) => ({
          type: 'overview',
          heading: localizeText(section.title, city),
          content: { body: localizeText(section.content, city) },
        }))
      : [];

    const sections =
      templateMode === 'custom'
        ? (fallbackSections.length > 0 ? fallbackSections : contentSections)
        : (contentSections.length > 0 ? contentSections : fallbackSections);
    const images = getLocationImages(pageData);

    const heading =
      localizeText(pageData?.content?.heading, city) ||
      (templateMode === 'service' ? localizeText(heroSection?.heading, city) : '') ||
      `${serviceName} in ${city}`;

    const intro =
      localizeText(pageData?.content?.intro, city) ||
      (templateMode === 'service' ? localizeText(heroSection?.content?.description, city) : '') ||
      `Get dedicated ${serviceName.toLowerCase()} support in ${city} with clear strategy and professional legal execution.`;

    const highlights = [
      `${serviceName} support tailored for ${city}`,
      `Structured case strategy and documentation workflow in ${city}`,
      `Transparent timelines, updates, and practical guidance for clients in ${city}`,
      `Court-ready representation by focused legal professionals serving ${city}`,
    ];

    const seo = pageData?.seo || {};
    return { city, serviceName, heading, intro, sections, images, highlights, seo };
  }, [pageData, serviceData, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-4 max-w-[90vw] font-serif text-2xl font-bold leading-snug text-navy md:text-4xl md:leading-tight">
            Page Not Found
          </h1>
          <p className="font-sans text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/">
            <button className="px-6 py-3 bg-navy text-white font-sans font-semibold rounded-md hover:bg-navy/90">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const { city, serviceName, heading, intro, sections, images, highlights, seo } = template;
  const heroImage = images[0];
  const galleryImages = images.filter((img) => img.url);

  const renderSectionBlock = (section, index) => {
    const sectionType = section.type;
    const sectionHeading = section.heading || `${serviceName} in ${city}`;
    const content = section.content || {};

    if (sectionType === 'benefits' && Array.isArray(content.items) && content.items.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.items.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-serif text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-2 font-sans text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      );
    }

    if (sectionType === 'process' && Array.isArray(content.steps) && content.steps.length > 0) {
      return (
        <div className="space-y-4">
          {content.steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold text-navy font-bold">
                {step.stepNumber || idx + 1}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-navy">{step.title}</h3>
                <p className="mt-2 font-sans text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (sectionType === 'faq' && Array.isArray(content.items) && content.items.length > 0) {
      return (
        <div className="space-y-4">
          {content.items.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="flex items-start gap-2 font-serif text-xl font-bold text-navy">
                <MessageCircleQuestion size={18} className="mt-1 text-gold" />
                <span>{withLocationQuestion(item.question, city)}</span>
              </h3>
              <p className="mt-2 font-sans text-gray-700">{withLocationAnswer(item.answer, city)}</p>
            </div>
          ))}
        </div>
      );
    }

    if (sectionType === 'testimonials' && Array.isArray(content.items) && content.items.length > 0) {
      return (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {content.items.map((item, idx) => (
            <div key={idx} className="min-w-[290px] rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="font-sans text-gray-700">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-3 font-serif text-lg font-bold text-navy">{item.name}</p>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          ))}
        </div>
      );
    }

    const body = localizeText(content.body || '', city);
    const { paragraphs, bullets } = parseBody(body);

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className={`font-sans text-gray-700 leading-8 ${idx > 0 ? 'mt-4' : ''}`}>
            {paragraph}
          </p>
        ))}
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-gold" />
                <span className="font-sans text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      <SEOHead
        title={seo?.title || `${serviceName} in ${city} | GAG Lawyers`}
        description={seo?.description || `Expert ${serviceName.toLowerCase()} services in ${city}.`}
        keywords={seo?.keywords || `${serviceName}, ${city}, lawyers`}
      />

      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-300">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <ChevronRight size={16} />
            <Link to="/services" className="hover:text-gold transition">Services</Link>
            <ChevronRight size={16} />
            <span className="text-gold">{city}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-5 text-gold">
                <MapPin size={20} />
                <span className="font-sans text-sm font-semibold uppercase tracking-wide">{city}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                {heading}
              </h1>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-8">{intro}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                    Schedule Consultation
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5">
                {heroImage?.url ? (
                  <img
                    src={heroImage.url}
                    alt={heroImage.alt || `${serviceName} in ${city}`}
                    className="w-full h-[300px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-[300px] w-full flex items-center justify-center bg-white/10 text-gray-200">
                    <div className="text-center px-6">
                      <Scale className="mx-auto mb-3 text-gold" />
                      <p className="font-sans text-sm">Location Hero Image Placeholder</p>
                      <p className="font-sans text-xs text-gray-300 mt-1">
                        Upload from Admin → Location Pages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 p-5">
                <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="font-sans text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-8">Local Visual Context</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((image, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-200">
                  <img
                    src={image.url}
                    alt={image.alt || `${serviceName} in ${city}`}
                    className="w-full h-56 object-cover"
                    loading="lazy"
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

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <article key={idx} className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-5">
                  {section.heading || `${serviceName} in ${city}`}
                </h2>
                {renderSectionBlock(section, idx)}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Get Expert {serviceName} Support in {city}
          </h2>
          <p className="font-sans text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
            Use the same proven service framework with location-specific execution and responsive legal support.
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
    </div>
  );
};

export default LocationPageDynamic;
