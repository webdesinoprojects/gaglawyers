import React from 'react';
import * as Icons from 'lucide-react';

const cleanDisplayText = (value = '', fallback = '') => {
  const text = String(value || fallback || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~>#|]/g, ' ')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text || fallback;
};

const ServiceCard = ({ title, description, iconName }) => {
  const IconComponent = Icons[iconName] || Icons.Briefcase;
  const displayTitle = cleanDisplayText(title, 'Legal Service');
  const displayDescription = cleanDisplayText(
    description,
    'Comprehensive legal representation tailored to your matter.'
  );
  
  return (
    <div className="flex h-full flex-col items-center text-center">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold/15 group-hover:bg-gold/25 transition-colors duration-300">
        <IconComponent className="w-7 h-7 text-gold transition-colors duration-300" strokeWidth={2} />
      </div>
      <h3 className="mt-4 min-h-[3.25rem] font-serif text-xl font-bold text-gold line-clamp-2">
        {displayTitle}
      </h3>
      <p className="mt-3 flex-1 font-sans text-sm text-white leading-relaxed line-clamp-5">
        {displayDescription}
      </p>
    </div>
  );
};

export default ServiceCard;
