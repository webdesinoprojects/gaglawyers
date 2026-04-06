import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-[#C9A84C]/45 border-l-4 border-l-[#C9A84C] bg-white shadow-sm'
          : 'border-[#E5E0D0] border-l-4 border-l-transparent bg-white hover:border-[#C9A84C]/25'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span
          className={`font-serif text-base font-semibold leading-snug transition-colors duration-300 sm:text-lg ${
            isOpen ? 'text-[#C9A84C]' : 'text-[#0B1526]'
          }`}
        >
          {question}
        </span>
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
            isOpen
              ? 'border-[#C9A84C]/50 bg-[#FDF8EC] text-[#C9A84C]'
              : 'border-[#E5E0D0] bg-white text-[#0B1526]'
          }`}
        >
          {isOpen ? (
            <Minus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          ) : (
            <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          )}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-5 pt-0 font-sans text-[0.9375rem] leading-relaxed text-gray-600 sm:px-6">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
