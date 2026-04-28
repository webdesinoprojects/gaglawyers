import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

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
  const subColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDark ? 'bg-white/[0.08]' : 'bg-white';
  const cardBorder = isDark ? 'border-white/[0.12]' : 'border-slate-200';
  const quoteColor = isDark ? 'text-[#f5d98c]' : 'text-[#c9a84c]';
  const nameColor = isDark ? 'text-white' : 'text-[#102847]';
  const roleColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const bodyColor = isDark ? 'text-slate-200' : 'text-slate-700';
  const navBtnBg = isDark
    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
    : 'bg-white border-slate-200 text-[#102847] hover:bg-slate-50 hover:border-[#c9a84c]/30';
  const badgeColor = isDark
    ? 'border-[#c9a84c]/30 bg-[#c9a84c]/10 text-[#f5d98c]'
    : 'border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#7a5c10]';

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
    <section className={`relative overflow-hidden py-20 md:py-24 ${sectionBg}`}>
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#c9a84c]/18 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-48 w-48 rounded-full bg-[#0B1F3A]/8 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-widest ${badgeColor}`}>
              <Star size={11} />
              <span>Client Stories</span>
            </div>
            <h2 className={`mb-3 font-serif text-3xl font-bold md:text-4xl ${headingColor}`}>
              {heading}
            </h2>
            <div className="mb-1 h-px w-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8d490]" />
            <p className={`mt-3 font-sans text-sm ${subColor}`}>
              Real feedback from clients we represented with care and precision.
            </p>
          </div>

          {items.length > cardsPerView && (
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${navBtnBg}`}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${navBtnBg}`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
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
                  className={`relative h-full overflow-hidden rounded-3xl border ${cardBorder} ${cardBg} p-7 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.15)]`}
                >
                  {/* Gold top accent on card */}
                  <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

                  {/* Avatar + Quote icon row */}
                  <div className="mb-5 flex items-center justify-between">
                    {(() => {
                      const avatarSrc =
                        item.photoUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'Client')}&background=0A193C&color=C9A84C&size=64`;
                      return (
                        <img
                          src={avatarSrc}
                          alt={item.name || 'Client'}
                          loading="lazy"
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-[#c9a84c]/30"
                        />
                      );
                    })()}
                    <Quote className={`h-8 w-8 ${quoteColor}`} />
                  </div>

                  <p className={`font-sans text-[1.02rem] leading-7 ${bodyColor}`}>
                    "{item.quote}"
                  </p>

                  <div className={`mt-6 border-t ${cardBorder} pt-4`}>
                    <p className={`font-serif text-lg font-bold ${nameColor}`}>{item.name}</p>
                    <p className={`font-sans text-sm ${roleColor}`}>{item.role}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        {items.length > cardsPerView && (
          <div className="mt-7 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'h-2.5 w-8 bg-[#c9a84c]' : 'h-2.5 w-2.5 bg-slate-300'
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
