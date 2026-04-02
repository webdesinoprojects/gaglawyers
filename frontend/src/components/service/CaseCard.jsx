import React from 'react';
import { Scale } from 'lucide-react';

const CaseCard = ({ caseName, index }) => {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-[#c9a84c] hover:shadow-lg transition-all group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#1a2744] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a84c] transition-colors">
          <Scale size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold mb-3">
            Case #{index + 1}
          </span>
          <p className="font-sans text-sm text-gray-800 leading-relaxed">
            {caseName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
