import React from 'react';
import {
  Shield, Scale, Briefcase, ClipboardList, Users, FolderOpen,
  FileText, BookOpen, Award, TrendingUp, Heart, MessageCircle,
  DollarSign, CheckCircle, Gavel, AlertCircle, Info
} from 'lucide-react';

/**
 * Dynamic Content Block Renderer
 * Renders different types of content blocks based on type
 */

const iconMap = {
  Shield, Scale, Briefcase, ClipboardList, Users, FolderOpen,
  FileText, BookOpen, Award, TrendingUp, Heart, MessageCircle,
  DollarSign, CheckCircle, Gavel, AlertCircle, Info
};

const ContentBlockRenderer = ({ block }) => {
  const Icon = iconMap[block.icon] || FileText;
  const bgColor = block.backgroundColor || '#ffffff';

  // Introduction Block
  if (block.type === 'introduction') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {block.paragraphs?.map((para, idx) => (
            <p key={idx} className="font-sans text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>
    );
  }

  // Legal Framework Block
  if (block.type === 'legal-framework') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>
            )}
          </div>
        </div>
        <div className="space-y-4 mb-6">
          {block.paragraphs?.map((para, idx) => (
            <p key={idx} className="font-sans text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
        {block.keyLaws && (
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#c9a84c]">
            <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">
              Key Legal Provisions
            </h3>
            <ul className="space-y-2">
              {block.keyLaws.map((law, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-gray-700">{law}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {block.subsections?.map((subsection, idx) => (
          <div key={idx} className="mt-6">
            <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">
              {subsection.title}
            </h3>
            {subsection.content && (
              <p className="font-sans text-gray-700 mb-3">{subsection.content}</p>
            )}
            {subsection.points && (
              <ul className="space-y-2">
                {subsection.points.map((point, pidx) => (
                  <li key={pidx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    );
  }

  // Types Block
  if (block.type === 'types') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4">
          {block.cases?.map((caseType, idx) => (
            <div key={idx} className="p-5 bg-gray-50 rounded-lg border-l-4 border-[#c9a84c] hover:shadow-md transition-shadow">
              <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">
                {caseType.name}
              </h3>
              <p className="font-sans text-gray-700">{caseType.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Process Block
  if (block.type === 'process') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
              {block.heading}
            </h2>
            {block.subheading && (
              <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>
            )}
          </div>
        </div>
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed mb-6">
            {para}
          </p>
        ))}
        <div className="space-y-6">
          {block.steps?.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#c9a84c] rounded-full flex items-center justify-center">
                  <span className="font-sans font-bold text-[#1a2744] text-lg">
                    {step.step}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-[#1a2744] mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-gray-700 mb-3">{step.description}</p>
                {step.duration && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-sans">
                    Duration: {step.duration}
                  </span>
                )}
                {step.requirements && (
                  <ul className="mt-3 space-y-1">
                    {step.requirements.map((req, ridx) => (
                      <li key={ridx} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Rights & Remedies Block
  if (block.type === 'rights-remedies') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">{block.heading}</h2>
            {block.subheading && <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>}
          </div>
        </div>
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed mb-4">{para}</p>
        ))}
        {block.rights && (
          <div className="mt-6">
            <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Your Rights</h3>
            <ul className="space-y-2">
              {block.rights.map((right, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-gray-700">{right}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {block.availableRemedies && (
          <div className="mt-6">
            <h3 className="font-serif text-xl font-semibold text-[#1a2744] mb-4">Available Remedies</h3>
            <ul className="space-y-2">
              {block.availableRemedies.map((remedy, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-gray-700">{remedy}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  // Documents Block
  if (block.type === 'documents') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">{block.heading}</h2>
            {block.subheading && <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>}
          </div>
        </div>
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed mb-6">{para}</p>
        ))}
        {block.documentCategories ? (
          <div className="space-y-6">
            {block.documentCategories.map((category, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-5 border-l-4 border-[#c9a84c]">
                <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-3">{category.category}</h3>
                <ul className="space-y-2">
                  {category.documents.map((doc, didx) => (
                    <li key={didx} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                      <span className="font-sans text-gray-700 text-sm">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : block.documents && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {block.documents.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle size={18} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <span className="font-sans text-gray-700 text-sm">{doc}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  // Firm Expertise Block
  if (block.type === 'firm-expertise') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">{block.heading}</h2>
            {block.subheading && <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>}
          </div>
        </div>
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed mb-4">{para}</p>
        ))}
        {block.whyChooseUs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {block.whyChooseUs.map((item, idx) => {
              const ItemIcon = iconMap[item.icon] || Award;
              return (
                <div key={idx} className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#c9a84c] rounded-lg flex items-center justify-center flex-shrink-0">
                      <ItemIcon size={20} className="text-[#1a2744]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-2">{item.title}</h3>
                      <p className="font-sans text-sm text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  // Landmark Cases Block
  if (block.type === 'landmark-cases') {
    return (
      <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#1a2744]">{block.heading}</h2>
            {block.subheading && <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>}
          </div>
        </div>
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed mb-6">{para}</p>
        ))}
        {block.landmarkCases && (
          <div className="space-y-6">
            {block.landmarkCases.map((caseItem, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border-l-4 border-[#c9a84c] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1a2744]">{caseItem.caseName}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-sans">{caseItem.year}</span>
                </div>
                <p className="text-sm text-gray-600 font-sans mb-2">{caseItem.court}</p>
                <p className="font-sans text-gray-700 mb-4">{caseItem.significance}</p>
                {caseItem.keyPoints && (
                  <ul className="space-y-2">
                    {caseItem.keyPoints.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-1" />
                        <span className="font-sans text-sm text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // Default rendering for other types
  return (
    <section className="rounded-xl border-2 border-gray-200 p-8" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#1a2744] rounded-lg flex items-center justify-center">
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#1a2744]">
            {block.heading}
          </h2>
          {block.subheading && (
            <p className="text-[#c9a84c] font-sans text-sm mt-1">{block.subheading}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {block.paragraphs?.map((para, idx) => (
          <p key={idx} className="font-sans text-gray-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ContentBlockRenderer;
