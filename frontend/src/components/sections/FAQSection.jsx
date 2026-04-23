import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

/**
 * FAQ Section Component
 * Content: { items: [{ question, answer }] }
 */
const FAQSection = ({ heading, content, background }) => {
  const { items = [] } = content || {};
  const [openIndex, setOpenIndex] = useState(null);
  
  // Dynamic colors based on background
  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#0d1d3a] via-[#10274a] to-[#153055]'
    : 'bg-gradient-to-b from-white to-[#f4f7fc]';
  const headingColor = isDark ? 'text-white' : 'text-[#112b4e]';
  const itemBg = isDark ? 'bg-white/10' : 'bg-white';
  const itemBorder = isDark ? 'border-white/15' : 'border-slate-200';
  const itemHoverBg = isDark ? 'hover:brightness-110' : 'hover:brightness-105';
  const faqTabBg = isDark
    ? 'bg-gradient-to-r from-[#102b54] via-[#163864] to-[#1f456f]'
    : 'bg-gradient-to-r from-[#122b50] via-[#173864] to-[#214a74]';
  const questionColor = 'text-white';
  const answerColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const answerBg = isDark ? 'bg-[#0f2445]/80' : 'bg-white';

  const faqList = (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-2xl border ${itemBorder} ${itemBg} shadow-sm transition-shadow duration-300 hover:shadow-lg`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`flex w-full items-start justify-between gap-4 rounded-2xl p-6 text-left transition-all ${faqTabBg} ${itemHoverBg}`}
          >
            <span className={`flex w-full items-start gap-3 font-serif text-[19px] font-bold leading-relaxed md:text-[21px] ${questionColor}`}>
              <MessageCircleQuestion className={`h-4 w-4 ${isDark ? 'text-[#f4d98e]' : 'text-[#c9a84c]'}`} />
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
              <div className={`border-t ${itemBorder} ${answerBg} p-6`}>
                <p className={`font-sans ${answerColor}`}>{item.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg}`}>
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute right-8 bottom-6 h-48 w-48 rounded-full bg-[#c9a84c]/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h2 className={`mb-8 font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
          {heading}
        </h2>
        {faqList}
      </div>
    </section>
  );
};

export default FAQSection;
