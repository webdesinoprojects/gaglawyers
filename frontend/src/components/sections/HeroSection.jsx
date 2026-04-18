import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Hero Section Component
 * Content: { subheading, ctaText, ctaLink, backgroundImageUrl }
 */
const HeroSection = ({ heading, content, background }) => {
  const { subheading, description, ctaText, ctaLink, backgroundImageUrl } = content || {};

  const bgStyle = backgroundImageUrl
    ? {
        backgroundImage: `linear-gradient(130deg, rgba(11, 20, 42, 0.88), rgba(22, 43, 77, 0.82) 55%, rgba(33, 63, 110, 0.76)), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#0f1f3f] via-[#162f58] to-[#224170] py-20 text-white md:py-28"
      style={bgStyle}
    >
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-14 h-60 w-60 rounded-full bg-[#c9a84c]/30 blur-3xl animate-pulse" />
        <div className="absolute -right-10 bottom-6 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl animate-pulse" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="relative max-w-5xl rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-12">
          {subheading && (
            <div className="mb-6 inline-flex items-center rounded-full border border-[#e4c56f]/40 bg-[#c9a84c]/15 px-4 py-2 font-sans text-sm font-semibold tracking-wide text-[#f7dd93]">
              {subheading}
            </div>
          )}
          <h1 className="mb-5 max-w-4xl font-serif text-3xl font-bold leading-tight text-white md:text-6xl md:leading-[1.1]">
            {heading}
          </h1>
          {description && (
            <p className="max-w-2xl font-sans text-sm text-slate-200/90 md:text-base">
              {description}
            </p>
          )}

          {ctaText && ctaLink && (
            <div className="mt-10">
              <a
                href={ctaLink}
                className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#c9a84c] px-8 py-4 font-sans text-base font-bold text-[#132748] shadow-[0_12px_24px_rgba(201,168,76,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d5b862]"
              >
                {ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
