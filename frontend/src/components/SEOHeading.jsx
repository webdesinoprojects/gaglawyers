import React from 'react';

/**
 * SEO-friendly heading component that ensures proper heading hierarchy
 * Usage: <SEOHeading level={1}>Main Title</SEOHeading>
 */
const SEOHeading = ({ 
  level = 2, 
  children, 
  className = '', 
  id = '',
  ...props 
}) => {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
  
  return (
    <Tag 
      className={className} 
      id={id}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default SEOHeading;
