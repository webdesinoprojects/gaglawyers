import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const toTitleCaseFromSlug = (value = '') =>
  String(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const parseServiceAndCityFromSlug = (slug = '') => {
  const marker = '-in-';
  const idx = slug.lastIndexOf(marker);
  if (idx === -1) return { serviceSlug: '', citySlug: '' };
  return {
    serviceSlug: slug.slice(0, idx),
    citySlug: slug.slice(idx + marker.length),
  };
};

const toSentenceCase = (value = '') => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const getFallbackImages = (serviceName, city, pageSlug, apiImages = []) => {
  const fromApi = Array.isArray(apiImages)
    ? apiImages.filter((img) => img?.url).slice(0, 3)
    : [];

  const defaults = [1, 2, 3].map((n) => ({
    url: `https://picsum.photos/seed/${encodeURIComponent(`${pageSlug || `${serviceName}-${city}`}-${n}`)}/1200/800`,
    alt: `${serviceName} legal support in ${city}`,
    caption: [
      `Client-focused consultation for ${serviceName.toLowerCase()} in ${city}`,
      `Strategic case planning and documentation support in ${city}`,
      'Professional courtroom representation and legal guidance',
    ][n - 1],
  }));

  const merged = [...fromApi];
  for (const img of defaults) {
    if (merged.length >= 3) break;
    merged.push(img);
  }

  return merged.slice(0, 3);
};

const buildTemplate = (slug, pageData) => {
  const parsed = parseServiceAndCityFromSlug(slug);
  const serviceName =
    pageData?.serviceName ||
    pageData?.service?.name ||
    pageData?.service?.title ||
    toTitleCaseFromSlug(parsed.serviceSlug) ||
    'Legal Service';
  const city = pageData?.city || toTitleCaseFromSlug(parsed.citySlug) || 'Your City';

  const contentHeading = pageData?.content?.heading?.trim();
  const contentIntro = pageData?.content?.intro?.trim();
  const userSections = Array.isArray(pageData?.content?.sections)
    ? pageData.content.sections.filter((s) => s?.title?.trim() && s?.content?.trim())
    : [];

  const heading = contentHeading || `${serviceName} in ${city}`;
  const intro =
    contentIntro ||
    `Get dedicated ${serviceName.toLowerCase()} support in ${city} from a team that focuses on clear strategy, timely updates, and strong representation.`;

  const defaultSections = [
    {
      title: `Why Clients in ${city} Choose Us`,
      content: `We provide structured legal support for ${serviceName.toLowerCase()} matters with practical advice, transparent communication, and preparation tailored to local court realities in ${city}.`,
    },
    {
      title: `${serviceName} Services We Handle`,
      content: 'From consultation and document review to drafting, filing, negotiation, and courtroom advocacy, we manage end-to-end legal work so you can proceed with clarity and confidence.',
    },
    {
      title: 'Our Step-by-Step Approach',
      content: '1) Case review and risk assessment\n2) Evidence and document planning\n3) Filing and procedural compliance\n4) Representation and follow-through\n5) Post-order strategy and next actions',
    },
    {
      title: 'Documentation and Readiness Support',
      content: 'We help organize records, communications, and supporting documents in a court-ready format. This reduces delays and improves case presentation at every stage.',
    },
    {
      title: `Consultation in ${city}`,
      content: 'Every matter starts with a focused consultation where we define goals, timelines, expected process, and the legal options available for your specific facts.',
    },
  ];

  const sections = userSections.length >= 3 ? userSections : defaultSections;

  const highlights = [
    `Focused ${toSentenceCase(serviceName.toLowerCase())} practice support`,
    `City-specific strategy for ${city} proceedings`,
    'Clear timelines, filings, and status communication',
    'Professional representation across hearings and follow-ups',
  ];

  const faqs = [
    {
      question: `How do I start a ${serviceName.toLowerCase()} case in ${city}?`,
      answer:
        'Book a consultation first. We review facts, documents, urgency, and suggest the most practical legal path before filing.',
    },
    {
      question: 'What documents should I keep ready?',
      answer:
        'Keep all agreements, notices, ID proofs, prior filings, and communication records. We provide a case-specific checklist after initial review.',
    },
    {
      question: `How long can proceedings take in ${city}?`,
      answer:
        'Timelines vary by court and case complexity. We provide an estimated roadmap and keep updating strategy as the matter progresses.',
    },
    {
      question: 'Can this matter be resolved without full trial?',
      answer:
        'In many matters, negotiation, mediation, or settlement is possible. We evaluate this early while preserving your litigation position.',
    },
  ];

  const images = getFallbackImages(serviceName, city, slug, pageData?.images);

  return { serviceName, city, heading, intro, sections, highlights, faqs, images };
};

const LocationPageDynamic = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchLocationPage = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/locations/slug/${slug}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (data.success && data.data) {
          if (isMounted) {
            setPageData(data.data);
          }
        } else {
          if (isMounted) {
            setPageData(null);
            setError('Page not found');
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching location page:', err);
          if (isMounted) {
            setPageData(null);
            setError('Failed to load page');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchLocationPage();
    } else {
      setPageData(null);
      setError('Page not found');
      setLoading(false);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
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
          <h1 className="mb-4 max-w-[90vw] font-serif text-2xl font-bold leading-snug text-navy md:text-4xl md:leading-tight">
            Page Not Found
          </h1>
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

  const template = buildTemplate(slug, pageData);
  const { serviceName, city, heading, intro, sections, highlights, faqs, images } = template;
  const seo = pageData?.seo || {};

  return (
    <div>
      <SEOHead
        title={seo?.title || `${serviceName} in ${city} | GAG Lawyers`}
        description={seo?.description || `Expert ${serviceName.toLowerCase()} services in ${city}.`}
        keywords={seo?.keywords || `${serviceName}, ${city}, lawyers`}
      />

      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
              {heading}
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              {intro}
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

      <section className="bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-white">
                <img
                  src={image.url}
                  alt={image.alt || `${serviceName} in ${city}`}
                  className="w-full h-64 object-cover"
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

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 p-8">
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

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="font-serif text-xl font-bold text-navy mb-2">{faq.question}</h3>
                <p className="font-sans text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
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
            Don&apos;t handle complex legal matters alone. Our experienced team is ready to provide the strategic counsel and representation you need.
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
