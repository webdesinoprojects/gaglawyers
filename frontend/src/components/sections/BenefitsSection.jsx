import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { optimizeImage } from '../../utils/imageUrl';


/**
 * Benefits Section Component
 * Content: { items: [{ icon, title, description }] }
 */
const BenefitsSection = ({ heading, content, background }) => {
  const { items = [] } = content || {};
  const imgSrc = content?.imageUrl || null;

  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#14284e] via-[#101d38] to-[#0d172d]'
    : 'bg-gradient-to-b from-white to-[#f5f8fc]';
  const headingColor = isDark ? 'text-white' : 'text-[#122b4d]';
  const cardBg = isDark ? 'bg-white/[0.07]' : 'bg-white';
  const cardBorder = isDark ? 'border-white/[0.12]' : 'border-slate-200';
  const cardTitleColor = isDark ? 'text-white' : 'text-[#122b4d]';
  const cardBodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const badgeColor = isDark
    ? 'border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#f5d98c]'
    : 'border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#7a5c10]';
  const numColor = isDark ? 'text-[#f4d98e]' : 'text-[#c9a84c]';

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 ${sectionBg}`}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-6 h-72 w-72 rounded-full bg-[#c9a84c]/20 blur-3xl" />
        <div className="absolute -left-20 bottom-6 h-56 w-56 rounded-full bg-[#0B1F3A]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section intro: image left (only if admin set one) + heading right */}
        <div className={`mb-14 grid grid-cols-1 items-center gap-10 ${imgSrc ? 'lg:grid-cols-2' : ''}`}>

          {/* Image — only rendered when admin has uploaded one */}
          {imgSrc && (
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_56px_rgba(0,0,0,0.18)]">
              <img
                src={optimizeImage(imgSrc)}
                alt={content?.imageAlt || heading || 'Legal benefits'}
                loading="lazy"
                className="w-full object-cover"
                style={{ maxHeight: '340px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c] to-[#c9a84c]/40" />
            </div>
          )}

          {/* Heading block */}
          <div className="flex flex-col justify-center">
            <div className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${badgeColor}`}>
              <ShieldCheck size={12} />
              <span>Key Benefits</span>
            </div>
            <h2 className={`mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl ${headingColor}`}>
              {heading}
            </h2>
            <div className="h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d490]" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border ${cardBorder} ${cardBg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Gold top accent line on hover */}
              <div className="absolute left-0 right-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a84c] shadow-[0_4px_14px_rgba(201,168,76,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle size={18} className="text-[#142949]" />
                </div>
                <span className={`font-sans text-xs font-bold tracking-wider ${numColor}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className={`mb-2 font-serif text-xl font-bold ${cardTitleColor}`}>
                {item.title}
              </h3>
              <p className={`font-sans text-sm leading-relaxed ${cardBodyColor}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
