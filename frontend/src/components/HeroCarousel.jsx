import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Scale, Trophy, Award } from 'lucide-react';
import AnimatedStatValue from './AnimatedStatValue';
import { DEFAULT_CAROUSEL_SLIDES, DEFAULT_CAROUSEL_TRUST_STRIP } from '../data/homePageContentDefaults';

/** Reliable legal-themed fallback if CMS URL fails or is empty */
export const HERO_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=85&auto=format&fit=crop';

function normalizeSlides(rawSlides) {
  const list = Array.isArray(rawSlides) && rawSlides.length > 0 ? rawSlides : DEFAULT_CAROUSEL_SLIDES;
  return list.map((s, i) => ({
    id: s.id ?? i + 1,
    image: (s.image && String(s.image).trim()) || HERO_IMAGE_FALLBACK,
    tagline: s.tagline || '',
    heading: s.heading || '',
    headingAccent: s.headingAccent || '',
    description: s.description || '',
    ctaPrimary: {
      text: s.ctaPrimary?.text ?? s.ctaPrimaryText ?? 'Learn more',
      link: s.ctaPrimary?.link ?? s.ctaPrimaryLink ?? '/contact',
    },
    ctaSecondary: {
      text: s.ctaSecondary?.text ?? s.ctaSecondaryText ?? 'Services',
      link: s.ctaSecondary?.link ?? s.ctaSecondaryLink ?? '/services',
    },
  }));
}

function CtaLink({ to, className, children }) {
  const isHashOnHome = typeof to === 'string' && /^\/#/.test(to);
  if (isHashOnHome) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

const HERO_GOLD_ACCENT = '#C9A84C';

function HeroStatCards({ items }) {
  const icons = [Trophy, Award, Scale];
  if (!items?.length) return null;
  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md ml-auto lg:max-w-none">
      {items.slice(0, 3).map((item, idx) => {
        const Icon = icons[Math.min(idx, icons.length - 1)];
        return (
          <div
            key={`${item.label}-${idx}`}
            className="group relative overflow-hidden rounded-xl border border-white/25 bg-white/[0.12] backdrop-blur-md px-5 py-4 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#C9A84C]/50"
            style={{ borderLeftWidth: '4px', borderLeftColor: HERO_GOLD_ACCENT }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#C9A84C]/35 bg-[#0B1526]/40"
                style={{ color: HERO_GOLD_ACCENT }}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-2xl sm:text-3xl font-bold tabular-nums text-white">
                  <AnimatedStatValue value={item.value} duration={1600 + idx * 180} />
                </p>
                <p className="font-sans text-xs sm:text-sm text-white/80 mt-0.5 leading-snug">{item.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const HeroCarousel = ({
  aside = null,
  slides: slidesProp = null,
  trustStrip: trustStripProp = null,
  showTrustStrip = true,
  showScrollCue = false,
  scrollCueTargetId = 'practice-areas',
  scrollCueLabel = 'Explore',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [brokenSlideImages, setBrokenSlideImages] = useState(() => ({}));

  const slides = useMemo(() => normalizeSlides(slidesProp), [slidesProp]);

  const onHeroImgError = useCallback((slideId) => {
    setBrokenSlideImages((prev) => ({ ...prev, [slideId]: true }));
  }, []);

  const resolveHeroSrc = useCallback(
    (s) => (brokenSlideImages[s.id] ? HERO_IMAGE_FALLBACK : s.image || HERO_IMAGE_FALLBACK),
    [brokenSlideImages]
  );

  const trustStrip = useMemo(() => {
    if (Array.isArray(trustStripProp)) return trustStripProp;
    return DEFAULT_CAROUSEL_TRUST_STRIP;
  }, [trustStripProp]);

  const showStrip = showTrustStrip && trustStrip.length > 0;

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length, slidesProp]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = slides[currentSlide];

  return (
    <div
      id="hero"
      className="relative w-full h-[calc(100dvh-8rem)] min-h-[560px] max-h-[800px] overflow-hidden scroll-mt-0"
    >
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={resolveHeroSrc(s)}
              alt=""
              className="h-full w-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              onError={() => onHeroImgError(s.id)}
            />
            {/* Readable text on the left; lighter on the right (~55–60% navy) so the photo reads through */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B1526]/60 via-[#0B1526]/50 to-[#0B1526]/38"
              aria-hidden
            />
          </div>
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center py-10 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`flex w-full flex-col items-stretch gap-8 lg:gap-10 xl:gap-12 ${
              aside ? 'lg:flex-row lg:items-center lg:justify-between' : 'lg:flex-row lg:items-center'
            }`}
          >
            <div
              key={slide.id}
              className={`min-w-0 ${
                aside ? 'lg:flex-1 lg:max-w-2xl xl:max-w-3xl' : 'w-full lg:w-[55%] lg:max-w-none'
              }`}
            >
              <p
                className="font-sans text-[10px] sm:text-[11px] lg:text-xs font-semibold uppercase tracking-[0.22em] mb-6 animate-slide-down"
                style={{ color: HERO_GOLD_ACCENT }}
              >
                {slide.tagline}
              </p>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-slide-down">
                <span className="text-white">{slide.heading}</span>
                <br />
                <span style={{ color: HERO_GOLD_ACCENT }}>{slide.headingAccent}</span>
              </h1>

              <p className="font-sans text-base lg:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl animate-slide-down">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-down">
                <CtaLink to={slide.ctaPrimary.link}>
                  <span
                    className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer rounded-md px-8 py-4 font-sans text-sm font-bold text-[#0B1526] shadow-lg transition-all duration-200 hover:scale-[1.02] hover:brightness-105 hover:shadow-xl"
                    style={{ backgroundColor: HERO_GOLD_ACCENT, boxShadow: '0 12px 40px rgba(201,168,76,0.25)' }}
                  >
                    {slide.ctaPrimary.text}
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </span>
                </CtaLink>
                <CtaLink to={slide.ctaSecondary.link}>
                  <span className="inline-block px-8 py-4 bg-transparent text-white font-sans text-sm font-semibold rounded-md border-2 border-white/55 transition-all duration-200 hover:bg-white/10 hover:border-[#C9A84C]/80 w-full sm:w-auto text-center cursor-pointer">
                    {slide.ctaSecondary.text}
                  </span>
                </CtaLink>
              </div>
            </div>

            {aside ? (
              <div className="w-full lg:w-[min(100%,380px)] xl:w-[420px] flex-shrink-0 lg:mr-12 xl:mr-14 z-30">{aside}</div>
            ) : (
              <div className="flex w-full lg:w-[45%] flex-shrink-0 justify-center lg:justify-end z-30 pt-2 sm:pt-4 lg:pt-0">
                <HeroStatCards items={trustStrip.length ? trustStrip : DEFAULT_CAROUSEL_TRUST_STRIP} />
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-navy transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-gold hover:border-gold hover:text-navy transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 ${
          showStrip ? 'bottom-24 sm:bottom-28' : 'bottom-8'
        }`}
      >
        {slides.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-2 bg-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {showScrollCue && (
        <a
          href={`/#${scrollCueTargetId}`}
          className="absolute right-6 md:right-10 bottom-24 md:bottom-28 z-40 hidden sm:flex flex-col items-center gap-1 text-white/80 hover:text-gold transition-colors motion-reduce:opacity-90"
          aria-label={`Scroll to ${scrollCueLabel}`}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.2em]">{scrollCueLabel}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-sm animate-bounce motion-reduce:animate-none">
            <ChevronDown className="w-5 h-5" strokeWidth={2} />
          </span>
        </a>
      )}

      {showStrip && (
      <div className="absolute bottom-20 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-12 py-6 px-8 bg-navy/40 backdrop-blur-md rounded-xl border border-white/10 max-w-fit">
            {trustStrip.map((item, idx) => (
              <React.Fragment key={`${item.label}-${idx}`}>
                {idx > 0 && <div className="w-px h-12 bg-white/30 hidden sm:block" />}
                <div className="text-center lg:text-left">
                  <p className="font-serif text-3xl lg:text-4xl font-bold text-white tabular-nums">
                    <AnimatedStatValue value={item.value} duration={1600 + idx * 200} />
                  </p>
                  <p className="font-sans text-xs lg:text-sm text-gray-300 mt-1">{item.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default HeroCarousel;
