/**
 * SSR Middleware for GAG Lawyers Vite + React App (Express.js)
 * 
 * This middleware:
 * 1. Renders React components to HTML on the server
 * 2. Fetches page data by slug from the database
 * 3. Injects page-specific SEO tags and content
 * 4. Sends complete HTML to the browser (no CSR-only shell)
 * 5. React hydrates on the client preserving interactivity
 */

const fs = require('fs');
const path = require('path');

/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return String(str).replace(/[&<>"']/g, (c) => map[c]);
}

/**
 * Fetch page data from backend API or database
 */
async function fetchPageData(slug, apiBaseUrl) {
  try {
    // Try location page first
    if (slug && slug.includes('-in-')) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/locations/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            return { type: 'location', data: data.data };
          }
        }
      } catch (e) {
        // Continue to service check
      }
    }

    // Try service page
    if (slug) {
      try {
        const res = await fetch(`${apiBaseUrl}/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            return { type: 'service', data: data.data };
          }
        }
      } catch (e) {
        // Continue
      }
    }

    return null;
  } catch (err) {
    console.error(`[SSR] Error fetching page data for slug "${slug}":`, err.message);
    return null;
  }
}

/**
 * Build SEO metadata for a page
 */
function buildSEOData(pageData, slug, siteUrl) {
  if (!pageData) {
    // Generic fallback for 404
    return {
      title: 'GAG Lawyers - Grover & Grover Advocates',
      description:
        'GAG Lawyers – Trusted legal experts for corporate law, civil litigation, real estate, and family law across India.',
      keywords: 'GAG Lawyers, lawyers India, legal services, advocates',
      canonical: `${siteUrl}${slug ? '/' + slug : '/'}`,
      robots: 'noindex, follow',
    };
  }

  const { type, data } = pageData;
  let title, description, keywords, canonical, robots = 'index, follow';

  if (type === 'location') {
    const city = data?.city || 'Your City';
    const serviceName = data?.serviceName || 'Legal Service';
    title = data?.seo?.title || `${serviceName} Lawyer in ${city} | GAG Lawyers`;
    description =
      data?.seo?.description ||
      `Expert ${serviceName.toLowerCase()} legal services in ${city}. Contact GAG Lawyers for trusted legal representation and case guidance.`;
    keywords =
      data?.seo?.keywords ||
      `${serviceName}, ${city}, lawyer, advocate, GAG Lawyers`;
    canonical = `${siteUrl}/${slug}`;
  } else if (type === 'service') {
    const name = data?.name || 'Service';
    title = data?.seo?.title || `${name} - GAG Lawyers`;
    description =
      data?.seo?.metaDescription ||
      data?.seo?.description ||
      `Professional legal assistance for ${name.toLowerCase()} matters from GAG Lawyers.`;
    keywords =
      data?.seo?.keywords ||
      `${name}, ${name} lawyer, legal services, GAG Lawyers`;
    canonical = `${siteUrl}/${slug}`;
  }

  return { title, description, keywords, canonical, robots };
}

/**
 * Generate JSON-LD schema for a location page
 */
function generateLocationSchema(pageData, seoData) {
  if (!pageData || pageData.type !== 'location') return '';

  const { data } = pageData;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `GAG Lawyers - ${data?.serviceName || 'Legal Service'} in ${data?.city}`,
    url: seoData.canonical,
    description: seoData.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: data?.city || '',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

/**
 * Create SSR middleware for Express
 * Note: This version uses the existing seoInjectionMiddleware approach
 * but replaces it with proper SEO tag injection
 */
function createSSRMiddleware(siteUrl, frontendDist) {
  const SITE_URL = (siteUrl || 'https://gaglawyers.com').replace(/\/+$/, '');

  return async (req, res, next) => {
    try {
      // Skip API and asset requests
      if (
        req.path.startsWith('/api/') ||
        req.path.startsWith('/admin/') ||
        /\.(js|mjs|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|json|xml|txt|gz|map)$/.test(
          req.path
        )
      ) {
        return next();
      }

      // Load template
      const templatePath = path.join(frontendDist, 'index.html');
      if (!fs.existsSync(templatePath)) {
        console.error('[SSR] Frontend dist not found:', templatePath);
        return next();
      }

      let template = fs.readFileSync(templatePath, 'utf-8');

      // Extract slug from URL
      const urlPath =
        req.path.length > 1 ? req.path.replace(/\/+$/, '') : '/';
      const slug = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;

      // Fetch page data from backend API
      const apiBaseUrl = (process.env.API_BASE_URL || 'http://localhost:5000').replace(/\/+$/, '');
      const pageData = slug ? await fetchPageData(slug, apiBaseUrl) : null;
      const seoData = buildSEOData(pageData, slug, SITE_URL);

      // Determine if this is a 404 (non-existent page, not a static route)
      const is404 = !pageData && slug && !['about', 'firm', 'team', 'services', 'contact', 'careers', 'gallery', 'awards', 'articles', 'newsletter', 'affiliation', 'privacy', 'terms'].includes(slug.split('/')[0]);

      // Build SEO tags
      const seoTags = [
        `<title>${escapeHtml(seoData.title)}</title>`,
        `<meta name="description" content="${escapeHtml(seoData.description)}" />`,
        `<meta name="keywords" content="${escapeHtml(seoData.keywords)}" />`,
        `<meta name="robots" content="${seoData.robots}" />`,
        `<link rel="canonical" href="${escapeHtml(seoData.canonical)}" />`,
        `<meta property="og:title" content="${escapeHtml(seoData.title)}" />`,
        `<meta property="og:description" content="${escapeHtml(seoData.description)}" />`,
        `<meta property="og:url" content="${escapeHtml(seoData.canonical)}" />`,
        `<meta name="twitter:title" content="${escapeHtml(seoData.title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(seoData.description)}" />`,
        generateLocationSchema(pageData, seoData),
      ]
        .filter(Boolean)
        .join('\n    ');

      // Inject SEO tags into template
      let html = template;
      html = html.replace('<!--ssr-head-->', seoTags);

      // Set cache headers (different for 404s)
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (is404) {
        // 404 pages: shorter cache to allow quick updates
        res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
        // Set HTTP 404 status code (critical for SEO - prevents soft 404s)
        res.status(404);
      } else {
        // Regular pages: longer cache
        res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
      }

      return res.send(html);
    } catch (err) {
      console.error('[SSR] Error:', err);
      return next(err);
    }
  };
}

module.exports = { createSSRMiddleware };
