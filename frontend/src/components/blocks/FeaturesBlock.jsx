import React from 'react';
import * as Icons from 'lucide-react';

const FeaturesBlock = ({ content }) => {
  if (!content.features || content.features.length === 0) return null;

  return (
    <section className="bg-gradient-to-br from-navy via-navy/95 to-[#0a1628] py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {content.eyebrow && (
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-xs font-sans font-bold uppercase tracking-wider rounded-full mb-6">
              {content.eyebrow}
            </span>
          )}
          {content.heading && (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              {content.heading}
            </h2>
          )}
          {content.subheading && (
            <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
              {content.subheading}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(content.features.length, 4)} gap-8`}>
          {content.features.map((feature, index) => {
            const Icon = Icons[feature.icon] || Icons.CheckCircle;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="font-sans text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBlock;
