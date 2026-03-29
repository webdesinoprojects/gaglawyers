import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import FAQItem from '../components/FAQItem';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 'corporate',
      title: 'Corporate Law',
      iconName: 'Building2',
      description: 'Our corporate law practice provides comprehensive legal counsel to businesses of all sizes, from startups to established enterprises. We guide clients through complex regulatory landscapes, ensuring compliance and strategic growth.',
      details: [
        'Mergers & Acquisitions',
        'Corporate Governance',
        'Joint Ventures & Partnerships',
        'Company Formation & Structuring',
        'Securities & Capital Markets',
        'Contract Drafting & Review',
      ],
    },
    {
      id: 'civil',
      title: 'Civil Litigation',
      iconName: 'Scale',
      description: 'With decades of courtroom experience, our litigation team handles complex civil disputes with strategic precision. We represent clients in trial courts, high courts, and the Supreme Court.',
      details: [
        'Commercial Disputes',
        'Contract Disputes',
        'Tort Claims',
        'Injunctions & Interim Relief',
        'Appellate Litigation',
        'Alternative Dispute Resolution',
      ],
    },
    {
      id: 'realestate',
      title: 'Real Estate Law',
      iconName: 'Home',
      description: 'Our real estate practice covers the full spectrum of property matters, from high-value transactions to complex disputes. We ensure your interests are protected at every stage.',
      details: [
        'Property Transactions',
        'Title Verification & Due Diligence',
        'Land Acquisition',
        'Property Disputes',
        'Real Estate Financing',
        'Landlord-Tenant Matters',
      ],
    },
    {
      id: 'family',
      title: 'Family Law',
      iconName: 'Users',
      description: 'We handle sensitive family matters with empathy and discretion, providing compassionate legal support during challenging times while protecting your rights and interests.',
      details: [
        'Divorce & Separation',
        'Child Custody & Support',
        'Matrimonial Disputes',
        'Adoption',
        'Domestic Violence Protection',
        'Prenuptial Agreements',
      ],
    },
    {
      id: 'criminal',
      title: 'Criminal Defense',
      iconName: 'Shield',
      description: 'Our criminal defense team provides vigorous representation for clients facing criminal charges. We protect your rights and fight for the best possible outcome.',
      details: [
        'White Collar Crimes',
        'Economic Offenses',
        'Bail Applications',
        'Trial Defense',
        'Appeals & Revisions',
        'Anticipatory Bail',
      ],
    },
    {
      id: 'ip',
      title: 'Intellectual Property',
      iconName: 'Lightbulb',
      description: 'Protect your innovations and creative works with our comprehensive IP legal services. We help secure and defend your intellectual property rights.',
      details: [
        'Trademark Registration & Protection',
        'Copyright & Patents',
        'IP Licensing',
        'Infringement Actions',
        'Trade Secrets',
        'Domain Disputes',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I schedule an initial consultation?',
      answer: 'You can schedule a consultation by filling out the contact form on our Contact page, calling us directly, or sending an email to contact@gaglawyers.com. Initial consultations are typically scheduled within 48 hours.',
    },
    {
      question: 'What are your fees and billing practices?',
      answer: 'Our fee structure varies depending on the nature and complexity of the case. We offer transparent pricing with options for hourly billing, fixed fees, or retainer arrangements. Detailed fee information is provided during the initial consultation.',
    },
    {
      question: 'Do you handle cases outside of Delhi?',
      answer: 'Yes, our team regularly represents clients across India. We have appeared in various High Courts and the Supreme Court of India, and we work with local counsel when necessary.',
    },
    {
      question: 'How long does a typical case take?',
      answer: 'Case timelines vary significantly based on the type of matter, complexity, and court schedules. During consultation, we provide realistic timelines based on similar cases and current court conditions.',
    },
    {
      question: 'Can I get legal advice online?',
      answer: 'Yes, we offer remote consultations via video conference for your convenience. However, certain matters may require in-person meetings depending on the nature of the case.',
    },
  ];

  const IconComponent = Icons[services[activeService].iconName] || Icons.Briefcase;

  return (
    <div>
      <SEOHead 
        title="Legal Services - GAG Lawyers | Expert Legal Solutions"
        description="Comprehensive legal services in corporate law, civil litigation, real estate, family law, criminal defense, and intellectual property."
        keywords="legal services, corporate lawyers, civil litigation, real estate law, family law, criminal defense, ip lawyers"
      />
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Practice Areas
          </h1>
          <p className="font-sans text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive legal solutions across diverse practice areas
          </p>
        </div>
      </section>

      <section className="bg-grey-light py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <aside className="lg:col-span-3">
              <div className="bg-white rounded-sm shadow-sm p-4 lg:sticky lg:top-28">
                <nav className="space-y-1">
                  {services.map((service, index) => {
                    const NavIcon = Icons[service.iconName] || Icons.Briefcase;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setActiveService(index)}
                        className={`w-full text-left px-4 py-3 rounded-sm transition-all duration-200 flex items-center space-x-3 ${
                          activeService === index
                            ? 'bg-navy text-white'
                            : 'text-gray-700 hover:bg-grey-light'
                        }`}
                      >
                        <NavIcon size={20} strokeWidth={1.5} />
                        <span className="font-sans text-sm font-medium">
                          {service.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <main className="lg:col-span-9">
              <div className="bg-white rounded-sm shadow-sm p-8 lg:p-12 space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-navy/5">
                    <IconComponent className="w-8 h-8 text-navy" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
                    {services[activeService].title}
                  </h2>
                </div>

                <p className="font-sans text-lg text-gray-700 leading-relaxed">
                  {services[activeService].description}
                </p>

                <div>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
                    Our Services Include
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services[activeService].details.map((detail, index) => (
                      <li
                        key={index}
                        className="font-sans text-gray-700 flex items-start space-x-2"
                      >
                        <span className="text-gold mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Consult a Lawyer
                    </Button>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-lg text-gray-600">
              Common questions about our services and processes
            </p>
          </div>
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
