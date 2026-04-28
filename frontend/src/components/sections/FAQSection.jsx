import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * FAQ Section Component
 * Content: { items: [{ question, answer }] }
 */
const FAQSection = ({ heading, content, background }) => {
  const { items = [] } = content || {};
  const [openIndex, setOpenIndex] = useState(null);

  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#0d1d3a] via-[#10274a] to-[#153055]'
    : 'bg-gradient-to-b from-white to-[#f4f7fc]';
  const headingColor = isDark ? 'text-white' : 'text-[#112b4e]';
  const itemBg = isDark ? 'bg-white/[0.07]' : 'bg-white';
  const itemBorder = isDark ? 'border-white/[0.12]' : 'border-slate-200';
  const faqTabBg = isDark
    ? 'bg-gradient-to-r from-[#102b54] via-[#163864] to-[#1f456f]'
    : 'bg-gradient-to-r from-[#122b50] via-[#173864] to-[#214a74]';
  const answerColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const answerBg = isDark ? 'bg-[#0f2445]/80' : 'bg-white';
  const badgeColor = isDark
    ? 'border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#f5d98c]'
    : 'border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#7a5c10]';

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 ${sectionBg}`}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 bottom-8 h-64 w-64 rounded-full bg-[#c9a84c]/18 blur-3xl" />
        <div className="absolute -left-20 top-8 h-48 w-48 rounded-full bg-[#0B1F3A]/8 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section header */}
        <div className="mb-10">
          <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${badgeColor}`}>
            <HelpCircle size={12} />
            <span>Frequently Asked</span>
          </div>
          <h2 className={`mb-3 font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
            {heading}
          </h2>
          <div className="h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d490]" />
        </div>

        {/* FAQ accordion */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border ${itemBorder} ${itemBg} shadow-sm transition-shadow duration-300 hover:shadow-lg`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left transition-all ${faqTabBg} hover:brightness-110`}
              >
                <span className="flex w-full items-start gap-3 font-serif text-[15px] font-semibold leading-relaxed text-white md:text-[16px]">
                  <span className="mt-0.5 flex-shrink-0 font-sans text-[11px] font-bold tracking-wider text-[#c9a84c]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-[#c9a84c] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-500 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-80'
                }`}
              >
                <div className="overflow-hidden">
                  <div className={`border-t ${itemBorder} ${answerBg} px-6 py-5`}>
                    <p className={`font-sans leading-relaxed ${answerColor}`}>{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
