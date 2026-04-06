import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import FAQItem from '../components/FAQItem';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const BORDER_SOFT = '#E5E0D0';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setServices(
          data.data.map((service) => ({
            id: service._id,
            title: service.name || service.title,
            slug: service.slug,
            description: service.shortDescription || service.description,
            details: service.typesOfCases || [],
            longDescription: service.longDescription || service.description,
            iconName: service.iconName || 'Briefcase',
          }))
        );
      } else {
        console.warn('No services returned from API');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: 'How do I schedule an initial consultation?',
      answer:
        'You can schedule a consultation by filling out the contact form on our Contact page, calling us directly, or sending an email to contact@gaglawyers.com. Initial consultations are typically scheduled within 48 hours.',
    },
    {
      question: 'What are your fees and billing practices?',
      answer:
        'Our fee structure varies depending on the nature and complexity of the case. We offer transparent pricing with options for hourly billing, fixed fees, or retainer arrangements. Detailed fee information is provided during the initial consultation.',
    },
    {
      question: 'Do you handle cases outside of Delhi?',
      answer:
        'Yes, our team regularly represents clients across India. We have appeared in various High Courts and the Supreme Court of India, and we work with local counsel when necessary.',
    },
    {
      question: 'How long does a typical case take?',
      answer:
        'Case timelines vary significantly based on the type of matter, complexity, and court schedules. During consultation, we provide realistic timelines based on similar cases and current court conditions.',
    },
    {
      question: 'Can I get legal advice online?',
      answer:
        'Yes, we offer remote consultations via video conference for your convenience. However, certain matters may require in-person meetings depending on the nature of the case.',
    },
  ];

  const sidebarBtnClass = (index, { mobile = false } = {}) => {
    const active = activeService === index;
    if (mobile) {
      return [
        'shrink-0 snap-start whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-sans transition-all duration-200 border',
        active
          ? 'border-[#C9A84C] bg-[#FDF8EC] font-bold text-[#0B1526] shadow-sm'
          : 'border-[#E5E0D0] bg-white text-[#0B1526] font-medium hover:border-[#C9A84C]/50 hover:bg-[#faf9f6]',
      ].join(' ');
    }
    return [
      'w-full border-l-[3px] text-left font-sans text-[14px] transition-all duration-200',
      'px-4 py-[10px] text-[#0B1526]',
      active
        ? 'border-[#C9A84C] bg-[#FDF8EC] font-bold'
        : 'border-transparent font-medium hover:border-[#C9A84C]/45 hover:bg-gray-100/90',
    ].join(' ');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0B1526] border-t-transparent" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3]">
        <p className="font-sans text-gray-500">No services available</p>
      </div>
    );
  }

  const currentService = services[activeService];

  return (
    <div className="bg-[#F8F7F3]">
      <SEOHead
        title="Legal Services - GAG Lawyers | 25+ Practice Areas"
        description="Comprehensive legal services across 25+ practice areas including corporate law, criminal defense, civil litigation, family law, real estate, and more."
        keywords="legal services, corporate lawyers, civil litigation, real estate law, family law, criminal defense, administrative law, arbitration"
      />

      {/* Hero — tighter handoff to content */}
      <section className="bg-[#0B1526] pb-8 pt-12 text-white md:pb-10 md:pt-14 lg:pb-10 lg:pt-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 font-serif text-4xl font-bold lg:text-5xl">Practice Areas</h1>
          <p className="mx-auto max-w-3xl font-sans text-base text-gray-400 lg:text-lg">
            Comprehensive legal expertise across our specialized practice areas — disciplined counsel for
            complex matters.
          </p>
          <div className="mt-6 flex justify-center">
            <span
              className="inline-flex items-center rounded-full border border-[#C9A84C]/35 bg-[#C9A84C]/12 px-5 py-2 font-sans text-sm font-semibold tracking-wide text-[#C9A84C] ring-1 ring-[#C9A84C]/20"
              aria-label={`${services.length} specialized practice areas`}
            >
              {services.length} Specialized Practice Areas
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F3] pb-12 pt-6 md:pb-16 md:pt-8 lg:pb-20 lg:pt-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile: horizontal tab strip */}
          <div className="mb-8 lg:hidden">
            <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-2 scrollbar-thin">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(index)}
                  className={sidebarBtnClass(index, { mobile: true })}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {/* Desktop sidebar */}
            <aside className="hidden lg:col-span-1 lg:block">
              <nav
                className="services-sidebar-scroll sticky top-[calc(var(--site-header-height)+1rem)] max-h-[min(70vh,650px)] overflow-y-auto rounded-xl border bg-white py-3 shadow-[0_4px_24px_-4px_rgba(11,21,38,0.08)]"
                style={{ borderColor: BORDER_SOFT }}
              >
                <h3 className="px-4 pb-3 pt-1 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1526]">
                  All Services
                </h3>
                <div className="flex flex-col gap-0.5 px-2 pb-3">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveService(index)}
                      className={sidebarBtnClass(index)}
                    >
                      {service.title}
                    </button>
                  ))}
                </div>
              </nav>
            </aside>

            {/* Detail panel */}
            <main className="lg:col-span-2">
              <div
                className="space-y-8 rounded-[12px] border bg-white py-8 shadow-[0_8px_40px_-12px_rgba(11,21,38,0.07)] px-6 sm:px-8 md:px-10"
                style={{ borderColor: BORDER_SOFT }}
              >
                <div className="border-b pb-6" style={{ borderColor: BORDER_SOFT }}>
                  <h2 className="mb-4 font-serif text-3xl font-bold text-[#0B1526] md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                    {currentService.title}
                  </h2>
                  <p className="font-sans text-base leading-relaxed text-gray-600 md:text-[1.05rem]">
                    {currentService.description}
                  </p>
                  <Link
                    to={`/services/${currentService.slug}`}
                    className="mt-5 inline-flex items-center gap-1 font-sans font-semibold text-[#C9A84C] no-underline transition hover:underline"
                  >
                    View full service details →
                  </Link>
                </div>

                {currentService.overview && (
                  <div className="rounded-lg border border-[#E5E0D0]/80 bg-[#FDF8EC]/40 p-6">
                    <h3 className="mb-3 font-serif text-lg font-semibold text-[#0B1526]">Overview</h3>
                    <p className="font-sans leading-relaxed text-gray-700">{currentService.overview}</p>
                  </div>
                )}

                {currentService.details && currentService.details.length > 0 && (
                  <div>
                    <h3 className="mb-6 flex items-center gap-3 font-sans text-lg font-semibold text-[#0B1526] md:text-xl">
                      <span
                        className="inline-block h-6 w-1 shrink-0 rounded-full bg-[#C9A84C]"
                        aria-hidden
                      />
                      Types of Cases We Handle
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                      {currentService.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-lg border bg-[#faf9f7] px-4 py-3 transition-colors hover:border-[#C9A84C]/35 hover:bg-[#FDF8EC]/80"
                          style={{ borderColor: BORDER_SOFT }}
                        >
                          <Check
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A84C]"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          <span className="font-sans text-sm leading-snug text-[#0B1526] md:text-[0.9375rem]">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className="flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:gap-4"
                  style={{ borderColor: BORDER_SOFT }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex h-12 min-w-[11rem] flex-1 items-center justify-center rounded-[8px] bg-[#C9A84C] px-6 font-sans text-sm font-bold text-[#0B1526] shadow-sm transition hover:bg-[#B08A3E] md:text-[0.9375rem] sm:max-w-[14rem]"
                  >
                    Schedule Consultation
                  </Link>
                  <Link
                    to={`/services/${currentService.slug}`}
                    className="inline-flex h-12 min-w-[11rem] flex-1 items-center justify-center rounded-[8px] border-2 border-[#0B1526] bg-transparent px-6 font-sans text-sm font-bold text-[#0B1526] transition hover:bg-[#0B1526] hover:text-white md:text-[0.9375rem] sm:max-w-[14rem]"
                  >
                    Full Details & More
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#F8F7F3] to-white py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block font-serif text-3xl font-bold text-[#0B1526] md:text-4xl lg:text-[2.5rem]">
              Frequently Asked Questions
              <span
                className="absolute -bottom-2 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-[#C9A84C]"
                aria-hidden
              />
            </h2>
            <p className="mx-auto mt-8 max-w-2xl font-sans text-base text-gray-600 md:text-lg">
              Answers to common questions about our legal services and how we work with clients.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-[#E5E0D0] bg-white/90 p-8 text-center shadow-sm lg:p-10">
            <h3 className="mb-3 font-serif text-2xl font-bold text-[#0B1526]">Still Have Questions?</h3>
            <p className="mx-auto mb-6 max-w-xl font-sans text-gray-600">
              Our legal experts are ready to help. Get a personalized consultation for your specific
              situation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-[8px] bg-[#0B1526] px-8 py-3 font-sans font-semibold text-white transition hover:bg-[#0B1526]/90"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#0B1526] to-[#0a1628] py-14 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-serif text-3xl font-bold lg:text-4xl">Need Specialized Legal Services?</h2>
          <p className="mx-auto mb-8 max-w-2xl font-sans text-lg text-gray-300">
            With expertise across {services.length}+ practice areas, we&apos;re equipped to handle your
            unique legal challenges.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#C9A84C] px-8 py-4 font-sans font-semibold text-[#0B1526] transition hover:bg-[#B08A3E]"
          >
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
