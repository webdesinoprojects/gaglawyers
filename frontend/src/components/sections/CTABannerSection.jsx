import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CTA Banner Section Component
 * Content: { body, buttonText, buttonLink }
 */
const CTABannerSection = ({ heading, content }) => {
  const { body, buttonText, buttonLink } = content || {};

  return (
    <section className="relative overflow-hidden py-24">
      {/* Dark navy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#112240] to-[#0d1a32]" />

      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Decorative gold blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#c9a84c]/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#c9a84c]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        {/* Inner card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#c9a84c]/20 bg-white/[0.05] p-10 text-center shadow-[0_28px_72px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-16">

          {/* Gold top accent line */}
          <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

          {/* Scale icon badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-5 py-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#f5d98c]">
            <span>⚖</span>
            <span>Get Legal Help Today</span>
          </div>

          <h2 className="mb-5 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
            {heading}
          </h2>

          {/* Gold divider */}
          <div className="mx-auto mb-6 h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c] to-[#c9a84c]/40" />

          {body && (
            <p className="mx-auto mb-9 max-w-xl font-sans text-base leading-relaxed text-white/75">
              {body}
            </p>
          )}

          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#c9a84c] px-10 py-4 font-sans text-base font-bold text-[#1a2744] shadow-[0_12px_32px_rgba(201,168,76,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d5b862] hover:shadow-[0_18px_40px_rgba(201,168,76,0.52)]"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          )}

          {/* Gold bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
