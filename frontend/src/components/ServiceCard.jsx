import React from 'react';
import * as Icons from 'lucide-react';

const ServiceCard = ({ title, description, iconName }) => {
  const IconComponent = Icons[iconName] || Icons.Briefcase;
  
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold/15 group-hover:bg-gold/25 transition-colors duration-300">
        <IconComponent className="w-7 h-7 text-gold transition-colors duration-300" strokeWidth={2} />
      </div>
      <h3 className="font-serif text-xl font-bold text-gold">
        {title}
      </h3>
      <p className="font-sans text-sm text-white leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
