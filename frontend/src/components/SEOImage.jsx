import React from 'react';

/**
 * SEO-friendly image component with proper alt text and lazy loading
 * Usage: <SEOImage src="..." alt="..." />
 */
const SEOImage = ({ 
  src, 
  alt, 
  title = '',
  width,
  height,
  className = '', 
  loading = 'lazy',
  decoding = 'async',
  ...props 
}) => {
  // Ensure alt text is always provided
  const finalAlt = alt || 'GAG Lawyers - Legal Services';
  
  return (
    <img 
      src={src}
      alt={finalAlt}
      title={title || finalAlt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
};

export default SEOImage;
