import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

/**
 * FAQ Section Component
 * Content: { items: [{ question, answer }] }
 */
const FAQSection = ({ heading, content, background }) => {
  const { imageUrl, imageAlt, imagePosition = 'top', items = [] } = content || {};
  const [openIndex, setOpenIndex] = useState(null);
  
  // Dynamic colors based on background
  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#0d1d3a] via-[#10274a] to-[#153055]'
    : 'bg-gradient-to-b from-white to-[#f4f7fc]';
  const headingColor = isDark ? 'text-white' : 'text-[#112b4e]';
  const itemBg = isDark ? 'bg-white/8' : 'bg-white';
  const itemBorder = isDark ? 'border-white/15' : 'border-slate-200';
  const itemHoverBg = isDark ? 'hover:bg-white/15' : 'hover:bg-slate-50';
  const questionColor = isDark ? 'text-white' : 'text-[#112b4e]';
  const answerColor = isDark ? 'text-slate-300' : 'text-slate-700';
  const hasImage = Boolean(imageUrl);
  const isSplitLayout = hasImage && (imagePosition === 'left' || imagePosition === 'right');

  const imageBlock = hasImage ? (
    <div className="overflow-hidden rounded-2xl border border-white/20 shadow-lg">
      <img
        src={imageUrl}
        alt={imageAlt || `${heading} image`}
        className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  ) : null;

  const faqList = (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-2xl border ${itemBorder} ${itemBg} shadow-sm transition-shadow duration-300 hover:shadow-lg`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`flex w-full items-center justify-between gap-3 p-6 text-left transition-colors ${itemHoverBg}`}
          >
            <span className={`flex items-center gap-2 font-serif text-lg font-bold ${questionColor}`}>
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
              <div className={`border-t-2 ${itemBorder} p-6`}>
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

      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <h2 className={`mb-8 font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
          {heading}
        </h2>
        {isSplitLayout ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {imagePosition === 'left' && imageBlock}
            {faqList}
            {imagePosition === 'right' && imageBlock}
          </div>
        ) : (
          <>
            {imagePosition === 'top' && <div className="mb-8">{imageBlock}</div>}
            {faqList}
            {imagePosition === 'bottom' && <div className="mt-8">{imageBlock}</div>}
          </>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
