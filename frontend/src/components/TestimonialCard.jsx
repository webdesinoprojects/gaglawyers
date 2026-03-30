import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ content, author, designation, imageUrl, rating = 5 }) => {
  return (
    <div className="flex-shrink-0 w-[380px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Decorative top bar */}
      <div className="h-1.5 bg-gradient-to-r from-gold via-gold/70 to-navy"></div>
      
      <div className="p-8 flex flex-col flex-1">
        {/* Quote icon */}
        <div className="mb-6">
          <Quote className="w-12 h-12 text-gold/20 fill-gold/10" />
        </div>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
            />
          ))}
        </div>
        
        {/* Testimonial content - takes up available space */}
        <div className="flex-1 mb-6">
          <p className="font-sans text-gray-700 leading-relaxed text-base">
            "{content}"
          </p>
        </div>
        
        {/* Author info - always at bottom */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto">
          {imageUrl ? (
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={author}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/30 shadow-md"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center border-2 border-gold/30 shadow-md">
              <span className="text-white font-serif text-xl font-bold">
                {author.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <p className="font-serif text-lg font-bold text-navy truncate">
              {author}
            </p>
            <p className="font-sans text-sm text-gray-600 truncate">
              {designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
