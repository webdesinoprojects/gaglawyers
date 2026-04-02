import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

const DocumentChecklist = ({ documents }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
          <FileText size={24} className="text-white" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1a2744]">
          Documents Required
        </h2>
      </div>
      <div className="space-y-3">
        {documents.map((document, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
            <span className="font-sans text-gray-700">{document}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentChecklist;
