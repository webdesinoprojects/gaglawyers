import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-5 px-6 lg:px-8 flex items-center justify-between text-left rounded-lg border-2 transition-all duration-300 ${
          isOpen
            ? 'bg-gold/10 border-gold shadow-md'
            : 'bg-white border-gray-200 hover:border-gold/50 hover:shadow-sm'
        }`}
      >
        <span className="font-serif font-bold text-navy text-base lg:text-lg pr-6 flex-1">
          {question}
        </span>
        <div className={`flex-shrink-0 transition-transform duration-300 ${
          isOpen ? 'rotate-45 text-gold' : 'text-navy'
        }`}>
          <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 lg:px-8 pb-5 pt-3 font-sans text-gray-700 text-base leading-relaxed bg-gold/5 rounded-b-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
