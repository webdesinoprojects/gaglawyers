import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBlock = ({ content }) => {
  return (
    <section className="relative bg-navy text-white py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      {content.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={content.backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/50"></div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-8">
          {content.eyebrow && (
            <p className="font-sans text-xs lg:text-sm text-gold uppercase tracking-wide font-semibold">
              {content.eyebrow}
            </p>
          )}
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {content.heading}
            {content.headingAccent && (
              <>
                <br />
                <span className="text-gold">{content.headingAccent}</span>
              </>
            )}
          </h1>
          
          {content.description && (
            <p className="font-sans text-base lg:text-lg text-gray-300 leading-relaxed max-w-[550px]">
              {content.description}
            </p>
          )}
          
          {/* CTA Buttons */}
          {(content.ctaPrimary || content.ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {content.ctaPrimary && (
                <Link to={content.ctaPrimary.url}>
                  <button className="px-6 py-3 bg-gold text-navy font-sans text-sm font-semibold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-105 flex items-center justify-center gap-2">
                    {content.ctaPrimary.text}
                    <ArrowRight size={18} />
                  </button>
                </Link>
              )}
              {content.ctaSecondary && (
                <Link to={content.ctaSecondary.url}>
                  <button className="px-6 py-3 bg-transparent text-white font-sans text-sm font-semibold rounded-md border border-white/30 transition-all duration-200 hover:bg-white/10">
                    {content.ctaSecondary.text}
                  </button>
                </Link>
              )}
            </div>
          )}
          
          {/* Trust Indicators */}
          {content.trustIndicators && content.trustIndicators.length > 0 && (
            <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-6 border-t border-white/10">
              {content.trustIndicators.map((indicator, index) => (
                <React.Fragment key={index}>
                  <div>
                    <p className="font-serif text-2xl lg:text-3xl font-bold text-white">{indicator.value}</p>
                    <p className="font-sans text-xs lg:text-sm text-gray-400 mt-1">{indicator.label}</p>
                  </div>
                  {index < content.trustIndicators.length - 1 && (
                    <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
