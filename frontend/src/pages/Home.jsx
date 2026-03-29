import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import ServiceCard from '../components/ServiceCard';
import StatCard from '../components/StatCard';
import TestimonialCard from '../components/TestimonialCard';
import SEOHead from '../components/SEOHead';

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const practiceAreasPreview = [
    {
      title: 'Corporate Law',
      description: 'Strategic counsel for mergers, acquisitions, and corporate governance.',
      iconName: 'Building2',
    },
    {
      title: 'Civil Litigation',
      description: 'Expert representation in complex civil disputes and commercial litigation.',
      iconName: 'Scale',
    },
    {
      title: 'Real Estate',
      description: 'Comprehensive legal services for property transactions and disputes.',
      iconName: 'Home',
    },
    {
      title: 'Family Law',
      description: 'Sensitive handling of matrimonial and family matters.',
      iconName: 'Users',
    },
  ];

  const testimonials = [
    {
      content: 'GAG Lawyers provided exceptional service during our corporate merger. Their attention to detail and strategic advice was invaluable.',
      author: 'Rajesh Kumar',
      designation: 'CEO, Tech Innovations Ltd',
    },
    {
      content: 'Professional, responsive, and highly knowledgeable. They handled our property dispute with remarkable expertise.',
      author: 'Priya Sharma',
      designation: 'Business Owner',
    },
    {
      content: 'The team at GAG Lawyers is simply outstanding. They guided us through a complex legal matter with clarity and confidence.',
      author: 'Amit Patel',
      designation: 'Managing Director',
    },
  ];

  useEffect(() => {
    fetchDynamicContent();
  }, []);

  const fetchDynamicContent = async () => {
    try {
      const [servicesRes, reviewsRes] = await Promise.all([
        fetch('http://localhost:5000/api/services'),
        fetch('http://localhost:5000/api/reviews?featured=true'),
      ]);

      const servicesData = await servicesRes.json();
      const reviewsData = await reviewsRes.json();

      if (servicesData.success && servicesData.data.length > 0) {
        setServices(servicesData.data.slice(0, 4));
      }

      if (reviewsData.success && reviewsData.data.length > 0) {
        setReviews(reviewsData.data);
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
    }
  };

  const displayTestimonials = reviews.length > 0 
    ? reviews.map(r => ({
        content: r.content,
        author: r.clientName,
        designation: r.designation,
      }))
    : testimonials;

  return (
    <div>
      <SEOHead 
        title="GAG Lawyers - Premier Legal Services in India | Grover & Grover Advocates"
        description="Expert legal services in corporate law, civil litigation, real estate, and family law. 25+ years of excellence serving clients across India."
        keywords="lawyers in delhi, advocates in india, corporate law firm, civil litigation, real estate lawyers, family law"
      />
      <section className="bg-navy text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Excellence in Legal
              <br />
              <span className="text-gold">Advisory & Advocacy</span>
            </h1>
            <p className="font-sans text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Grover & Grover Advocates delivers sophisticated legal solutions with integrity, precision, and unwavering commitment to your success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">
                  Our Services <ArrowRight className="inline ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 lg:py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-gray-200 gap-4 md:gap-0">
            <StatCard value="25+" label="Years Experience" />
            <StatCard value="1000+" label="Cases Won" />
            <StatCard value="Top Rated" label="Advocates" />
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              Practice Areas
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal expertise across multiple domains
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {practiceAreasPreview.map((service, index) => (
              <ServiceCard
                key={index}
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

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              Client Testimonials
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by leading businesses and individuals
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                content={testimonial.content}
                author={testimonial.author}
                designation={testimonial.designation}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
