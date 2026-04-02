import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-sans font-medium rounded-sm transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-dark focus:ring-navy',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-navy focus:ring-white',
    /** For light backgrounds (admin cards, SEO Manager, etc.) */
    outline: 'bg-white text-navy border-2 border-gray-300 hover:bg-gray-50 hover:border-navy/30 focus:ring-navy shadow-sm',
    gold: 'bg-gold text-navy hover:bg-gold/90 focus:ring-gold',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
