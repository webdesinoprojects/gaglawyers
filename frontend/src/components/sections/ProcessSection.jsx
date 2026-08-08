import React from 'react';
import { ClipboardList } from 'lucide-react';
import { optimizeImage } from '../../utils/imageUrl';


/**
 * Process Section Component
 * Content: { steps: [{ stepNumber, title, description }] }
 */
const ProcessSection = ({ heading, content, background }) => {
  const { steps = [] } = content || {};
  const imgSrc = content?.imageUrl || null;

  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-b from-[#0f1d39] to-[#172b50]'
    : 'bg-gradient-to-br from-[#f5f8fc] to-white';
  const headingColor = isDark ? 'text-white' : 'text-[#152f54]';
  const cardBg = isDark ? 'bg-white/[0.07]' : 'bg-white';
  const cardBorder = isDark ? 'border-white/[0.12]' : 'border-slate-200';
  const cardTitleColor = isDark ? 'text-white' : 'text-[#152f54]';
  const cardBodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const connectorColor = isDark ? 'border-[#c9a84c]/25' : 'border-slate-200';
  const badgeColor = isDark
    ? 'border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#f5d98c]'
    : 'border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#7a5c10]';

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 ${sectionBg}`}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-[#c9a84c]/18 blur-3xl" />
        <div className="absolute right-0 top-8 h-48 w-48 rounded-full bg-[#0B1F3A]/8 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className={`grid grid-cols-1 items-start gap-12 ${imgSrc ? 'lg:grid-cols-2' : ''}`}>

          {/* Left: header + steps */}
          <div>
            {/* Badge */}
            <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${badgeColor}`}>
              <ClipboardList size={12} />
              <span>Our Process</span>
            </div>

            <h2 className={`mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl ${headingColor}`}>
              {heading}
            </h2>

            <div className="mb-9 h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d490]" />

            {/* Steps */}
            <div className="space-y-5">
              {steps.map((step, index) => (
                <div key={index} className="group relative flex gap-4">
                  {/* Connector line between steps */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-6 top-14 h-[calc(100%-4px)] w-px border-l-2 border-dashed ${connectorColor}`}
                    />
                  )}

                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_4px_18px_rgba(201,168,76,0.38)] transition-transform duration-300 group-hover:scale-105">
                      <span className="font-sans text-base font-bold text-[#1a2744]">
                        {step.stepNumber || index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Step card */}
                  <div className={`mb-5 flex-1 rounded-2xl border ${cardBorder} ${cardBg} p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg`}>
                    <h3 className={`mb-1.5 font-serif text-xl font-bold ${cardTitleColor}`}>
                      {step.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed ${cardBodyColor}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image — only rendered when admin has uploaded one */}
          {imgSrc && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.22)]">
                <img
                  src={optimizeImage(imgSrc)}
                  alt={content?.imageAlt || 'Legal process'}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ maxHeight: '520px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 via-transparent to-transparent" />
                <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c] to-[#c9a84c]/40" />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
