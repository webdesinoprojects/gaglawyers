import React from 'react';
import * as Icons from 'lucide-react';

const ServiceCard = ({ title, description, iconName }) => {
  const IconComponent = Icons[iconName] || Icons.Briefcase;
  
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-navy/5 group-hover:bg-gold/10 transition-colors duration-300">
        <IconComponent className="w-7 h-7 text-navy group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="font-serif text-xl font-semibold text-navy">
        {title}
      </h3>
      <p className="font-sans text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
