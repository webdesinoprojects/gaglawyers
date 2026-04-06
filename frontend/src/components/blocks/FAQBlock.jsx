import React from 'react';
import FAQItem from '../FAQItem';
import { Link } from 'react-router-dom';

const FAQBlock = ({ content }) => {
  if (!content.faqs || content.faqs.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {content.heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-4">
              {content.heading}
            </h2>
          )}
          {content.subheading && (
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {content.faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {/* Still Have Questions */}
        {content.showCTA !== false && (
          <div className="mt-16 p-8 lg:p-12 bg-gradient-to-r from-navy/10 to-gold/10 rounded-lg border-l-4 border-gold text-center">
            <h3 className="font-serif text-2xl font-bold text-navy mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-gray-700 mb-6 max-w-xl mx-auto">
              Our legal experts are ready to help. Get a personalized consultation for your specific situation.
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all duration-200 hover:shadow-lg">
                Get Free Consultation
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQBlock;
