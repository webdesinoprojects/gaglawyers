import React from 'react';
import { Quote, Star } from 'lucide-react';

const TestimonialCard = ({ content, author, designation, imageUrl, rating = 5 }) => {
  const normalizedContent = (() => {
    if (!content) return '';
    const raw = String(content);
    const hasHtml = /<\/?[a-z][\s\S]*>/i.test(raw);
    return hasHtml ? raw : raw.replace(/\n/g, '<br />');
  })();

  return (
    <div className="group/testimonial relative flex-shrink-0 w-[88vw] max-w-[380px] sm:w-[360px] lg:w-[380px] bg-white rounded-2xl shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.22)] hover:border-gold/45">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/testimonial:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.17),transparent_55%)]" />
      {/* Decorative top bar */}
      <div className="h-1.5 bg-gradient-to-r from-gold via-gold/70 to-navy transition-all duration-500 group-hover/testimonial:h-2"></div>
      
      <div className="relative p-5 sm:p-8 flex flex-col flex-1">
        {/* Quote icon */}
        <div className="mb-4 sm:mb-6">
          <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-gold/25 fill-gold/10 transition-all duration-500 group-hover/testimonial:text-gold/45 group-hover/testimonial:scale-105" />
        </div>
        
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-3 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'text-gold fill-gold' : 'text-gray-300'}
            />
          ))}
        </div>
        
        {/* Testimonial content - takes up available space */}
        <div className="flex-1 mb-5 sm:mb-6">
          <div
            className="font-sans text-gray-700 leading-relaxed text-sm sm:text-base [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: normalizedContent }}
          />
        </div>
        
        {/* Author info - always at bottom */}
        <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 mt-auto">
          {imageUrl ? (
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={author}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-gold/30 shadow-md transition-transform duration-500 group-hover/testimonial:scale-105"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center border-2 border-gold/30 shadow-md">
              <span className="text-white font-serif text-lg sm:text-xl font-bold">
                {author.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <p className="font-serif text-base sm:text-lg font-bold text-navy truncate">
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
