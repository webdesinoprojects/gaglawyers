import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedStatValue from './AnimatedStatValue';

const HeroCarousel = ({ aside = null }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
      tagline: 'Grover and Grover Advocates and Solicitors',
      heading: 'Precision in Law.',
      headingAccent: 'Excellence in Practice.',
      description: "India's premier law firm delivering strategic legal counsel across corporate, litigation, and regulatory matters for over two decades.",
      ctaPrimary: { text: 'Schedule a Consultation', link: '/contact' },
      ctaSecondary: { text: 'Our Practice Areas', link: '/services' }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80',
      tagline: 'Expert Legal Representation',
      heading: 'Your Trusted',
      headingAccent: 'Legal Partners.',
      description: 'Comprehensive legal solutions tailored to your unique needs. From corporate law to civil litigation, we stand by your side.',
      ctaPrimary: { text: 'Get Legal Advice', link: '/contact' },
      ctaSecondary: { text: 'View Services', link: '/services' }
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1920&q=80',
      tagline: 'Proven Track Record',
      heading: '20+ Years of',
      headingAccent: 'Legal Excellence.',
      description: 'With over 5000 cases won and a 98% success rate, we bring unmatched expertise and dedication to every case.',
      ctaPrimary: { text: 'Consult Our Experts', link: '/contact' },
      ctaSecondary: { text: 'Our Achievements', link: '/awards' }
    }
  ];

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
      {/* Slide backgrounds only (cross-fade) */}
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
              alt={s.heading}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
          </div>
        </div>
      ))}

      {/* Hero copy + book form: single layer so the form is not duplicated per slide */}
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

      {/* Navigation Arrows */}
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

      {/* Slide Indicators */}
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

      {/* Trust Indicators - Overlay on carousel */}
      <div className="absolute bottom-20 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-12 py-6 px-8 bg-navy/40 backdrop-blur-md rounded-xl border border-white/10 max-w-fit">
            <div className="text-center lg:text-left">
              <p className="font-serif text-3xl lg:text-4xl font-bold text-white tabular-nums">
                <AnimatedStatValue value="20+" duration={1600} />
              </p>
              <p className="font-sans text-xs lg:text-sm text-gray-300 mt-1">Years Experience</p>
            </div>
            <div className="w-px h-12 bg-white/30 hidden sm:block"></div>
            <div className="text-center lg:text-left">
              <p className="font-serif text-3xl lg:text-4xl font-bold text-white tabular-nums">
                <AnimatedStatValue value="5000+" duration={2000} />
              </p>
              <p className="font-sans text-xs lg:text-sm text-gray-300 mt-1">Cases Won</p>
            </div>
            <div className="w-px h-12 bg-white/30 hidden sm:block"></div>
            <div className="text-center lg:text-left">
              <p className="font-serif text-3xl lg:text-4xl font-bold text-white tabular-nums">
                <AnimatedStatValue value="98%" duration={1400} />
              </p>
              <p className="font-sans text-xs lg:text-sm text-gray-300 mt-1">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
