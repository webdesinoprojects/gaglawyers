import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, ChevronLeft, ChevronRight, Shield, Users, Award, TrendingUp, CheckCircle, Scale, FileText, Clock, Calendar } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes, pageRes, blogRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/reviews?featured=true`),
        fetch(`${API_BASE_URL}/api/pages/home`),
        fetch(`${API_BASE_URL}/api/blog?limit=3`),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();
      const pageData = await pageRes.json();
      const blogData = await blogRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data.slice(0, 4)); // Only first 4 for homepage
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

  const hero = pageContent?.sections?.hero || {
    heading: 'Excellence in Legal Advisory & Advocacy',
    subheading: 'Grover & Grover Advocates delivers sophisticated legal solutions with integrity, precision, and unwavering commitment to your success.',
    ctaPrimary: 'Schedule Consultation',
    ctaSecondary: 'Our Services',
  };

  const stats = pageContent?.sections?.stats || {
    casesRepresented: '5000+',
    criminalMatters: '700+',
    familyMatters: '500+',
    civilMatters: '900+',
  };

  const practiceAreasSection = pageContent?.sections?.practiceAreas || {
    heading: 'Practice Areas',
    subheading: 'Comprehensive legal expertise across multiple domains',
  };

  const testimonialsSection = pageContent?.sections?.testimonials || {
    heading: 'What Our Clients Say',
    subheading: 'Trusted by leading businesses and individuals across India',
  };

  return (
    <div>
      <SEOHead 
        title={pageContent?.seo?.title || "GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates"}
        description={pageContent?.seo?.description || "Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India."}
        keywords={pageContent?.seo?.keywords || "lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law"}
      />
      <section className="bg-navy text-white py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <p className="font-sans text-xs lg:text-sm text-gold uppercase tracking-wide font-semibold">
                GROVER & GROVER ADVOCATES
              </p>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Precision in Law.<br />
                <span className="text-gold">Excellence in Practice.</span>
              </h1>
              
              <p className="font-sans text-base lg:text-lg text-gray-300 leading-relaxed max-w-[550px]">
                India's premier law firm delivering strategic legal counsel across
                corporate, litigation, and regulatory matters for over two decades.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/contact">
                  <button className="px-6 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 flex items-center justify-center gap-2">
                    Schedule a Consultation
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link to="/services">
                  <button className="px-6 py-3 bg-transparent text-white font-sans text-sm font-semibold rounded-md border border-white/30 transition-all duration-200 hover:bg-white/10">
                    Our Practice Areas
                  </button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-6 border-t border-white/10">
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-bold text-white">20+</p>
                  <p className="font-sans text-xs lg:text-sm text-gray-400 mt-1">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-bold text-white">5000+</p>
                  <p className="font-sans text-xs lg:text-sm text-gray-400 mt-1">Cases Won</p>
                </div>
                <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                <div>
                  <p className="font-serif text-2xl lg:text-3xl font-bold text-white">98%</p>
                  <p className="font-sans text-xs lg:text-sm text-gray-400 mt-1">Success Rate</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative h-[400px] lg:h-[500px] order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-navy/50 rounded-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                alt="Professional legal consultation"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Authority Strip Section */}
      <section className="bg-gradient-to-b from-navy to-[#0a1628] py-16 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2">
                {stats.casesRepresented}
              </p>
              <p className="font-sans text-sm text-gray-400">
                Cases Represented
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2">
                {stats.criminalMatters}
              </p>
              <p className="font-sans text-sm text-gray-400">
                Criminal Matters
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2">
                {stats.familyMatters}
              </p>
              <p className="font-sans text-sm text-gray-400">
                Family Dispute Matters
              </p>
            </div>
            
            <div className="text-center border-l border-white/10">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2">
                {stats.civilMatters}
              </p>
              <p className="font-sans text-sm text-gray-400">
                Civil Matters
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
              Why GAG Lawyers
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              Your Trusted Legal Partner
            </h2>
            <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
              We combine decades of experience with innovative legal strategies to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Proven Track Record</h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                Over 5000+ successful cases with a 98% success rate across diverse legal matters
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Expert Team</h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                Highly qualified advocates with specialized expertise in multiple practice areas
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Client-Focused</h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                Personalized attention and tailored legal strategies for every client's unique needs
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Results-Driven</h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                Strategic approach focused on achieving the best possible outcomes for our clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              Our Process
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              How We Work With You
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              A transparent, systematic approach to delivering exceptional legal services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            <div className="relative">
              <div className="bg-gradient-to-br from-navy to-navy/90 rounded-xl p-8 text-white h-full">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif text-xl font-bold text-navy mb-6">
                  1
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Initial Consultation</h3>
                <p className="font-sans text-sm text-gray-300 leading-relaxed">
                  We listen to your concerns and understand your legal needs in detail
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-grey-light rounded-xl p-8 border-2 border-gray-200 h-full">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif text-xl font-bold text-navy mb-6">
                  2
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Case Analysis</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Thorough review of your case with detailed legal research and strategy development
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-grey-light rounded-xl p-8 border-2 border-gray-200 h-full">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-serif text-xl font-bold text-navy mb-6">
                  3
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3">Action Plan</h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  Clear roadmap with timelines, milestones, and transparent cost structure
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gold to-gold/90 rounded-xl p-8 text-navy h-full">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center font-serif text-xl font-bold text-white mb-6">
                  4
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Execution & Results</h3>
                <p className="font-sans text-sm text-navy/80 leading-relaxed">
                  Dedicated representation with regular updates until successful resolution
                </p>
              </div>
            </div>
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
          
          {/* Practice Areas Grid - Only 4 Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
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
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      {blogPosts.length > 0 && (
        <section className="bg-grey-light py-20 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-4">
                  Legal Insights
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
                  Latest from Our Blog
                </h2>
                <p className="font-sans text-lg text-gray-600 max-w-2xl">
                  Stay informed with expert legal insights, case studies, and industry updates
                </p>
              </div>
              <Link 
                to="/blog"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-sans font-semibold rounded-lg hover:bg-navy/90 transition-all"
              >
                View All Articles
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
                View All Articles
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
                Client Success Stories
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
                  Scroll horizontally to see more
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
                Get Started Today
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Discuss Your Legal Matter?
              </h2>
              <p className="font-sans text-lg text-gray-300 leading-relaxed mb-8">
                Our experienced legal team is here to provide you with expert guidance and representation. Schedule a consultation to discuss your case and explore your legal options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <button className="px-8 py-4 bg-gold text-navy font-sans font-bold rounded-lg hover:brightness-110 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    Schedule Consultation
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <a href="tel:+919876543210">
                  <button className="px-8 py-4 bg-white/10 text-white font-sans font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </button>
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">What to Expect</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1">Free Initial Consultation</h4>
                    <p className="font-sans text-sm text-gray-300">Discuss your case with no obligation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1">Expert Legal Advice</h4>
                    <p className="font-sans text-sm text-gray-300">Get clarity on your legal options</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1">Transparent Pricing</h4>
                    <p className="font-sans text-sm text-gray-300">Clear fee structure with no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-white mb-1">Dedicated Support</h4>
                    <p className="font-sans text-sm text-gray-300">Regular updates throughout your case</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
