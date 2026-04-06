import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedStatValue from './AnimatedStatValue';
import { DEFAULT_CAROUSEL_SLIDES, DEFAULT_CAROUSEL_TRUST_STRIP } from '../data/homePageContentDefaults';

function normalizeSlides(rawSlides) {
  const list = Array.isArray(rawSlides) && rawSlides.length > 0 ? rawSlides : DEFAULT_CAROUSEL_SLIDES;
  return list.map((s, i) => ({
    id: s.id ?? i + 1,
    image: s.image || '',
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

const HeroCarousel = ({ aside = null, slides: slidesProp = null, trustStrip: trustStripProp = null }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = useMemo(() => normalizeSlides(slidesProp), [slidesProp]);

  const trustStrip = useMemo(() => {
    if (Array.isArray(trustStripProp) && trustStripProp.length > 0) return trustStripProp;
    return DEFAULT_CAROUSEL_TRUST_STRIP;
  }, [trustStripProp]);

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
    <div className="relative w-full h-[calc(100dvh-8rem)] min-h-[560px] max-h-[800px] overflow-hidden">
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
          </div>
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center py-10 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`flex flex-col gap-8 lg:gap-10 xl:gap-12 w-full items-stretch ${
              aside ? 'lg:flex-row lg:items-center lg:justify-between' : ''
            }`}
          >
            <div
              key={slide.id}
              className={`min-w-0 ${aside ? 'lg:flex-1 lg:max-w-2xl xl:max-w-3xl' : 'max-w-3xl'}`}
            >
              <p className="font-sans text-[11px] lg:text-xs text-gold uppercase tracking-[0.15em] font-semibold mb-6 animate-slide-down">
                {slide.tagline}
              </p>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6 animate-slide-down">
                <span className="text-white">{slide.heading}</span>
                <br />
                <span className="text-gold">{slide.headingAccent}</span>
              </h1>

              <p className="font-sans text-base lg:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl animate-slide-down">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-down">
                <Link to={slide.ctaPrimary.link}>
                  <button
                    type="button"
                    className="px-8 py-4 bg-gold text-navy font-sans text-sm font-bold rounded-md transition-all duration-200 hover:brightness-110 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/30 flex items-center justify-center gap-2.5 w-full sm:w-auto"
                  >
                    {slide.ctaPrimary.text}
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </Link>
                <Link to={slide.ctaSecondary.link}>
                  <button
                    type="button"
                    className="px-8 py-4 bg-transparent text-white font-sans text-sm font-semibold rounded-md border-2 border-white/50 transition-all duration-200 hover:bg-white/10 hover:border-white/70 w-full sm:w-auto"
                  >
                    {slide.ctaSecondary.text}
                  </button>
                </Link>
              </div>
            </div>

            {aside && (
              <div className="w-full lg:w-[min(100%,380px)] xl:w-[420px] flex-shrink-0 lg:mr-12 xl:mr-14 z-30">
                {aside}
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
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
    </div>
  );
};

export default HeroCarousel;
