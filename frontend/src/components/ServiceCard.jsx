import React from 'react';
import * as Icons from 'lucide-react';

const ServiceCard = ({ title, description, iconName }) => {
  const IconComponent = Icons[iconName] || Icons.Briefcase;
  
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-grey-light group-hover:bg-navy/5 transition-colors duration-300">
          <IconComponent className="w-8 h-8 text-navy" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-navy">
          {title}
        </h3>
        <p className="font-sans text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
