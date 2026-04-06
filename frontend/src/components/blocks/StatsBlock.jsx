import React from 'react';
import AnimatedStatValue from '../AnimatedStatValue';

const StatsBlock = ({ content }) => {
  if (!content.stats || content.stats.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-navy to-[#0a1628] py-16 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(content.stats.length, 4)} gap-8`}>
          {content.stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center ${index > 0 ? 'border-l border-white/10' : ''}`}
            >
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-2 tabular-nums">
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
