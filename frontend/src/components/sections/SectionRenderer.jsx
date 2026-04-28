import React from 'react';
import HeroSection from './HeroSection';
import OverviewSection from './OverviewSection';
import BenefitsSection from './BenefitsSection';
import ProcessSection from './ProcessSection';
import FAQSection from './FAQSection';
import TestimonialsSection from './TestimonialsSection';
import CTABannerSection from './CTABannerSection';
import RevealOnScroll from './RevealOnScroll';

/**
 * Section Renderer - Maps section types to components
 */
const SECTION_COMPONENTS = {
  hero: HeroSection,
  overview: OverviewSection,
  benefits: BenefitsSection,
  process: ProcessSection,
  faq: FAQSection,
  testimonials: TestimonialsSection,
  cta: CTABannerSection,
};

const SectionRenderer = ({ section, sectionIndex = 0, serviceSlug = '' }) => {
  const Component = SECTION_COMPONENTS[section.type];

  if (!Component) {
    console.warn(`Unknown section type: ${section.type}`);
    return null;
  }

  return (
    <RevealOnScroll delayMs={Math.min(260, sectionIndex * 45)}>
      <Component
        heading={section.heading}
        content={section.content}
        background={section.background}
        serviceSlug={serviceSlug}
        section={section}
      />
    </RevealOnScroll>
  );
};

export default SectionRenderer;
