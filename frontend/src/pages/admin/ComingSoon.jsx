import React from 'react';
import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop();
  const displayName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Construction className="w-16 h-16 text-gold mx-auto mb-4" />
        <h2 className="font-serif text-3xl font-bold text-navy mb-2">
          {displayName} Manager
        </h2>
        <p className="font-sans text-gray-600 mb-6">
          This module is under development and will be available soon.
        </p>
        <p className="font-sans text-sm text-gray-500">
          Follow the pattern from Team Manager or Blog Manager to build this module.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
