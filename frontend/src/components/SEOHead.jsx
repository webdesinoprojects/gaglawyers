import { Helmet } from 'react-helmet-async';
import { OFFICE_ADDRESS_LINE } from '../constants/officeAddress';

const SEOHead = ({ 
  title = 'GAG Lawyers - Grover & Grover Advocates',
  description = 'Premier law firm in India providing expert legal services in corporate law, civil litigation, real estate, and family law.',
  keywords = 'lawyers, advocates, legal services, corporate law, civil litigation, delhi lawyers',
  ogImage = '',
  canonical = '',
}) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = canonical || url;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'GAG Lawyers',
    alternateName: 'Grover & Grover Advocates',
    description,
    url: origin,
    telephone: '+919996263370',
    email: 'contact@gaglawyers.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_ADDRESS_LINE,
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <script id="schema-org" type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
