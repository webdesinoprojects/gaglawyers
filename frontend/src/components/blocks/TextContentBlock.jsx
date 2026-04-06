import React from 'react';

const TextContentBlock = ({ content }) => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {content.heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              {content.heading}
            </h2>
          )}
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
          {content.subheading && (
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>
        {content.areas && content.areas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.areas.map((area, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-grey-light to-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-gold rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-navy mb-4">
                      {area.title}
                    </h3>
                    <p className="font-sans text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TextContentBlock;
