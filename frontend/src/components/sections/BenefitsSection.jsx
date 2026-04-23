import React from 'react';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { getSectionImage } from '../../utils/sectionImages';

/**
 * Benefits Section Component
 * Content: { items: [{ icon, title, description }] }
 */
const BenefitsSection = ({ heading, content, background, serviceSlug = '' }) => {
  const { items = [] } = content || {};
  const imgSrc = content?.imageUrl || getSectionImage(serviceSlug, 'benefits');
  
  // Dynamic colors based on background
  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#14284e] via-[#101d38] to-[#0d172d]'
    : 'bg-gradient-to-b from-white to-[#f5f8fc]';
  const cardBg = isDark ? 'bg-white/8' : 'bg-white';
  const cardBorder = isDark ? 'border-white/15' : 'border-slate-200';
  const cardTitleColor = isDark ? 'text-white' : 'text-[#122b4d]';
  const cardBodyColor = isDark ? 'text-slate-300' : 'text-slate-700';

  const itemsGrid = (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`group rounded-2xl border ${cardBorder} ${cardBg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a84c]/90 shadow-md">
              <CheckCircle size={22} className="text-[#142949]" />
            </div>
            <ShieldCheck className={`h-4 w-4 ${isDark ? 'text-[#f4d98e]' : 'text-[#c9a84c]'}`} />
          </div>
          <h3 className={`mb-2 font-serif text-xl font-bold ${cardTitleColor}`}>
            {item.title}
          </h3>
          <p className={`font-sans ${cardBodyColor}`}>{item.description}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg}`}>
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute right-8 top-10 h-56 w-56 rounded-full bg-[#c9a84c]/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(10,25,60,0.72), rgba(10,25,60,0.72)), url(${imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '48px 32px',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#C9A84C', fontSize: '28px', marginBottom: '8px' }}>{heading}</h2>
          <p style={{ color: '#e0e0e0', maxWidth: '600px', margin: '0 auto' }}>
            Expert legal assistance tailored to your needs
          </p>
        </div>
        {itemsGrid}
      </div>
    </section>
  );
};

export default BenefitsSection;
