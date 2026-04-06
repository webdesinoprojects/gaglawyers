import React from 'react';
import * as Icons from 'lucide-react';

const ValuesBlock = ({ content }) => {
  if (!content.values || content.values.length === 0) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          {content.heading && (
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              {content.heading}
            </h2>
          )}
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-gold/50 mx-auto rounded-full mb-6"></div>
          {content.description && (
            <p className="font-sans text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {content.description}
            </p>
          )}
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(content.values.length, 5)} gap-8`}>
          {content.values.map((value, index) => {
            const Icon = Icons[value.icon] || Icons.CheckCircle;
            return (
              <div
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-grey-light to-white rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gold/30"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/70 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesBlock;
