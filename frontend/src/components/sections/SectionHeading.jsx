import React from 'react';

const SectionHeading = ({ heading, subheading, isDark = false, align = 'left' }) => {
  const headingColor = 'text-white';
  const subColor = 'text-slate-200';
  const panelBg = isDark
    ? 'bg-gradient-to-r from-[#0f2345]/90 via-[#132b52]/90 to-[#1a3868]/90 border-white/15'
    : 'bg-gradient-to-r from-[#102847] via-[#15335a] to-[#1e4676] border-[#2f4f78]';
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`mb-8 md:mb-10 rounded-2xl border ${panelBg} p-6 md:p-7 backdrop-blur-sm`}>
      <div className={`flex flex-col gap-3 ${alignClass}`}>
        <span className="inline-flex h-1.5 w-16 rounded-full bg-[#c9a84c]" />
        <h2 className={`font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>{heading}</h2>
        {subheading ? (
          <p className={`max-w-3xl font-sans text-base md:text-lg ${subColor}`}>{subheading}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeading;
