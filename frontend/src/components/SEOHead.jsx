import { Helmet } from 'react-helmet-async';
import { OFFICE_ADDRESS_LINE } from '../constants/officeAddress';

const SEOHead = ({ 
  title = 'GAG Lawyers - Grover & Grover Advocates',
  description = 'Premier law firm in India providing expert legal services in corporate law, civil litigation, real estate, and family law.',
  keywords = 'lawyers, advocates, legal services, corporate law, civil litigation, delhi lawyers',
  ogImage = '',
  canonical = '',
  author = 'GAG Lawyers',
  type = 'website',
  publishedTime = '',
  modifiedTime = '',
  article = null,
  breadcrumbs = [],
  faqSchema = null,
  serviceSchema = null,
  organizationSchema = true,
  robots = 'index, follow',
  language = 'en',
}) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://gaglawyers.com';
  const canonicalUrl = canonical || url;
  const defaultOgImage = `${origin}/og-image.jpg`;
  const finalOgImage = ogImage || defaultOgImage;

  // Base Organization Schema
  const organizationSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${origin}/#organization`,
    name: 'GAG Lawyers',
    alternateName: 'Grover & Grover Advocates',
    legalName: 'Grover & Grover Advocates & Solicitors',
    description,
    url: origin,
    logo: `${origin}/logo.png`,
    image: finalOgImage,
    telephone: '+919996263370',
    email: 'contact@gaglawyers.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_ADDRESS_LINE,
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    sameAs: [
      'https://www.facebook.com/gaglawyers',
      'https://www.linkedin.com/company/gaglawyers',
      'https://twitter.com/gaglawyers',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: 'GAG Lawyers',
    description: 'Premier legal services in India',
    publisher: {
      '@id': `${origin}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // WebPage Schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: {
      '@id': `${origin}/#website`,
    },
    about: {
      '@id': `${origin}/#organization`,
    },
    datePublished: publishedTime || new Date().toISOString(),
    dateModified: modifiedTime || new Date().toISOString(),
    inLanguage: language,
  };

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${origin}${crumb.url}`,
    })),
  } : null;

  // Article Schema (for blog posts)
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: finalOgImage,
    datePublished: article.publishedTime || publishedTime,
    dateModified: article.modifiedTime || modifiedTime,
    author: {
      '@type': 'Person',
      name: article.author || author,
    },
    publisher: {
      '@id': `${origin}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  } : null;

  // Combine all schemas
  const schemas = [
    organizationSchema && organizationSchemaData,
    websiteSchema,
    webPageSchema,
    breadcrumbSchema,
    articleSchema,
    faqSchema,
    serviceSchema,
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="language" content={language} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GAG Lawyers" />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:site" content="@gaglawyers" />
      <meta name="twitter:creator" content="@gaglawyers" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=yes" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemas.length === 1 ? schemas[0] : { '@graph': schemas })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
