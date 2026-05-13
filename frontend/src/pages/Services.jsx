import React, { useEffect, useState, useMemo, useRef } from 'react';
import { 
  ArrowRight, 
  Scale, 
  Sparkles, 
  Search,
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  Users,
  Clock,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import FAQItem from '../components/FAQItem';
import API_BASE_URL from '../config/api';

const FALLBACK_CARD_IMAGE =
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isFeaturedCarouselPaused, setIsFeaturedCarouselPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const featuredTrackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const mapped = data.data.map((service) => ({
            id: service._id,
            title: service.name || 'Service',
            slug: service.slug,
            summary:
              service.shortDescription ||
              service.seo?.metaDescription ||
              'Strategic legal representation tailored to your specific matter.',
            cardImageUrl: service.cardImageUrl || '',
            cardImageAlt: service.cardImageAlt || service.name || 'Legal service',
            isFeatured: Boolean(
              service.servicesPageSettings?.isFeatured ||
              service.isFeatured ||
              service.featured
            ),
            featuredOrder: Number(service.servicesPageSettings?.displayOrder || 0),
          }));
          setServices(mapped);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchTerm) return services;
    return services.filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const featuredServices = useMemo(() => {
    const explicitFeatured = services
      .filter((service) => service.isFeatured)
      .sort((a, b) => a.featuredOrder - b.featuredOrder || a.title.localeCompare(b.title));
    if (explicitFeatured.length > 0) {
      return explicitFeatured.slice(0, 5);
    }
    return services.slice(0, 5);
  }, [services]);

  const marqueeFeaturedServices = useMemo(() => {
    if (featuredServices.length <= 1) return featuredServices;
    return [...featuredServices, ...featuredServices];
  }, [featuredServices]);

  const faqs = [
    {
      question: 'How quickly can I get a consultation?',
      answer:
        'Most consultations are scheduled within 24-48 hours based on advocate availability and matter urgency.',
    },
    {
      question: 'Do you handle matters outside Delhi?',
      answer:
        'Yes. We regularly assist clients across India and coordinate filings/representation in appropriate forums.',
    },
    {
      question: 'Can your team assist with urgent interim relief?',
      answer:
        'Yes. We assess urgency, identify the right forum, and prepare immediate filing strategy where timelines are critical.',
    },
    {
      question: 'How do you structure professional fees?',
      answer:
        'Fees depend on matter type, stage, and complexity. We share a clear scope and fee structure before engagement.',
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full border-4 border-amber-400 opacity-20" />
        </div>
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <p className="font-sans text-xl text-white">No active services available right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 overflow-hidden">
      <SEOHead
        title="Legal Services - 25+ Practice Areas | GAG Lawyers"
        description="Expert legal services across 25+ practice areas including corporate law, criminal defense, civil litigation, family law, real estate, and intellectual property. Trusted advocates in Delhi and across India."
        keywords="legal services delhi, advocates, litigation, legal consultation, law firm practice areas, corporate law, criminal defense, family law"
        canonical="https://gaglawyers.com/services"
      />

      {/* HERO SECTION WITH PARALLAX */}
      <section className="relative min-h-[85vh] flex items-start justify-center overflow-hidden pt-8 pb-20 md:pt-10 md:pb-24">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-slate-900/35 backdrop-blur-md px-5 py-2.5 mb-6 md:mb-8 shadow-[0_8px_30px_rgba(2,6,23,0.35)] animate-fade-in">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-amber-400 animate-pulse" />
            <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-amber-300">
              {services.length}+ Practice Areas
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.05] animate-slide-up">
            Legal Excellence
            <span className="block mt-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-gradient">
              Redefined
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto font-sans text-lg md:text-xl text-slate-300 leading-relaxed animate-slide-up delay-100">
            Navigate complex legal challenges with confidence. Our expert team delivers strategic solutions across diverse practice areas.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up delay-200">
            <Link
              to="/contact"
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <button
              onClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto animate-slide-up delay-300">
            {[
              { icon: Award, label: 'Years Experience', value: '25+' },
              { icon: Users, label: 'Happy Clients', value: '1000+' },
              { icon: TrendingUp, label: 'Success Rate', value: '95%' },
              { icon: Scale, label: 'Practice Areas', value: services.length },
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER SECTION */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all duration-300 bg-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">
                {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'}
              </span>
              <div className="h-6 w-px bg-slate-300" />
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                <Clock className="h-4 w-4" />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services-grid" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Practice Areas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-amber-400 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.cardImageUrl || FALLBACK_CARD_IMAGE}
                      alt={service.cardImageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Quick Action Button */}
                    <Link
                      to={`/${service.slug}`}
                      className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full font-semibold text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white flex items-center justify-center gap-2"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {service.title}
                      </h3>
                      <Zap className="h-6 w-6 text-amber-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <p className="font-sans text-slate-600 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        Expert Team
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        <Star className="h-3 w-3" />
                        Proven Results
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                      <Link
                        to={`/${service.slug}`}
                        className="flex-1 text-center px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors duration-300"
                      >
                        Learn More
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 text-center px-4 py-2 bg-amber-500 text-slate-900 rounded-xl font-medium hover:bg-amber-600 transition-colors duration-300"
                      >
                        Consult
                      </Link>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 blur-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No services found</h3>
              <p className="text-slate-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED SERVICES CAROUSEL */}
      {featuredServices.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-semibold">
                <Star className="h-4 w-4" />
                Featured Services
              </div>
            </div>

            <div className="overflow-hidden pb-2">
              <div
                ref={featuredTrackRef}
                className={`featured-services-track flex gap-5 w-max ${
                  isFeaturedCarouselPaused ? 'featured-services-track-paused' : ''
                }`}
              >
              {marqueeFeaturedServices.map((service, index) => (
                <article
                  key={`${service.id}-${index}`}
                  className="group relative min-w-[76vw] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[300px] max-w-[76vw] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[300px] bg-white/10 border border-white/15 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl flex flex-col h-[420px] sm:h-[430px] transition-transform duration-300 hover:scale-[1.03]"
                  onMouseEnter={() => {
                    setIsFeaturedCarouselPaused(true);
                  }}
                  onFocus={() => {
                    setIsFeaturedCarouselPaused(true);
                  }}
                  onMouseLeave={() => {
                    setIsFeaturedCarouselPaused(false);
                  }}
                  onBlur={() => {
                    setIsFeaturedCarouselPaused(false);
                  }}
                  onTouchStart={() => {
                    setIsFeaturedCarouselPaused(true);
                  }}
                  onTouchEnd={() => {
                    setIsFeaturedCarouselPaused(false);
                  }}
                >
                  <img
                    src={service.cardImageUrl || FALLBACK_CARD_IMAGE}
                    alt={service.cardImageAlt}
                    className="h-36 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-semibold leading-tight line-clamp-2 mb-2 min-h-[3.5rem]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-4">
                      {service.summary}
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-4">
                      <Link
                        to={`/${service.slug}`}
                        className="inline-flex items-center gap-2 text-amber-300 font-semibold hover:text-amber-200 transition-colors duration-300"
                      >
                        View Service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-amber-200 transition-colors"
                      >
                        Talk to Lawyer
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the difference of working with dedicated legal professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: 'Expert Legal Team',
                description: 'Seasoned professionals with decades of combined experience across multiple practice areas.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: TrendingUp,
                title: 'Proven Success',
                description: 'Track record of favorable outcomes and satisfied clients across diverse legal matters.',
                color: 'from-amber-500 to-amber-600',
              },
              {
                icon: Users,
                title: 'Client-Centric',
                description: 'Personalized attention and strategic guidance tailored to your specific situation.',
                color: 'from-green-500 to-green-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Quick answers to help you get started
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm font-semibold mb-8">
            <Sparkles className="h-4 w-4" />
            Ready to Get Started?
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Discuss Your Legal Needs
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Schedule a consultation with our expert team and take the first step toward resolving your legal matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 text-lg"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Consultation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/team"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-lg"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .featured-services-track {
          animation: featured-services-marquee 26s linear infinite;
          will-change: transform;
        }

        .featured-services-track-paused {
          animation-play-state: paused;
        }

        @keyframes featured-services-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .featured-services-track {
            animation-duration: 20s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-services-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
