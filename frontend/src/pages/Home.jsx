import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import StatCard from '../components/StatCard';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';
import API_BASE_URL from '../config/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes, pageRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/reviews?featured=true`),
        fetch(`${API_BASE_URL}/api/pages/home`),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();
      const pageData = await pageRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data.slice(0, 4));
      }

      if (reviewsData.success && reviewsData.data.length > 0) {
        setReviews(reviewsData.data);
      }

      if (pageData.success) {
        setPageContent(pageData.data);
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
      <section className="bg-navy text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {hero.heading}
            </h1>
            <p className="font-sans text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {hero.subheading}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  {hero.ctaPrimary}
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">
                  {hero.ctaSecondary} <ArrowRight className="inline ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
              Glance Of Our Experience
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-gray-200">
            <StatCard value={stats.casesRepresented} label="Cases Represented" />
            <StatCard value={stats.criminalMatters} label="Criminal Matters" />
            <StatCard value={stats.familyMatters} label="Family Dispute Matters" />
            <StatCard value={stats.civilMatters} label="Civil Matters" />
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              {practiceAreasSection.heading}
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              {practiceAreasSection.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id || index}
                title={service.title}
                description={service.description}
                iconName={service.iconName}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="primary" size="md">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-grey-light via-white to-grey-light py-20 lg:py-28 relative overflow-hidden">
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
    </div>
  );
};

export default Home;
