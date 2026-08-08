import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronRight, Scale, MessageCircleQuestion, Home, AlertCircle, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SectionRenderer from '../components/sections/SectionRenderer';
import LocationConsultationSection from '../components/location/LocationConsultationSection';
import API_BASE_URL from '../config/api';
import { optimizeImage } from '../utils/imageUrl';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://gaglawyers.com').replace(/\/+$/, '');
const locationPageCache = new Map();
const locationServiceCache = new Map();

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

const buildLocationSeoTitle = (serviceName, city) => {
  const cleanService = String(serviceName || 'Legal Service').trim();
  const cleanCity = String(city || 'Your City').trim();
  const endsWithLawyer = /\blawyer\b$/i.test(cleanService);
  const serviceForTitle = endsWithLawyer ? cleanService : `${cleanService} Lawyer`;
  return `${serviceForTitle} in ${cleanCity} | GAG Lawyers`;
};

const deriveServiceSlug = (locationSlug = '', pageData = null) => {
  if (pageData?.service?.slug) return pageData.service.slug;
  const { serviceSlugPart } = parseServiceAndCityFromSlug(locationSlug);
  if (!serviceSlugPart) return '';
  return serviceSlugPart;
};

const fetchLocationService = async (serviceSlug, signal) => {
  if (!serviceSlug) return null;
  if (locationServiceCache.has(serviceSlug)) {
    return locationServiceCache.get(serviceSlug);
  }

  const serviceRes = await fetch(`${API_BASE_URL}/api/services/${serviceSlug}`, { signal });
  const serviceJson = await serviceRes.json();
  const service = serviceJson.success && serviceJson.data ? serviceJson.data : null;
  if (service) {
    locationServiceCache.set(serviceSlug, service);
  }
  return service;
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

const escapeRegExp = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const stripInLocationFromText = (value, city) => {
  if (typeof value !== 'string') return value;
  const safeCity = escapeRegExp(city);
  // Remove "in <city>" when used in content body text (keep headings handled separately).
  return value
    .replace(new RegExp(`\\s+in\\s+${safeCity}(?=[\\s,.!?;:]|$)`, 'gi'), '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();
};

const stripInLocationFromContent = (input, city) => {
  if (typeof input === 'string') return stripInLocationFromText(input, city);
  if (Array.isArray(input)) return input.map((item) => stripInLocationFromContent(item, city));
  if (input && typeof input === 'object') {
    const output = {};
    Object.entries(input).forEach(([key, value]) => {
      output[key] = stripInLocationFromContent(value, city);
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

const ensureCityMention = (text, city, suffix = '') => {
  if (typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  if (hasCityReference(trimmed, city)) return trimmed;
  return suffix ? `${trimmed}${suffix}` : `${trimmed} in ${city}`;
};

const withLocationQuestion = (question, city) => {
  if (!question) return `How does this legal process work in ${city}?`;
  return question;
};

const withLocationAnswer = (answer, city) => {
  if (!answer) return 'This depends on your facts, timeline, and court process.';
  if (hasCityReference(answer, city)) return answer;
  return answer.trim();
};

const LOCATION_APPEND_DEFAULTS = ['hero', 'benefits', 'process'];

const withLocationHeading = (heading, city, sectionType = '', appendLocationToHeading = null) => {
  const safeHeading = (heading || '').replace(/\{city\}/gi, city).trim();
  if (sectionType === 'faq') return safeHeading || 'Frequently Asked Questions';
  if (!safeHeading) return `Legal Support in ${city}`;
  if (hasCityReference(safeHeading, city)) return safeHeading;
  if (/faq|frequently asked/i.test(safeHeading)) return safeHeading;

  // Use admin-set override if present, otherwise fall back to type-based default
  const shouldAppend = typeof appendLocationToHeading === 'boolean'
    ? appendLocationToHeading
    : LOCATION_APPEND_DEFAULTS.includes(sectionType);

  return shouldAppend ? `${safeHeading} in ${city}` : safeHeading;
};

const withLocationBody = (body, city) => {
  if (!body || typeof body !== 'string') return body;
  return body;
};

const localizeSectionForCity = (section, city) => {
  const next = {
    ...section,
    heading: withLocationHeading(section?.heading, city, section?.type, section?.appendLocationToHeading ?? null),
    content: stripInLocationFromContent({ ...(section?.content || {}) }, city),
  };

  if (next.type === 'overview' && typeof next.content.body === 'string') {
    next.content.body = withLocationBody(next.content.body, city);
  }

  if (next.type === 'faq' && Array.isArray(next.content.items)) {
    next.content.items = next.content.items.map((item) => ({
      ...item,
      question: withLocationQuestion(item?.question, city),
      answer: withLocationAnswer(item?.answer, city),
    }));
  }

  return next;
};

const LocationPageDynamic = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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

        const cachedPage = locationPageCache.get(slug);
        if (cachedPage) {
          if (mounted) {
            setPageData(cachedPage.pageData);
            setServiceData(cachedPage.serviceData);
          }
          return;
        }

        const serviceSlugFromUrl = deriveServiceSlug(slug);
        const servicePromise = serviceSlugFromUrl
          ? fetchLocationService(serviceSlugFromUrl, controller.signal).catch(() => null)
          : Promise.resolve(null);

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

        if (pageJson.canonicalSlug && pageJson.canonicalSlug !== slug) {
          navigate(`/${pageJson.canonicalSlug}`, { replace: true });
          return;
        }

        const nextPage = pageJson.data;
        const templateMode = nextPage?.content?.templateMode === 'custom' ? 'custom' : 'service';
        const serviceSlug = deriveServiceSlug(slug, nextPage);
        let nextService = await servicePromise;

        if (!nextService && serviceSlug) {
          nextService = await fetchLocationService(serviceSlug, controller.signal);
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
          locationPageCache.set(slug, { pageData: nextPage, serviceData: nextService });
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
  }, [slug, navigate]);

  const template = useMemo(() => {
    if (!pageData) return null;

    const { citySlug } = parseServiceAndCityFromSlug(slug || '');
    const city = pageData.city || toTitleCaseFromSlug(citySlug) || 'Your City';
    const serviceName = serviceData?.name || pageData?.serviceName || pageData?.service?.name || 'Legal Service';
    const templateMode = pageData?.content?.templateMode === 'custom' ? 'custom' : 'service';

    const serviceSectionsRaw = Array.isArray(serviceData?.sections)
      ? serviceData.sections.map((section) => ({
          ...section,
          heading: localizeText(section.heading, city),
          content: localizeObject(section.content || {}, city),
        }))
      : [];
    const serviceSections = serviceSectionsRaw.map((section) => localizeSectionForCity(section, city));

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
    const normalizedHeading = ensureCityMention(heading, city);

    const intro =
      localizeText(pageData?.content?.intro, city) ||
      (templateMode === 'service' ? localizeText(heroSection?.content?.description, city) : '') ||
      `Get dedicated ${serviceName.toLowerCase()} support in ${city} with clear strategy and professional legal execution.`;

    const serviceStyledSections =
      templateMode === 'service'
        ? (serviceSections.length > 0
            ? serviceSections.map((section) => {
                if (section.type !== 'hero') return section;
                return {
                  ...section,
                  heading: normalizedHeading,
                  content: {
                    ...(section.content || {}),
                    description: intro,
                  },
                };
              })
            : fallbackSections)
        : [];

    const highlights = [
      `${serviceName} support tailored to your case needs`,
      'Structured case strategy and documentation workflow',
      'Transparent timelines, updates, and practical legal guidance',
      'Court-ready representation by focused legal professionals',
    ];

    const seo = pageData?.seo || {};
    return { city, serviceName, heading: normalizedHeading, intro, sections, serviceStyledSections, images, highlights, seo, templateMode };
  }, [pageData, serviceData, slug]);

  if (loading) {
    const { citySlug, serviceSlugPart } = parseServiceAndCityFromSlug(slug || '');
    const loadingCity = toTitleCaseFromSlug(citySlug);
    const loadingService = toTitleCaseFromSlug(serviceSlugPart);
    const loadingTitle = buildLocationSeoTitle(loadingService || 'Legal Service', loadingCity || 'Your City');
    return (
      <>
        <SEOHead
          title={loadingTitle}
          description={`Expert ${(loadingService || 'legal').toLowerCase()} services in ${loadingCity || 'your city'}. Contact GAG Lawyers for trusted legal representation.`}
          keywords={`${loadingService}, ${loadingCity}, lawyers, GAG Lawyers`}
          canonical={`${SITE_URL}/${slug || ''}`}
        />
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#c9a84c] animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-sans">Loading service...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !template) {
    return (
      <>
        <SEOHead
          title="Service Not Found | GAG Lawyers"
          description="The legal service page you are looking for could not be found. Browse our services or contact GAG Lawyers for assistance."
          canonical={`${SITE_URL}/${slug || ''}`}
        />
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="mb-4 max-w-[90vw] font-serif text-2xl font-bold leading-snug text-[#1a2744] md:text-4xl md:leading-tight">
              Service Not Found
            </h1>
            <p className="font-sans text-gray-600 mb-8">{error || 'The page you are looking for does not exist.'}</p>
            <Link
              to="/services"
              className="inline-block px-6 py-3 bg-[#c9a84c] text-[#1a2744] font-sans font-bold rounded-lg hover:bg-[#b89840] transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </>
    );
  }

  const { city, serviceName, heading, intro, sections, serviceStyledSections, images, highlights, seo, templateMode } = template;
  const heroImage = images[0];
  const galleryImages = images.filter((img) => img.url);
  const pageTag = `${serviceName} in ${city}`;
  const normalizedSeoTitle = buildLocationSeoTitle(serviceName, city);
  const pageSeoTitle = (typeof seo?.title === 'string' && seo.title.trim()) || normalizedSeoTitle;
  const pageSeoDescription =
    seo?.description ||
    seo?.metaDescription ||
    `Expert ${serviceName.toLowerCase()} services in ${city}.`;
  const pageSeoKeywords = seo?.keywords || `${serviceName}, ${city}, lawyers`;
  const pageCanonical = `${SITE_URL}/${slug || ''}`;
  const serviceHeroIndex = serviceStyledSections.findIndex((section) => section.type === 'hero');

  if (templateMode === 'service') {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f8fb_0%,_#f1f3f7_45%,_#edf0f5_100%)]">
        <SEOHead
          title={pageSeoTitle}
          description={pageSeoDescription}
          keywords={pageSeoKeywords}
          canonical={pageCanonical}
        />

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
                {pageTag}
              </span>
            </div>
          </div>
        </div>

        {serviceStyledSections.length > 0 ? (
          <>
            {serviceHeroIndex === -1 && (
              <LocationConsultationSection serviceName={serviceName} city={city} />
            )}
            {serviceStyledSections.map((section, index) => {
              const isHowGroverSection = section.type !== 'hero' && /how grover/i.test(section?.heading || '');

              if (isHowGroverSection) {
                const teamImageSrc = section?.content?.imageUrl || null;
                const teamImageAlt = section?.content?.imageAlt || 'Grover & Grover Advocates team';

                return (
                  <div key={section._id || `section-${index}`} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8">
                    <div className={teamImageSrc ? 'section-split' : ''}>
                      <div className={teamImageSrc ? 'section-split__text' : ''}>
                        <SectionRenderer section={section} sectionIndex={index} serviceSlug={slug} />
                      </div>
                      {teamImageSrc && (
                        <div className="section-split__image">
                          <img
                            src={optimizeImage(teamImageSrc)}
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

              return (
                <React.Fragment key={section._id || `section-${index}`}>
                  <SectionRenderer
                    section={section}
                    sectionIndex={index}
                    serviceSlug={slug}
                  />
                  {index === serviceHeroIndex && (
                    <LocationConsultationSection serviceName={serviceName} city={city} />
                  )}
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <>
            <LocationConsultationSection serviceName={serviceName} city={city} />
            <div className="py-20 text-center">
              <p className="text-gray-600 font-sans">No content available for this service yet.</p>
            </div>
          </>
        )}
      </div>
    );
  }

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
        title={pageSeoTitle}
        description={pageSeoDescription}
        keywords={pageSeoKeywords}
        canonical={pageCanonical}
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
                    src={optimizeImage(heroImage.url)}
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

      <LocationConsultationSection serviceName={serviceName} city={city} />

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
                    src={optimizeImage(image.url)}
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
            Use the same proven service framework with location-specific execution and responsive legal support for clients in {city}.
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
