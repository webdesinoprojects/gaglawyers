import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { OFFICE_ADDRESS_LINE } from '../constants/officeAddress';
import { FOOTER_DEFAULT_LINKS } from '../constants/socialLinks';
import { getGlobalSettings } from '../utils/globalSettings';

const SEOHead = ({ 
  title = 'GAG Lawyers - Grover & Grover Advocates',
  description = 'GAG Lawyers - Grover & Grover Advocates: Trusted legal experts for your every need. Your path to legal solutions starts here',
  keywords = 'lawyers, advocates, legal services, corporate law, civil litigation, delhi lawyers',
  ogTitle = '',
  ogDescription = '',
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
  const [socialProfileUrls, setSocialProfileUrls] = useState(
    FOOTER_DEFAULT_LINKS.map((link) => link.url),
  );

  useEffect(() => {
    let cancelled = false;
    getGlobalSettings().then((settings) => {
      if (cancelled) return;
      const links = Array.isArray(settings?.socialLinks) ? settings.socialLinks : null;
      if (links?.length) {
        setSocialProfileUrls(
          links
            .filter((link) => link?.url)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((link) => link.url),
        );
      }
    });
    return () => { cancelled = true; };
  }, []);

  const rawSite = (import.meta.env.VITE_SITE_URL || 'https://gaglawyers.com').replace(/\/+$/, '');
  const configuredSiteUrl = rawSite.replace(/^https:\/\/www\.(?=gaglawyers\.com)/i, 'https://');
  const { pathname } = useLocation();
  // Remove trailing slash for non-root paths to prevent duplicate-URL indexing
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  const currentFullUrl = `${configuredSiteUrl}${normalizedPath}`;
  // Use explicit canonical if provided, else derive from current router location
  const canonicalUrl = (canonical || currentFullUrl).split('#')[0];
  const origin = configuredSiteUrl;
  const defaultOgImage = `${origin}/logo.png`;
  const finalOgImage = ogImage || defaultOgImage;
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;

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
      // 110085 = Prashant Vihar / Sector 14, Rohini (client-confirmed).
      // Was 110001, left over from the firm's previous Connaught Place address.
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    // LOCAL-01: client-confirmed hours. Sunday is omitted, which schema.org
    // treats as closed. Note the Google Business Profile currently shows 9am;
    // the client confirmed 10am, so the profile needs updating to match.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
    ],
    sameAs: socialProfileUrls,
    // SCHEMA-01: no aggregateRating here, deliberately.
    //
    // This previously declared a hardcoded 4.8 / 150 reviews. Those numbers were
    // typed by hand and matched nothing: the Google Business Profile shows 4
    // reviews, and the site's own CMS holds 16. Removed with client approval.
    //
    // Do not re-add it using the Google Business Profile figures either — Google's
    // review-snippet guidelines don't permit marking up ratings sourced from a
    // third-party platform on your own site, and Google already surfaces the
    // profile rating in local results without this. It may only return if the site
    // collects genuine first-party reviews and the value is computed from them.
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
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GAG Lawyers" />
      <meta property="og:locale" content="en_IN" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
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
