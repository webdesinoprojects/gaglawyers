import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQItem from '../components/FAQItem';
import API_BASE_URL from '../config/api';

const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const foundService = data.data.find(s => s.slug === slug);
          
          if (foundService) {
            setService(foundService);
            
            // Get related services from same category
            const related = data.data
              .filter(s => s.category === foundService.category && s.slug !== slug)
              .slice(0, 3);
            setRelatedServices(related);
          } else {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug, navigate]);

  if (loading || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-12 h-12 border-4 border-navy border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const seoTitle = `${service.name} - Expert Legal Services | Grover & Grover Advocates`;
  const seoDescription = service.longDescription;
  const seoKeywords = `${service.name}, legal services, ${service.category}, advocates, lawyers`;

  // FAQ data for the service
  const faqs = [
    {
      question: `How can I schedule a ${service.name.toLowerCase()} consultation?`,
      answer: `You can schedule a consultation by visiting our contact page, calling our office, or clicking the button below. We typically respond within 24 hours. Our experienced ${service.name.toLowerCase()} lawyers will discuss your specific situation and provide expert guidance.`
    },
    {
      question: `What are your consultation fees for ${service.category} cases?`,
      answer: `Our consultation fees vary based on the complexity of your case. Contact us for a formal quote, or enjoy your first consultation free. We believe in transparent pricing and will discuss all costs upfront before proceeding.`
    },
    {
      question: `How experienced is your team in ${service.name.toLowerCase()}?`,
      answer: `Our team has over 20+ years of combined experience in ${service.category} law, with a proven track record of successful cases and satisfied clients. We stay updated with the latest legal developments to ensure the best representation.`
    },
    {
      question: `What is your success rate in ${service.name.toLowerCase()} cases?`,
      answer: `We maintain a 98% success rate in our cases. Our commitment to thorough preparation, legal excellence, and understanding client needs drives these exceptional results.`
    },
    {
      question: `How long does a typical ${service.name.toLowerCase()} case take?`,
      answer: `The duration varies depending on case complexity, court schedules, and specific circumstances. During your consultation, our lawyers will provide a realistic timeline and explain the process at each stage.`
    }
  ];

  return (
    <div>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
      />

      {/* HERO SECTION */}
      <section className="bg-navy text-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-300">
              <Link to="/" className="hover:text-gold transition">Home</Link>
              <ChevronRight size={16} />
              <Link to="/services" className="hover:text-gold transition">Services</Link>
              <ChevronRight size={16} />
              <span className="text-gold">{service.name}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {service.name}
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {service.shortDescription}
            </p>

            <Link to={`/${service.slug}/delhi`}>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105">
                Find Lawyer Near You
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-8">
              Overview
            </h2>
            <p className="font-sans text-lg text-gray-700 leading-relaxed mb-8">
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* TYPES OF CASES SECTION */}
      {service.typesOfCases && service.typesOfCases.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              Types of Cases We Handle
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.typesOfCases.map((caseType, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-navy">
                      {caseType}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEGAL PROCESS SECTION */}
      {service.process && service.process.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              Our Legal Process
            </h2>
            
            <div className="space-y-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold text-navy font-serif font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-xl font-bold text-navy mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-gray-700">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US SECTION */}
      {service.keyPoints && service.keyPoints.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-12">
              Why Choose Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.keyPoints.map((point, idx) => (
                <div key={idx} className="flex gap-4">
                  <Check className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <p className="font-sans text-lg text-gray-700">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION - Improved Layout */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our {service.name.toLowerCase()} services
            </p>
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="max-w-3xl mx-auto p-8 lg:p-12 bg-gradient-to-r from-navy/10 to-gold/10 rounded-lg border-l-4 border-gold text-center">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-gray-700 mb-6">
              Our legal experts are ready to provide personalized guidance for your specific situation.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all duration-200 hover:shadow-lg">
                Schedule Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-navy to-navy/80 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-sans text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our {service.name} experts today. We're here to help you navigate legal complexities with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-gold text-navy font-sans font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 flex items-center justify-center gap-2">
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
            </Link>
            <Link to={`/${service.slug}/delhi`}>
              <button className="px-8 py-4 bg-transparent text-white font-sans font-semibold rounded-md border-2 border-white/30 transition-all duration-200 hover:bg-white/10">
                Find Lawyer Near You
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES SECTION */}
      {relatedServices.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-12">
              Related Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  to={`/services/${relatedService.slug}`}
                  className="group"
                >
                  <div className="h-full bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/50 hover:-translate-y-1">
                    <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition">
                      {relatedService.name}
                    </h3>
                    <p className="font-sans text-gray-600 mb-4 text-sm">
                      {relatedService.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-gold font-semibold text-sm">
                      Learn More
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePage;
