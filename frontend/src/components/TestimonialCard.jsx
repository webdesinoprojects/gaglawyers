import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ content, author, designation }) => {
  return (
    <div className="bg-white p-8 lg:p-10 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300">
      <Quote className="w-10 h-10 text-gold/30 mb-4" />
      <p className="font-sans text-gray-700 leading-relaxed mb-6 italic">
        "{content}"
      </p>
      <div className="border-t border-gray-100 pt-4">
        <p className="font-serif text-lg font-semibold text-navy">
          {author}
        </p>
        <p className="font-sans text-sm text-gray-500">
          {designation}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
