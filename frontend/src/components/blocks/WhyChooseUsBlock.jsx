import React from 'react';
import { CheckCircle } from 'lucide-react';

const WhyChooseUsBlock = ({ content }) => {
  if (!content.reasons || content.reasons.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {content.heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              {content.heading}
            </h2>
          )}
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {content.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-grey-light to-white rounded-xl border-l-4 border-gold hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <p className="font-sans text-gray-700 leading-relaxed">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsBlock;
