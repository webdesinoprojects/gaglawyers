import React from 'react';

/**
 * CTA Banner Section Component
 * Content: { body, buttonText, buttonLink }
 */
const CTABannerSection = ({ heading, content, background }) => {
  const { body, buttonText, buttonLink } = content || {};

  return (
    <section className="bg-gradient-to-br from-[#1a2744] to-[#1a2744]/90 py-12">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 md:px-8">
        <h2 className="mb-4 font-serif text-3xl font-bold text-white">
          {heading}
        </h2>
        {body && (
          <p className="mb-8 font-sans text-lg text-white/90">
            {body}
          </p>
        )}
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#c9a84c] px-8 py-4 font-sans text-base font-bold text-[#1a2744] shadow-lg transition-all hover:bg-[#b89840] hover:shadow-xl"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default CTABannerSection;
