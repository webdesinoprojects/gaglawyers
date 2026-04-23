import React from 'react';
import { FileText, Scale } from 'lucide-react';
import { getSectionImage } from '../../utils/sectionImages';

const BULLET_LINE_REGEX = /^([-*•]\s+|\d+\.\s+)/;

const parseOverviewBody = (rawBody) => {
  const text = typeof rawBody === 'string' ? rawBody.replace(/\r/g, '').trim() : '';
  if (!text) {
    return { leadParagraphs: [], bulletItems: [] };
  }

  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const hasLineBullets = lines.some((line) => BULLET_LINE_REGEX.test(line));

  if (hasLineBullets) {
    const leadParagraphs = [];
    const bulletItems = [];

    lines.forEach((line) => {
      if (BULLET_LINE_REGEX.test(line)) {
        bulletItems.push(line.replace(BULLET_LINE_REGEX, '').trim());
      } else {
        leadParagraphs.push(line);
      }
    });

    return { leadParagraphs, bulletItems };
  }

  if (text.includes('•')) {
    const firstBulletIndex = text.indexOf('•');
    const intro = text.slice(0, firstBulletIndex).trim();
    const bulletPart = text.slice(firstBulletIndex);
    const bulletItems = bulletPart
      .split('•')
      .map((item) => item.trim())
      .filter(Boolean);

    return {
      leadParagraphs: intro ? intro.split(/\n+/).map((p) => p.trim()).filter(Boolean) : [],
      bulletItems,
    };
  }

  return {
    leadParagraphs: text.split(/\n+/).map((p) => p.trim()).filter(Boolean),
    bulletItems: [],
  };
};

/**
 * Overview Section Component
 * Content: { body }
 */
const OverviewSection = ({ heading, content, background, serviceSlug = '' }) => {
  const { body } = content || {};
  const { leadParagraphs, bulletItems } = parseOverviewBody(body);
  const imgSrc = content?.imageUrl || getSectionImage(serviceSlug, 'overview');
  
  // Dynamic colors based on background
  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#13284f] via-[#132240] to-[#0d1a32]'
    : 'bg-gradient-to-br from-[#f8fafc] via-[#f3f6fb] to-[#eef2f8]';
  const cardBg = isDark ? 'bg-white/8' : 'bg-white/80';
  const borderColor = isDark ? 'border-white/15' : 'border-slate-200';
  const iconBg = isDark ? 'bg-[#c9a84c]/20' : 'bg-[#1a2744]';
  const iconColor = isDark ? 'text-[#f5d98c]' : 'text-white';
  const headingColor = isDark ? 'text-white' : 'text-[#102846]';
  const bodyColor = isDark ? 'text-slate-200' : 'text-slate-700';

  const renderOverviewBody = (containerClasses = '') => (
    <div className={containerClasses}>
      {leadParagraphs.map((paragraph, index) => (
        <p key={`overview-p-${index}`} className={index > 0 ? 'mt-4' : ''}>
          {paragraph}
        </p>
      ))}

      {bulletItems.length > 0 && (
        <ul className={`mt-5 space-y-3 rounded-xl border ${borderColor} bg-white/5 p-4 md:p-5`}>
          {bulletItems.map((item, index) => (
            <li key={`overview-b-${index}`} className="flex items-start gap-3">
              <span className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${isDark ? 'bg-[#f5d98c]' : 'bg-[#c9a84c]'}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg}`}>
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-12 top-8 h-48 w-48 rounded-full bg-[#c9a84c]/35 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className={`relative rounded-3xl border ${borderColor} ${cardBg} p-8 shadow-[0_16px_45px_rgba(15,23,42,0.12)] backdrop-blur-sm md:p-10`}>
          <div className="section-split">
            <div className="section-split__text">
              <div className="mb-7 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
                  <FileText size={24} className={iconColor} />
                </div>
                <h2 className={`font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
                  {heading}
                </h2>
                <Scale className={`ml-auto h-5 w-5 ${isDark ? 'text-[#f5d98c]' : 'text-[#c9a84c]'}`} />
              </div>
              <div className={`max-w-none font-sans ${bodyColor} leading-8 text-[1.06rem]`}>
                {renderOverviewBody()}
              </div>
            </div>
            <div className="section-split__image">
              <img
                src={imgSrc}
                alt={content?.imageAlt || heading || 'Legal service'}
                loading="lazy"
                style={{ borderRadius: '12px', width: '100%', objectFit: 'cover', maxHeight: '380px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
