import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-2 border-gray-200 rounded-lg overflow-hidden transition-all hover:border-[#c9a84c]"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
          >
            <h3 className="font-serif text-lg font-semibold text-[#1a2744] pr-4">
              {faq.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp size={24} className="text-[#c9a84c] flex-shrink-0" />
            ) : (
              <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 bg-gray-50 animate-slide-down">
              <p className="font-sans text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
