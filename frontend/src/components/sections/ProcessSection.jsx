import React from 'react';
import { ArrowRightCircle } from 'lucide-react';

/**
 * Process Section Component
 * Content: { steps: [{ stepNumber, title, description }] }
 */
const ProcessSection = ({ heading, content, background }) => {
  const { imageUrl, imageAlt, imagePosition = 'top', steps = [] } = content || {};
  
  // Dynamic colors based on background
  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-b from-[#0f1d39] to-[#172b50]'
    : 'bg-gradient-to-br from-[#f5f8fc] to-white';
  const headingColor = isDark ? 'text-white' : 'text-[#152f54]';
  const cardBg = isDark ? 'bg-white/8' : 'bg-white';
  const cardBorder = isDark ? 'border-white/15' : 'border-slate-200';
  const cardTitleColor = isDark ? 'text-white' : 'text-[#152f54]';
  const cardBodyColor = isDark ? 'text-slate-300' : 'text-slate-700';
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

  const stepsList = (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="group flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c] shadow-lg transition-transform group-hover:scale-105">
              <span className="font-sans text-lg font-bold text-[#1a2744]">
                {step.stepNumber || index + 1}
              </span>
            </div>
          </div>
          <div className={`flex-1 rounded-2xl border ${cardBorder} ${cardBg} p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl`}>
            <h3 className={`mb-2 font-serif text-xl font-bold ${cardTitleColor}`}>
              {step.title}
            </h3>
            <p className={`font-sans ${cardBodyColor}`}>{step.description}</p>
            {index !== steps.length - 1 && (
              <div className="mt-4">
                <ArrowRightCircle className={`h-4 w-4 ${isDark ? 'text-[#f4d98e]' : 'text-[#c9a84c]'}`} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg}`}>
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-8 bottom-8 h-52 w-52 rounded-full bg-[#c9a84c]/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h2 className={`mb-8 font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
          {heading}
        </h2>
        {isSplitLayout ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {imagePosition === 'left' && imageBlock}
            {stepsList}
            {imagePosition === 'right' && imageBlock}
          </div>
        ) : (
          <>
            {imagePosition === 'top' && <div className="mb-8">{imageBlock}</div>}
            {stepsList}
            {imagePosition === 'bottom' && <div className="mt-8">{imageBlock}</div>}
          </>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
