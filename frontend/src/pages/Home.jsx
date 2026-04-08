import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Scale,
  FileText,
  Calendar,
  Star,
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';
import HeroCarousel from '../components/HeroCarousel';
import AnimatedStatValue from '../components/AnimatedStatValue';
import SectionReveal from '../components/SectionReveal';
import API_BASE_URL from '../config/api';
import { mergeHomeSections } from '../data/homePageContentDefaults';

const SECTION_ICONS = { Shield, Users, Award, TrendingUp, Scale, FileText, CheckCircle };

/** lucide-react v1.7 has no Linkedin export — use standard glyph */
function LinkedInIcon({ size = 20, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const scrollMainOffset = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--site-header-height')
    .trim();
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px + 8 : 120;
};

const Home = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [awards, setAwards] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    description: '',
  });
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState(null);

  const [ctaForm, setCtaForm] = useState({
    name: '',
    email: '',
    phone: '',
    legalIssue: '',
    preferredContactTime: '',
  });
  const [isSubmittingCta, setIsSubmittingCta] = useState(false);
  const [ctaStatus, setCtaStatus] = useState(null);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  useEffect(() => {
    const hash = location.hash?.replace(/^#/, '');
    if (!hash || loading) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - scrollMainOffset();
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(t);
  }, [location.hash, loading]);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes, pageRes, blogRes, teamRes, awardsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/reviews?featured=true`),
        fetch(`${API_BASE_URL}/api/pages/home`),
        fetch(`${API_BASE_URL}/api/blog?limit=6`),
        fetch(`${API_BASE_URL}/api/team?limit=20`),
        fetch(`${API_BASE_URL}/api/awards`),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();
      const pageData = await pageRes.json();
      const blogData = await blogRes.json();
      const teamData = await teamRes.json();
      const awardsData = await awardsRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data);
      }

      if (reviewsData.success && reviewsData.data.length > 0) {
        setReviews(reviewsData.data);
      }

      if (pageData.success) {
        setPageContent(pageData.data);
      }

      if (blogData.success && blogData.data.length > 0) {
        setBlogPosts(blogData.data);
      }

      if (teamData.success && teamData.data.length > 0) {
        setTeamMembers(teamData.data);
      }

      if (awardsData.success && Array.isArray(awardsData.data)) {
        const pub = awardsData.data.filter((a) => a.isPublished !== false);
        const sorted = [...pub].sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return (a.order || 0) - (b.order || 0);
        });
            setAwards(sorted.slice(0, 16));
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildAppointmentMessage = (form) => {
    const parts = [];
    if (form.preferredDate) parts.push(`Preferred date: ${form.preferredDate}`);
    if (form.description?.trim()) parts.push(form.description.trim());
    const body = parts.join('\n\n').trim();
    return body || 'Appointment request submitted from the home page.';
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);
    setAppointmentStatus(null);

    try {
      const message = buildAppointmentMessage(appointmentForm);
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: appointmentForm.name,
          email: appointmentForm.email,
          phone: appointmentForm.phone,
          serviceOfInterest: appointmentForm.service,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const formCopy = mergeHomeSections(pageContent?.sections).consultationForm;
        setAppointmentStatus({
          type: 'success',
          message:
            formCopy.successMessage ||
            'Thank you! Your appointment request has been submitted.',
        });
        setAppointmentForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          preferredDate: '',
          description: '',
        });
        setTimeout(() => setAppointmentStatus(null), 5000);
      } else {
        setAppointmentStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setAppointmentStatus({
        type: 'error',
        message: 'Unable to submit appointment request. Please try again later.',
      });
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCtaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCtaSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingCta(true);
    setCtaStatus(null);

    const message = [
      ctaForm.legalIssue?.trim() && `Legal issue:\n${ctaForm.legalIssue.trim()}`,
      ctaForm.preferredContactTime && `Preferred contact time: ${ctaForm.preferredContactTime}`,
    ]
      .filter(Boolean)
      .join('\n\n')
      .trim();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ctaForm.name,
          email: ctaForm.email,
          phone: ctaForm.phone,
          serviceOfInterest: 'General consultation — home page',
          message: message || 'Consultation request from home page CTA.',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCtaStatus({
          type: 'success',
          message: 'Thank you. We will reach out shortly.',
        });
        setCtaForm({
          name: '',
          email: '',
          phone: '',
          legalIssue: '',
          preferredContactTime: '',
        });
        setTimeout(() => setCtaStatus(null), 5000);
      } else {
        setCtaStatus({
          type: 'error',
          message: data.message || 'Submission failed. Please try again.',
        });
      }
    } catch {
      setCtaStatus({
        type: 'error',
        message: 'Unable to submit. Please try again later.',
      });
    } finally {
      setIsSubmittingCta(false);
    }
  };

  const home = mergeHomeSections(pageContent?.sections);
  const practiceAreasSection = home.practiceAreas || {
    heading: 'Practice Areas',
    subheading: 'Comprehensive legal expertise across multiple domains',
  };
  const testimonialsSection = home.testimonials || {
    heading: 'What Our Clients Say',
    subheading: 'Trusted by leading businesses and individuals across India',
  };
  const cf = home.consultationForm;
  const ctaConsult = home.consultationCta;

  const bookAppointmentForm = (formId = 'book-appointment') => (
    <div
      id={formId}
      className="scroll-mt-[var(--site-header-height)] rounded-2xl shadow-2xl border border-white/25 bg-white/95 backdrop-blur-md max-h-[min(75vh,640px)] overflow-y-auto overscroll-contain"
    >
      <div className="p-6 lg:p-7">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/15 rounded-full mb-3">
            <Calendar className="text-gold" size={26} />
          </div>
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-navy mb-1">{cf.title}</h2>
          <p className="font-sans text-sm text-gray-600">{cf.subtitle}</p>
        </div>

        {appointmentStatus && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              appointmentStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <p className="font-sans text-xs font-medium">{appointmentStatus.message}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAppointmentSubmit}>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={appointmentForm.name}
              onChange={handleAppointmentChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm text-gray-900 focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              placeholder={cf.placeholders?.name || 'Your name'}
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={appointmentForm.email}
              onChange={handleAppointmentChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              placeholder={cf.placeholders?.email || 'your@email.com'}
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={appointmentForm.phone}
              onChange={handleAppointmentChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              placeholder={cf.placeholders?.phone || 'Your mobile number (with country code)'}
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">
              Practice area *
            </label>
            <select
              name="service"
              value={appointmentForm.service}
              onChange={handleAppointmentChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
            >
              <option value="">{cf.placeholders?.service || 'Select a service'}</option>
              {services.map((service) => (
                <option key={service._id} value={service.name || service.title}>
                  {service.name || service.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">
              Preferred date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={appointmentForm.preferredDate}
              onChange={handleAppointmentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="description"
              value={appointmentForm.description}
              onChange={handleAppointmentChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm resize-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              placeholder={cf.placeholders?.description || 'Tell us how we can help'}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmittingAppointment}
            className="w-full px-4 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-lg transition-all hover:brightness-110 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmittingAppointment ? cf.submittingLabel || 'Submitting...' : cf.submitLabel || 'Book appointment'}
            {!isSubmittingAppointment && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <SEOHead
        title={
          pageContent?.seo?.title ||
          'GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates'
        }
        description={
          pageContent?.seo?.description ||
          'Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India.'
        }
        keywords={
          pageContent?.seo?.keywords ||
          'lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law'
        }
      />

      <HeroCarousel
        aside={null}
        showTrustStrip={false}
        showScrollCue
        scrollCueTargetId="practice-areas"
        scrollCueLabel="Explore"
        slides={pageContent?.sections?.carousel?.slides}
        trustStrip={pageContent?.sections?.carousel?.trustStrip}
      />

      {/* Practice areas + book appointment */}
      <section
        id="practice-areas"
        className="relative scroll-mt-[var(--site-header-height)] bg-[#0B1F3A] py-16 lg:py-24 border-t border-gold/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="text-center mb-14 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
                {practiceAreasSection.heading}
              </h2>
              <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">
                {practiceAreasSection.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {services.map((service, index) => (
                    <Link
                      key={service._id || index}
                      to={`/services/${service.slug}`}
                      className="group bg-[#112240] rounded-xl border border-gold/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10 hover:border-gold/60 flex flex-col h-full"
                    >
                      <ServiceCard
                        title={service.name || service.title}
                        description={service.shortDescription || service.description}
                        iconName={service.iconName}
                      />
                      <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-gold group-hover:gap-2 transition-all">
                        Learn more
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <Link to="/services">
                    <button
                      type="button"
                      className="px-8 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-[1.02] shadow-lg shadow-gold/20"
                    >
                      {home.practiceCta?.viewAllServicesText || 'View all practice areas'}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-28">{bookAppointmentForm('book-appointment')}</div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Who we are / Why us / Values / Process */}
      <section
        id="about"
        className="scroll-mt-[var(--site-header-height)] bg-gradient-to-b from-[#081629] to-[#0B1F3A] py-16 lg:py-24 border-t border-gold/20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="max-w-3xl pt-4">
              <div className="flex items-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                {home.whoWeAre.eyebrow}
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
                {home.whoWeAre.title}
              </h2>
              <p className="font-sans text-lg text-[#E6D5B8] leading-relaxed mb-4">{home.whoWeAre.intro}</p>
              <p className="font-sans text-gray-300 leading-relaxed">{home.whoWeAre.mission}</p>
            </div>
          </SectionReveal>

          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="text-center mb-14 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                {home.whyChoose.eyebrow}
              </span>
              <h3 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">{home.whyChoose.title}</h3>
              <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">{home.whyChoose.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(home.whyChoose.cards || []).map((card, idx) => {
                const IconComp = SECTION_ICONS[card.icon] || Shield;
                return (
                  <div
                    key={`${card.title}-${idx}`}
                    className="rounded-xl p-7 border-t-4 border-gold bg-[#0B1F3A] shadow-lg hover:shadow-xl hover:shadow-gold/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gold/15 rounded-full flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6 text-gold" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">{card.title}</h4>
                    <p className="font-sans text-sm text-gray-300 leading-relaxed">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>

          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="text-center mb-14 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                {home.ourValues.eyebrow}
              </span>
              <h3 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">{home.ourValues.title}</h3>
              <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">{home.ourValues.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(home.ourValues.cards || []).map((card, i) => (
                <div
                  key={`${card.title}-${i}`}
                  className="rounded-xl border-l-4 border-gold bg-[#081629] p-6 text-center hover:border-l-[6px] hover:shadow-lg hover:shadow-gold/10 transition-all"
                >
                  <h4 className="font-serif text-lg font-bold text-white mb-2">{card.title}</h4>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="text-center mb-14 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                {home.howWeWork.eyebrow}
              </span>
              <h3 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">{home.howWeWork.title}</h3>
              <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">{home.howWeWork.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {(home.howWeWork.steps || []).map((step) => {
                const v = (step.variant || 'light').toLowerCase();
                const box =
                  v === 'navy'
                    ? 'bg-gradient-to-br from-[#0B1F3A] to-[#081629] rounded-xl p-6 text-white border border-gold/20'
                    : v === 'gold'
                      ? 'bg-gradient-to-br from-gold to-gold/90 rounded-xl p-6 text-navy'
                      : 'bg-[#081629] rounded-xl p-6 border border-gold/20';
                const numCircle =
                  v === 'gold'
                    ? 'w-10 h-10 bg-navy rounded-full flex items-center justify-center font-serif text-sm font-bold text-white mb-4'
                    : 'w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center font-serif text-sm font-bold text-gold mb-4';
                const titleCls = v === 'navy' ? 'text-white' : v === 'gold' ? 'text-navy' : 'text-white';
                const bodyCls = v === 'navy' ? 'text-gray-300' : v === 'gold' ? 'text-navy/85' : 'text-gray-300';
                return (
                  <div key={step.number + step.title} className={box}>
                    <div className={numCircle}>{step.number}</div>
                    <h4 className={`font-serif text-base font-bold mb-2 ${titleCls}`}>{step.title}</h4>
                    <p className={`font-sans text-sm leading-relaxed ${bodyCls}`}>{step.body}</p>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section id="team" className="scroll-mt-[var(--site-header-height)] bg-[#F7F9FC] py-16 lg:py-24 border-t border-gold/20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              {/* Section Heading with Gold Ornament */}
              <div className="text-center mb-14 pt-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-px w-12 bg-gold"></div>
                  <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                  <div className="h-px w-12 bg-gold"></div>
                </div>
                <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                  {home.teamSection.eyebrow}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">{home.teamSection.title}</h2>
                <p className="font-sans text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">{home.teamSection.subtitle}</p>
              </div>

              {teamMembers[0] && (
                <div className="mb-14 flex flex-col lg:flex-row items-center gap-10 rounded-2xl border-l-4 border-gold bg-white shadow-xl p-8 lg:p-10">
                  <div className="relative flex-shrink-0 group">
                    <img
                      src={teamMembers[0].imageUrl}
                      alt={teamMembers[0].name}
                      className="w-52 h-52 lg:w-64 lg:h-64 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-3">
                      {home.teamSection.founderBadge}
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-navy mb-2">{teamMembers[0].name}</h3>
                    <p className="font-sans text-lg text-gold font-semibold mb-4">{teamMembers[0].designation}</p>
                    <p className="font-sans text-gray-600 leading-relaxed mb-5">{teamMembers[0].bio}</p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full border border-gold/30">
                        {home.teamSection.badgeA}
                      </span>
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full border border-gold/30">
                        {home.teamSection.badgeB}
                      </span>
                      {teamMembers[0].linkedinUrl && (
                        <a
                          href={teamMembers[0].linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-navy hover:text-gold text-sm font-semibold"
                          aria-label="LinkedIn"
                        >
                          <LinkedInIcon size={20} />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.slice(1).map((member) => (
                  <div
                    key={member._id}
                    className="group bg-white rounded-xl border-t-4 border-gold overflow-hidden hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        {member.linkedinUrl ? (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gold text-navy hover:bg-white transition-colors"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <LinkedInIcon size={22} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <div className="p-6 relative">
                      <h3 className="font-serif text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-sans text-sm text-gold font-semibold mb-3">{member.designation}</p>
                      <p className="font-sans text-sm text-gray-600 line-clamp-4">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/team">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans text-base font-semibold rounded-lg hover:brightness-110 transition-all hover:scale-[1.02] shadow-lg shadow-gold/20"
                  >
                    {home.teamSection.ctaText}
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section
        id="testimonials"
        className="scroll-mt-[var(--site-header-height)] bg-gradient-to-br from-[#0B1F3A] via-[#081629] to-[#0B1F3A] py-12 lg:py-16 relative overflow-hidden border-t border-gold/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal>
            {/* Section Heading with Gold Ornament */}
            <div className="text-center mb-14 pt-4">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                <div className="h-px w-12 bg-gold"></div>
              </div>
              <span className="inline-block font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-4 py-2 rounded-full mb-4">
                {home.testimonialsIntro.eyebrow}
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
                {testimonialsSection.heading}
              </h2>
              <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">{testimonialsSection.subheading}</p>
            </div>
          </SectionReveal>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full mx-auto mb-4" />
              <p className="font-sans text-gray-500">Loading testimonials...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="relative">
              {reviews.length > 2 && (
                <>
                  <button
                    type="button"
                    onClick={() => scroll('left')}
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6 text-navy" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll('right')}
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6 text-navy" />
                  </button>
                </>
              )}

              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0B1F3A] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0B1F3A] to-transparent z-10 pointer-events-none" />

              <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth">
                <div className="flex gap-6 px-2 lg:px-14">
                  {reviews.map((review) => (
                    <TestimonialCard
                      key={review._id}
                      content={review.content}
                      author={review.clientName}
                      designation={review.designation}
                      imageUrl={review.imageUrl}
                      rating={review.rating}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="font-sans text-sm text-gray-500 flex items-center justify-center gap-2">
                  <span className="inline-block w-8 h-0.5 bg-gray-300 rounded" />
                  {home.testimonialsScroll.hint}
                  <span className="inline-block w-8 h-0.5 bg-gray-300 rounded" />
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <Quote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="font-sans text-gray-500 text-lg">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Glance of our experience — stats */}
      <section
        id="experience"
        className="scroll-mt-[var(--site-header-height)] bg-gradient-to-b from-navy to-[#0a1628] py-16 lg:py-20 border-t border-white/10"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold/90 text-center mb-3">
              At a glance
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white text-center mb-12">
              Our experience in numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
              <div className="text-center">
                <p className="font-serif text-3xl lg:text-5xl font-semibold text-white mb-2 tabular-nums">
                  <AnimatedStatValue value={home.stats.casesRepresented} duration={1900} />
                </p>
                <p className="font-sans text-sm text-gray-400">{home.stats.casesRepresentedLabel}</p>
              </div>
              <div className="text-center md:border-l border-white/10">
                <p className="font-serif text-3xl lg:text-5xl font-semibold text-white mb-2 tabular-nums">
                  <AnimatedStatValue value={home.stats.criminalMatters} duration={1900} />
                </p>
                <p className="font-sans text-sm text-gray-400">{home.stats.criminalMattersLabel}</p>
              </div>
              <div className="text-center md:border-l border-white/10">
                <p className="font-serif text-3xl lg:text-5xl font-semibold text-white mb-2 tabular-nums">
                  <AnimatedStatValue value={home.stats.familyMatters} duration={1900} />
                </p>
                <p className="font-sans text-sm text-gray-400">{home.stats.familyMattersLabel}</p>
              </div>
              <div className="text-center md:border-l border-white/10">
                <p className="font-serif text-3xl lg:text-5xl font-semibold text-white mb-2 tabular-nums">
                  <AnimatedStatValue value={home.stats.civilMatters} duration={1900} />
                </p>
                <p className="font-sans text-sm text-gray-400">{home.stats.civilMattersLabel}</p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section id="articles" className="scroll-mt-[var(--site-header-height)] bg-[#F7F9FC] py-16 lg:py-24 border-t border-gold/20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              {/* Section Heading with Gold Ornament */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 pt-4">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="h-px w-12 bg-gold"></div>
                    <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                    <div className="h-px w-12 bg-gold"></div>
                  </div>
                  <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                    {home.blogSection.eyebrow}
                  </span>
                  <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">{home.blogSection.title}</h2>
                  <p className="font-sans text-base lg:text-lg text-gray-600 max-w-2xl">{home.blogSection.subtitle}</p>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-sans font-semibold rounded-lg hover:brightness-110 transition-all shrink-0 shadow-lg shadow-gold/20"
                >
                  {home.blogSection.viewAllText}
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post._id}
                    className="group bg-white rounded-xl overflow-hidden border-l-4 border-gold hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 flex flex-col"
                  >
                    {post.featuredImage && (
                      <Link to={`/blog/${post.slug}`} className="aspect-video overflow-hidden block">
                        <img
                          src={post.featuredImage}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <span className="inline-block w-fit px-3 py-1 bg-gold/15 text-gold text-xs font-sans font-semibold uppercase tracking-wider rounded-full mb-3">
                          {post.category}
                        </span>
                      )}
                      <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      {post.excerpt && (
                        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200/80">
                        <span className="text-xs text-gray-500 font-sans flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-sm font-sans font-semibold text-navy group-hover:text-gold inline-flex items-center gap-1"
                        >
                          Read more
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-10 sm:hidden">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy font-sans font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-gold/20"
                >
                  {home.blogSection.viewAllText}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <section
          id="awards"
          className="scroll-mt-[var(--site-header-height)] bg-[#081629] py-14 lg:py-20 border-t border-gold/20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              {/* Section Heading with Gold Ornament */}
              <div className="text-center mb-14 pt-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-px w-12 bg-gold"></div>
                  <div className="mx-3 w-2 h-2 bg-gold rotate-45"></div>
                  <div className="h-px w-12 bg-gold"></div>
                </div>
                <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                  {home.awardsHome.eyebrow}
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">{home.awardsHome.title}</h2>
                <p className="font-sans text-base lg:text-lg text-[#E6D5B8] max-w-2xl mx-auto">{home.awardsHome.subtitle}</p>
              </div>

              <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                {awards.map((a) => (
                  <div
                    key={a._id}
                    className="flex-shrink-0 w-[min(100%,320px)] md:w-auto snap-start rounded-xl bg-[#0B1F3A] border-l-4 border-gold p-5 flex gap-4 shadow-lg hover:shadow-xl hover:shadow-gold/10 transition-all"
                  >
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-gold/10 overflow-hidden flex items-center justify-center">
                      {a.imageUrl ? (
                        <img src={a.imageUrl} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <Award className="w-10 h-10 text-gold" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans text-xs font-bold text-gold uppercase tracking-wide mb-1">{a.year}</p>
                      <h3 className="font-serif text-base font-bold text-white leading-snug mb-1 line-clamp-2">{a.title}</h3>
                      <p className="font-sans text-xs text-gray-400 line-clamp-2">{a.issuingBody}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/awards"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-gold font-sans font-semibold rounded-lg hover:bg-gold hover:text-navy transition-all"
                >
                  {home.awardsHome.viewAllText}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      {/* Consultation CTA */}
      <section
        id="consultation"
        className="scroll-mt-[var(--site-header-height)] relative py-16 lg:py-24 bg-gradient-to-br from-navy via-navy/95 to-[#0a1628] overflow-hidden border-t border-white/10"
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-5">
                  {ctaConsult.eyebrow}
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {ctaConsult.title}
                </h2>
                <p className="font-sans text-lg text-gray-300 leading-relaxed">{ctaConsult.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-start gap-3 max-w-xs">
                    <Star className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="currentColor" />
                    <p className="font-sans text-sm text-gray-400">
                      Same secure process as our main contact form—your inquiry is logged for our team immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-2xl border border-white/10">
                {ctaStatus && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      ctaStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {ctaStatus.message}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleCtaSubmit}>
                  <div>
                    <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Full name *</label>
                    <input
                      name="name"
                      value={ctaForm.name}
                      onChange={handleCtaChange}
                      required
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={ctaForm.email}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={ctaForm.phone}
                        onChange={handleCtaChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Legal issue *</label>
                    <textarea
                      name="legalIssue"
                      value={ctaForm.legalIssue}
                      onChange={handleCtaChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg font-sans text-sm resize-y min-h-[100px] focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      placeholder="Briefly describe your matter"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs font-medium text-gray-700 mb-1">
                      Preferred contact time
                    </label>
                    <select
                      name="preferredContactTime"
                      value={ctaForm.preferredContactTime}
                      onChange={handleCtaChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg font-sans text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
                    >
                      <option value="">Select a preference</option>
                      <option value="Morning (9am–12pm)">Morning (9am–12pm)</option>
                      <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
                      <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
                      <option value="Any time">Any time</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingCta}
                    className="w-full px-4 py-3.5 bg-gold text-navy font-sans text-sm font-bold rounded-lg transition-all hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmittingCta
                      ? ctaConsult.submittingLabel || 'Sending…'
                      : ctaConsult.submitLabel || 'Request consultation'}
                  </button>
                </form>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
