import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, ChevronLeft, ChevronRight, Shield, Users, Award, TrendingUp, CheckCircle, Scale, FileText, Clock, Calendar } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';
import HeroCarousel from '../components/HeroCarousel';
import AnimatedStatValue from '../components/AnimatedStatValue';
import API_BASE_URL from '../config/api';
import { mergeHomeSections } from '../data/homePageContentDefaults';

const SECTION_ICONS = { Shield, Users, Award, TrendingUp, Scale, FileText, CheckCircle };

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  
  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes, pageRes, blogRes, teamRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/reviews?featured=true`),
        fetch(`${API_BASE_URL}/api/pages/home`),
        fetch(`${API_BASE_URL}/api/blog?limit=3`),
        fetch(`${API_BASE_URL}/api/team?limit=5`),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();
      const pageData = await pageRes.json();
      const blogData = await blogRes.json();
      const teamData = await teamRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data); // Load all services for dropdown
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
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
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
          message: appointmentForm.description
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const formCopy = mergeHomeSections(pageContent?.sections).consultationForm;
        setSubmitStatus({
          type: 'success',
          message: formCopy.successMessage || 'Thank you! Your appointment request has been submitted.',
        });
        // Reset form
        setAppointmentForm({
          name: '',
          email: '',
          phone: '',
          service: '',
          description: ''
        });
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Unable to submit appointment request. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
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

  const bookAppointmentAside = (
    <div
      id="book-consultation"
      className="scroll-mt-28 rounded-2xl shadow-2xl border border-white/25 bg-white/95 backdrop-blur-md max-h-[min(70vh,620px)] overflow-y-auto overscroll-contain"
    >
      <div className="p-6 lg:p-7">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/15 rounded-full mb-3">
            <Calendar className="text-gold" size={26} />
          </div>
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-navy mb-1">
            {cf.title}
          </h2>
          <p className="font-sans text-sm text-gray-600">
            {cf.subtitle}
          </p>
        </div>

        {submitStatus && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <p className="font-sans text-xs font-medium">{submitStatus.message}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAppointmentSubmit}>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Full Name *</label>
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
              placeholder={cf.placeholders?.phone || '+91 ...'}
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Legal Service *</label>
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
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Brief description</label>
            <textarea
              name="description"
              value={appointmentForm.description}
              onChange={handleAppointmentChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-sans text-sm resize-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
              placeholder={cf.placeholders?.description || 'Your legal matter (optional)'}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-lg transition-all hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? cf.submittingLabel || 'Submitting...' : cf.submitLabel || 'Book appointment'}
            {!isSubmitting && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <SEOHead 
        title={pageContent?.seo?.title || "GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates"}
        description={pageContent?.seo?.description || "Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India."}
        keywords={pageContent?.seo?.keywords || "lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law"}
      />
      
      {/* Hero + book appointment (form stays on the right on large screens) */}
      <HeroCarousel
        aside={bookAppointmentAside}
        slides={pageContent?.sections?.carousel?.slides}
        trustStrip={pageContent?.sections?.carousel?.trustStrip}
      />

      {/* Stats / Authority Strip Section */}
      <section className="bg-gradient-to-b from-navy to-[#0a1628] py-16 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2 tabular-nums">
                <AnimatedStatValue value={home.stats.casesRepresented} duration={1900} />
              </p>
              <p className="font-sans text-sm text-gray-400">
                {home.stats.casesRepresentedLabel}
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2 tabular-nums">
                <AnimatedStatValue value={home.stats.criminalMatters} duration={1900} />
              </p>
              <p className="font-sans text-sm text-gray-400">
                {home.stats.criminalMattersLabel}
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2 tabular-nums">
                <AnimatedStatValue value={home.stats.familyMatters} duration={1900} />
              </p>
              <p className="font-sans text-sm text-gray-400">
                {home.stats.familyMattersLabel}
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2 tabular-nums">
                <AnimatedStatValue value={home.stats.civilMatters} duration={1900} />
              </p>
              <p className="font-sans text-sm text-gray-400">
                {home.stats.civilMattersLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-navy via-navy/95 to-[#0a1628] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              {home.whyChoose.eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              {home.whyChoose.title}
            </h2>
            <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
              {home.whyChoose.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(home.whyChoose.cards || []).map((card, idx) => {
              const IconComp = SECTION_ICONS[card.icon] || Shield;
              return (
                <div
                  key={`${card.title}-${idx}`}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              {home.howWeWork.eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              {home.howWeWork.title}
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              {home.howWeWork.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            {(home.howWeWork.steps || []).map((step) => {
              const v = (step.variant || 'light').toLowerCase();
              const box =
                v === 'navy'
                  ? 'bg-gradient-to-br from-navy to-navy/90 rounded-xl p-8 text-white h-full'
                  : v === 'gold'
                    ? 'bg-gradient-to-br from-gold to-gold/90 rounded-xl p-8 text-navy h-full'
                    : 'bg-grey-light rounded-xl p-8 border-2 border-gray-200 h-full';
              const numCircle =
                v === 'gold'
                  ? 'w-12 h-12 bg-navy rounded-full flex items-center justify-center font-serif text-xl font-bold text-white mb-6'
                  : 'w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif text-xl font-bold text-navy mb-6';
              const titleCls = v === 'navy' ? 'text-white' : v === 'gold' ? 'text-navy' : 'text-navy';
              const bodyCls =
                v === 'navy' ? 'text-gray-300' : v === 'gold' ? 'text-navy/80' : 'text-gray-600';
              return (
                <div key={step.number + step.title} className="relative">
                  <div className={box}>
                    <div className={numCircle}>{step.number}</div>
                    <h3 className={`font-serif text-xl font-bold mb-3 ${titleCls}`}>{step.title}</h3>
                    <p className={`font-sans text-sm leading-relaxed ${bodyCls}`}>{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
              {practiceAreasSection.heading}
            </h2>
            <p className="font-sans text-base lg:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {practiceAreasSection.subheading}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, index) => (
              <div
                key={service._id || index}
                className="group bg-gray-50 rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold/30"
              >
                <ServiceCard
                  title={service.name || service.title}
                  description={service.shortDescription || service.description}
                  iconName={service.iconName}
                />
              </div>
            ))}
          </div>
          
          {/* View All CTA */}
          <div className="text-center mt-10">
            <Link to="/services">
              <button className="px-8 py-3 bg-navy text-white font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:bg-navy/90 hover:scale-105">
                {home.practiceCta?.viewAllServicesText || 'View All Services'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      {teamMembers.length > 0 && (
        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                {home.teamSection.eyebrow}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
                {home.teamSection.title}
              </h2>
              <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
                {home.teamSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Founder/First Member - Larger Card */}
              {teamMembers[0] && (
                <div className="lg:col-span-3 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-navy/5 to-gold/5 rounded-2xl p-8 border border-navy/10">
                  <div className="relative group flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold to-navy rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <img
                      src={teamMembers[0].imageUrl}
                      alt={teamMembers[0].name}
                      className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-3">
                      {home.teamSection.founderBadge}
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-navy mb-2">
                      {teamMembers[0].name}
                    </h3>
                    <p className="font-sans text-lg text-gold font-semibold mb-4">
                      {teamMembers[0].designation}
                    </p>
                    <p className="font-sans text-gray-600 leading-relaxed mb-6">
                      {teamMembers[0].bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full">
                        {home.teamSection.badgeA}
                      </span>
                      <span className="px-3 py-1 bg-navy/10 text-navy text-xs font-sans font-medium rounded-full">
                        {home.teamSection.badgeB}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Team Members */}
              {teamMembers.slice(1, 5).map((member) => (
                <div
                  key={member._id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-navy mb-1 group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-sans text-sm text-gold font-semibold mb-3">
                      {member.designation}
                    </p>
                    <p className="font-sans text-sm text-gray-600 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Know More Button */}
            <div className="text-center">
              <Link to="/team">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white font-sans text-base font-semibold rounded-lg hover:bg-navy/90 transition-all hover:scale-105 shadow-lg">
                  {home.teamSection.ctaText}
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts Section */}
      {blogPosts.length > 0 && (
        <section className="bg-grey-light py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                  {home.blogSection.eyebrow}
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
                  {home.blogSection.title}
                </h2>
                <p className="font-sans text-lg text-gray-600 max-w-2xl">
                  {home.blogSection.subtitle}
                </p>
              </div>
              <Link 
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
              >
                {home.blogSection.viewAllText}
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-sans font-semibold uppercase tracking-wider rounded-full mb-3">
                        {post.category}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
              >
                {home.blogSection.viewAllText}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-grey-light via-white to-grey-light py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-4">
              <span className="font-sans text-sm font-semibold text-gold uppercase tracking-wider bg-gold/10 px-4 py-2 rounded-full">
                {home.testimonialsIntro.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
              {testimonialsSection.heading}
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              {testimonialsSection.subheading}
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-sans text-gray-500">Loading testimonials...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="relative">
              {/* Navigation buttons */}
              {reviews.length > 2 && (
                <>
                  <button
                    onClick={() => scroll('left')}
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6 text-navy" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-100"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6 text-navy" />
                  </button>
                </>
              )}
              
              {/* Gradient overlays for scroll indication */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-grey-light to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-grey-light to-transparent z-10 pointer-events-none"></div>
              
              {/* Horizontal scrollable container */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              >
                <div className="flex gap-6 px-4 lg:px-16">
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
              
              {/* Scroll hint */}
              <div className="text-center mt-8">
                <p className="font-sans text-sm text-gray-500 flex items-center justify-center gap-2">
                  <span className="inline-block w-8 h-0.5 bg-gray-300 rounded"></span>
                  {home.testimonialsScroll.hint}
                  <span className="inline-block w-8 h-0.5 bg-gray-300 rounded"></span>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-navy via-navy/95 to-[#0a1628] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, transparent 48%, white 49%, white 51%, transparent 52%)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
                {home.ctaBand.eyebrow}
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {home.ctaBand.title}
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-8">
                {home.ctaBand.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={home.ctaBand.primaryCtaLink || '/contact'}>
                  <button type="button" className="px-8 py-4 bg-gold text-navy font-sans font-bold rounded-lg hover:brightness-110 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    {home.ctaBand.primaryCtaText}
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <a
                  href={`tel:${String(home.ctaBand.phoneDisplay || '').replace(/[^\d+]/g, '')}`}
                  className={!home.ctaBand.phoneDisplay ? 'pointer-events-none opacity-50' : ''}
                >
                  <button type="button" className="px-8 py-4 bg-white/10 text-white font-sans font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {home.ctaBand.secondaryCtaText}
                  </button>
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">{home.ctaBand.sidebarTitle}</h3>
              <div className="space-y-4">
                {(home.ctaBand.checklist || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-white mb-1">{item.title}</h4>
                      <p className="font-sans text-sm text-gray-300">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
