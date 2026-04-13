import React from 'react';
import AnimatedStatValue from '../AnimatedStatValue';

const StatsBlock = ({ content }) => {
  if (!content.stats || content.stats.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-gradient-to-b from-navy to-[#0a1628] py-10 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center ${index > 0 ? 'sm:border-l sm:border-white/10 sm:pl-6 lg:pl-8' : ''}`}
            >
              <p className="mb-2 font-serif text-2xl font-semibold tabular-nums text-white md:text-3xl lg:text-4xl">
                <AnimatedStatValue value={stat.value} duration={1800} />
              </p>
              <p className="font-sans text-sm text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBlock;
