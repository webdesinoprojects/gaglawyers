import React, { useState, useEffect, useRef } from 'react';

const StatCard = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Extract numeric value from string (e.g., "5000+" -> 5000)
  const numericValue = parseInt(value.toString().replace(/\D/g, '')) || 0;
  const suffix = value.toString().replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || numericValue === 0) return;

    let startTimestamp = null;
    const duration = 2000; // 2 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, numericValue]);

  return (
    <div ref={cardRef} className="text-center px-6 py-4">
      <div className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-2">
        {isVisible ? `${count}${suffix}` : value}
      </div>
      <div className="font-sans text-sm lg:text-base text-gray-600 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
