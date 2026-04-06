import React from 'react';

const ProcessStepsBlock = ({ content }) => {
  if (!content.steps || content.steps.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {content.eyebrow && (
            <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              {content.eyebrow}
            </span>
          )}
          {content.heading && (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4">
              {content.heading}
            </h2>
          )}
          {content.subheading && (
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(content.steps.length, 4)} gap-8 relative`}>
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

          {content.steps.map((step, index) => {
            const styleClasses = {
              navy: 'bg-gradient-to-br from-navy to-navy/90 text-white',
              light: 'bg-grey-light border-2 border-gray-200',
              gold: 'bg-gradient-to-br from-gold to-gold/90 text-navy',
            };

            const numberClasses = {
              navy: 'bg-gold text-navy',
              light: 'bg-gold text-navy',
              gold: 'bg-navy text-white',
            };

            return (
              <div key={index} className="relative">
                <div className={`${styleClasses[step.style] || styleClasses.light} rounded-xl p-8 h-full`}>
                  <div className={`w-12 h-12 ${numberClasses[step.style] || numberClasses.light} rounded-full flex items-center justify-center font-serif text-xl font-bold mb-6`}>
                    {step.number}
                  </div>
                  <h3 className={`font-serif text-xl font-bold mb-3 ${step.style === 'light' ? 'text-navy' : ''}`}>
                    {step.title}
                  </h3>
                  <p className={`font-sans text-sm leading-relaxed ${step.style === 'light' ? 'text-gray-600' : step.style === 'gold' ? 'text-navy/80' : 'text-gray-300'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsBlock;
