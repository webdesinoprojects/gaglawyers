import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title = 'GAG Lawyers - Grover & Grover Advocates',
  description = 'Premier law firm in India providing expert legal services in corporate law, civil litigation, real estate, and family law.',
  keywords = 'lawyers, advocates, legal services, corporate law, civil litigation, delhi lawyers',
  ogImage = '',
  canonical = '',
}) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }

    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');

    if (canonical) {
      updateLinkTag('canonical', canonical);
    } else {
      updateLinkTag('canonical', window.location.href);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: 'GAG Lawyers',
      alternateName: 'Grover & Grover Advocates',
      description: description,
      url: window.location.origin,
      telephone: '+919996263370',
      email: 'contact@gaglawyers.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressCountry: 'IN',
      },
    };

    const scriptTag = document.getElementById('schema-org');
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      const script = document.createElement('script');
      script.id = 'schema-org';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, ogImage, canonical, location]);

  const updateMetaTag = (name, content, attribute = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateLinkTag = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  return null;
};

export default SEOHead;
