import React from 'react';
import { FileText } from 'lucide-react';
import { optimizeImage } from '../../utils/imageUrl';


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
const OverviewSection = ({ heading, content, background }) => {
  const { body } = content || {};
  const { leadParagraphs, bulletItems } = parseOverviewBody(body);
  const imgSrc = content?.imageUrl || null;

  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#13284f] via-[#132240] to-[#0d1a32]'
    : 'bg-gradient-to-br from-[#f8fafc] via-[#f3f6fb] to-[#eef2f8]';
  const cardBg = isDark ? 'bg-white/[0.06]' : 'bg-white/90';
  const borderColor = isDark ? 'border-white/[0.12]' : 'border-slate-200/80';
  const iconBg = isDark ? 'bg-[#c9a84c]/20' : 'bg-[#1a2744]';
  const iconColor = isDark ? 'text-[#f5d98c]' : 'text-white';
  const headingColor = isDark ? 'text-white' : 'text-[#102846]';
  const bodyColor = isDark ? 'text-slate-200' : 'text-slate-700';
  const bulletDot = isDark ? 'bg-[#f5d98c]' : 'bg-[#c9a84c]';
  const bulletBg = isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50/80';
  const badgeColor = isDark
    ? 'border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#f5d98c]'
    : 'border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#7a5c10]';

  const renderBody = () => (
    <div>
      {leadParagraphs.map((paragraph, index) => (
        <p key={`overview-p-${index}`} className={index > 0 ? 'mt-4' : ''}>
          {paragraph}
        </p>
      ))}

      {bulletItems.length > 0 && (
        <ul className={`mt-6 space-y-3 rounded-xl border ${bulletBg} p-4 md:p-5`}>
          {bulletItems.map((item, index) => (
            <li key={`overview-b-${index}`} className="flex items-start gap-3">
              <span className={`mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletDot}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 ${sectionBg}`}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#c9a84c]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-56 w-56 rounded-full bg-[#0B1F3A]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className={`overflow-hidden rounded-3xl border ${borderColor} ${cardBg} shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-sm`}>
          <div className={`grid grid-cols-1 ${imgSrc ? 'lg:grid-cols-2' : ''}`}>

            {/* Content side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              {/* Badge */}
              <div className={`mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${badgeColor}`}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-md ${iconBg}`}>
                  <FileText size={11} className={iconColor} />
                </div>
                <span>Overview</span>
              </div>

              {/* Heading */}
              <h2 className={`mb-3 font-serif text-3xl font-bold leading-tight md:text-4xl ${headingColor}`}>
                {heading}
              </h2>

              {/* Gold divider */}
              <div className="mb-7 h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d490]" />

              {/* Body */}
              <div className={`font-sans ${bodyColor} leading-[1.85] text-[1.04rem]`}>
                {renderBody()}
              </div>
            </div>

            {/* Image side — only rendered when admin has set an image */}
            {imgSrc && (
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-0">
                <img
                  src={optimizeImage(imgSrc)}
                  alt={content?.imageAlt || heading || 'Legal service'}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#13284f]/50 via-transparent to-transparent'
                      : 'bg-gradient-to-r from-white/20 via-transparent to-transparent'
                  }`}
                />
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c] to-[#c9a84c]/40" />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
