import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = ({ heading, content, background }) => {
  const { items = [] } = content || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  const isDark = background === 'dark';
  const sectionBg = isDark
    ? 'bg-gradient-to-br from-[#0e1f3d] via-[#12284b] to-[#17335f]'
    : 'bg-gradient-to-br from-[#f8fbff] via-white to-[#f2f6fc]';
  const headingColor = isDark ? 'text-white' : 'text-[#102847]';
  const subColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const cardBg = isDark ? 'bg-white/10' : 'bg-white';
  const cardBorder = isDark ? 'border-white/15' : 'border-slate-200';
  const quoteColor = isDark ? 'text-[#f5d98c]' : 'text-[#c9a84c]';
  const nameColor = isDark ? 'text-white' : 'text-[#102847]';
  const roleColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const bodyColor = isDark ? 'text-slate-200' : 'text-slate-700';

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, items.length - cardsPerView),
    [items.length, cardsPerView]
  );

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (isPaused || items.length <= cardsPerView) return undefined;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(id);
  }, [isPaused, items.length, cardsPerView, maxIndex]);

  const goPrev = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  const goNext = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  if (!items.length) return null;

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${sectionBg}`}>
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute left-12 top-10 h-56 w-56 rounded-full bg-[#c9a84c]/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className={`font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>{heading}</h2>
            <p className={`mt-2 font-sans text-sm ${subColor}`}>
              Real feedback from clients we represented with care and precision.
            </p>
          </div>

          {items.length > cardsPerView && (
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/60 text-[#102847] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/60 text-[#102847] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white"
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={`testimonial-${index}`}
                className="w-full flex-shrink-0 px-2"
                style={{ flexBasis: `${100 / cardsPerView}%` }}
              >
                <article
                  className={`h-full rounded-3xl border ${cardBorder} ${cardBg} p-6 shadow-[0_14px_36px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.16)]`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Quote className={`h-7 w-7 ${quoteColor}`} />
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt={item.name || 'Client photo'}
                        className="h-12 w-12 rounded-full border border-white/30 object-cover"
                      />
                    ) : null}
                  </div>
                  <p className={`font-sans text-[1.02rem] leading-7 ${bodyColor}`}>“{item.quote}”</p>
                  <div className="mt-6 border-t border-white/15 pt-4">
                    <p className={`font-serif text-lg font-bold ${nameColor}`}>{item.name}</p>
                    <p className={`font-sans text-sm ${roleColor}`}>{item.role}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {items.length > cardsPerView && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-[#c9a84c]' : 'w-2.5 bg-slate-300'
                }`}
                aria-label={`Go to testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
