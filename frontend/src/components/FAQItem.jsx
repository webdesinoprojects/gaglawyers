import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-grey-light transition-colors duration-200"
      >
        <span className="font-sans font-medium text-navy text-base lg:text-lg pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-navy flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 font-sans text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
