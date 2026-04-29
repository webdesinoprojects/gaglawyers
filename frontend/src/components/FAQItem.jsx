import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#122b50] via-[#173864] to-[#214a74] p-5 text-left transition-all hover:brightness-110"
      >
        <span className="flex w-full items-start gap-3 font-serif text-[15px] font-semibold leading-relaxed text-white md:text-[16px]">
          <span className="mt-0.5 flex-shrink-0 font-sans text-[11px] font-bold tracking-wider text-[#c9a84c]">
            {String(index + 1).padStart(2, '0')}
          </span>
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-[#c9a84c] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-80'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 bg-white px-6 py-5">
            <p className="font-sans leading-relaxed text-slate-700">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
