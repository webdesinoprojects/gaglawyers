import React from 'react';

const StatCard = ({ value, label }) => {
  return (
    <div className="text-center px-6 py-4">
      <div className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-2">
        {value}
      </div>
      <div className="font-sans text-sm lg:text-base text-gray-600 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
