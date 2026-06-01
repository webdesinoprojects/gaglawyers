const fs = require('fs');
const path = require('path');

const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');

const SITE_URL = (process.env.SITE_URL || 'https://gaglawyers.com').replace(/\/+$/, '');

// Resolve the built frontend index.html — configurable via env for flexible deployments
const FRONTEND_DIST = process.env.FRONTEND_DIST_PATH
  ? path.resolve(process.env.FRONTEND_DIST_PATH)
  : path.join(__dirname, '../../frontend/dist');

let _cachedTemplate = null;

const getTemplate = () => {
  if (_cachedTemplate) return _cachedTemplate;
  const indexPath = path.join(FRONTEND_DIST, 'index.html');
  if (!fs.existsSync(indexPath)) return null;
  _cachedTemplate = fs.readFileSync(indexPath, 'utf8');
  return _cachedTemplate;
};

const escHtml = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const injectIntoHtml = (template, { title, description, keywords, canonical, robots = 'index, follow' }) => {
  let html = template;

  // Replace title and description in-place
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escHtml(title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*\/?>/gi, `<meta name="description" content="${escHtml(description)}" />`);

  // Strip ALL existing SEO tags we will re-inject — critical when dist/index.html
  // was overwritten by the prerender script with homepage-specific canonical/OG tags.
  // Without stripping, every page would inherit the homepage canonical as the first tag,
  // which Google picks over any later injected page-specific canonical.
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+name="keywords"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+name="robots"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/gi, '');

  const extraTags = [
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escHtml(canonical)}" />`,
    `<meta name="keywords" content="${escHtml(keywords)}" />`,
    `<meta property="og:title" content="${escHtml(title)}" />`,
    `<meta property="og:description" content="${escHtml(description)}" />`,
    `<meta property="og:url" content="${escHtml(canonical)}" />`,
    `<meta name="twitter:title" content="${escHtml(title)}" />`,
    `<meta name="twitter:description" content="${escHtml(description)}" />`,
  ].join('\n  ');

  return html.replace('</head>', `  ${extraTags}\n</head>`);
};

// ─── Static page SEO (no DB lookup needed) ────────────────────────────────────
const STATIC_SEO = {
  '/': {
    title: 'GAG Lawyers - Grover & Grover Advocates',
    description: 'GAG Lawyers – Grover & Grover Advocates: Trusted legal experts for corporate law, civil litigation, real estate, and family law across India.',
    keywords: 'GAG Lawyers, Grover Advocates, lawyers in India, legal services, corporate law, civil litigation, family law',
  },
  '/about': {
    title: 'About GAG Lawyers | Grover & Grover Advocates',
    description: 'Learn about GAG Lawyers – our history, values, and commitment to providing trusted legal services across India.',
    keywords: 'about GAG Lawyers, Grover and Grover Advocates, law firm history, legal experts India',
  },
  '/services': {
    title: 'Legal Services - 25+ Practice Areas | GAG Lawyers',
    description: 'Expert legal services across corporate law, criminal defense, civil litigation, family law, and real estate from GAG Lawyers.',
    keywords: 'legal services India, advocates, litigation, corporate law, family law, property law',
  },
  '/team': {
    title: 'Our Team | GAG Lawyers - Grover & Grover Advocates',
    description: 'Meet our legal team led by Advocate Rahul Grover. Skilled lawyers combining legal excellence with personal commitment.',
    keywords: 'GAG Lawyers team, advocate Rahul Grover, legal specialists, law firm team',
  },
  '/contact': {
    title: 'Contact GAG Lawyers | Schedule a Legal Consultation',
    description: 'Get in touch with GAG Lawyers for expert legal advice and representation across India. Schedule your consultation today.',
    keywords: 'contact GAG Lawyers, legal consultation, law firm contact, schedule appointment',
  },
  '/careers': {
    title: 'Careers at GAG Lawyers | Join Our Legal Team',
    description: 'Explore career opportunities at GAG Lawyers. Join a dynamic legal team committed to excellence and client service.',
    keywords: 'legal careers, law firm jobs, advocate positions, GAG Lawyers careers',
  },
  '/gallery': {
    title: 'Image Gallery | GAG Lawyers - Grover & Grover Advocates',
    description: 'Visual journey into the life of GAG Lawyers - courtroom advocacy, events, milestones, and community outreach.',
    keywords: 'GAG Lawyers gallery, law firm photos, legal events, courtroom advocacy',
  },
  '/articles': {
    title: 'Legal Insights & News | GAG Lawyers Articles',
    description: 'Expert legal analysis, case updates, and insights on Indian law from GAG Lawyers.',
    keywords: 'legal articles, law updates, legal insights, Indian law news',
  },
  '/newsletter': {
    title: 'Newsletter | GAG Lawyers - Resource Center',
    description: 'Legal newsletter updates and practical insights from GAG Lawyers Resource Center.',
    keywords: 'legal newsletter, law updates, resource center, GAG Lawyers',
  },
  '/firm': {
    title: 'The Firm | GAG Lawyers - Grover & Grover Advocates',
    description: 'Learn about GAG Lawyers as a firm – our structure, values, and commitment to legal excellence across India.',
    keywords: 'GAG Lawyers firm, law firm India, Grover Advocates, legal practice',
  },
  '/awards': {
    title: 'Awards & Recognition | GAG Lawyers',
    description: 'Recognitions and awards received by GAG Lawyers – Grover & Grover Advocates for excellence in legal services.',
    keywords: 'GAG Lawyers awards, law firm recognition, legal excellence, Grover Advocates',
  },
  '/affiliation': {
    title: 'Affiliations | GAG Lawyers - Grover & Grover Advocates',
    description: 'Professional affiliations and bar associations of GAG Lawyers – Grover & Grover Advocates.',
    keywords: 'GAG Lawyers affiliations, bar association, legal memberships',
  },
  '/privacy': {
    title: 'Privacy Policy | GAG Lawyers',
    description: 'Read the privacy policy of GAG Lawyers – Grover & Grover Advocates. Learn how we handle your data.',
    keywords: 'GAG Lawyers privacy policy, data protection, legal website privacy',
  },
  '/terms': {
    title: 'Terms of Service | GAG Lawyers',
    description: 'Read the terms and conditions for using GAG Lawyers website and legal services.',
    keywords: 'terms of service, legal terms, user agreement, GAG Lawyers',
  },
};

// ─── Main middleware ───────────────────────────────────────────────────────────
const seoInjectionMiddleware = async (req, res, next) => {
  // Skip API, assets, sitemaps, and anything not an HTML page request
  const p = req.path;
  if (
    p.startsWith('/api/') ||
    p.startsWith('/admin') ||
    p.match(/\.(js|mjs|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|json|xml|txt|gz|map)$/)
  ) {
    return next();
  }

  const template = getTemplate();
  if (!template) {
    // Frontend dist not available (local dev without a build) — skip injection
    return next();
  }

  // Normalize path: strip trailing slash unless it's the root
  const urlPath = (p.length > 1 ? p.replace(/\/+$/, '') : '/');
  const canonical = `${SITE_URL}${urlPath}`;

  let seoData = STATIC_SEO[urlPath] || null;
  // robots defaults to index,follow. Only set noindex when DB confirms page doesn't exist.
  let robots = 'index, follow';

  if (!seoData) {
    const slug = urlPath.replace(/^\//, '');

    // Multi-segment paths (articles/:slug, newsletter/:slug, services/:slug) — skip DB lookup.
    // React client handles SEO for these; serve generic fallback indexable HTML.
    if (slug.includes('/')) {
      seoData = null; // falls to generic fallback below
    } else {
      try {
        if (slug.includes('-in-')) {
          // Location page — direct DB lookup, no API overhead
          const page = await LocationPage.findOne({ slug, isActive: true })
            .select('seo city serviceName')
            .lean();
          if (page?.seo?.title) {
            seoData = {
              title: page.seo.title,
              description: page.seo.description || `Expert legal services in ${page.city} from GAG Lawyers.`,
              keywords: page.seo.keywords || `${page.serviceName}, ${page.city}, lawyers, GAG Lawyers`,
            };
          } else {
            // DB confirms this location page does not exist or is inactive
            robots = 'noindex, follow';
          }
        } else {
          // Service page — direct DB lookup
          const service = await Service.findOne({ slug, isActive: true })
            .select('name seo')
            .lean();
          if (service) {
            seoData = {
              title: service.seo?.title || `${service.name} - GAG Lawyers`,
              description: service.seo?.metaDescription || service.seo?.description || `Professional ${service.name.toLowerCase()} legal assistance from GAG Lawyers.`,
              keywords: service.seo?.keywords || `${service.name}, ${service.name} lawyer, legal services, GAG Lawyers`,
            };
          } else {
            // DB confirms this service slug does not exist or is inactive
            robots = 'noindex, follow';
          }
        }
      } catch (err) {
        // DB lookup failed — do NOT set noindex, could be a transient error
        console.error('[seoInjection] DB lookup error for', slug, err.message);
      }
    }
  }

  // Generic fallback for unknown/not-found routes
  if (!seoData) {
    seoData = {
      title: 'GAG Lawyers - Grover & Grover Advocates',
      description: 'GAG Lawyers – Trusted legal experts for corporate law, civil litigation, real estate, and family law across India.',
      keywords: 'GAG Lawyers, lawyers India, legal services, advocates',
    };
  }

  const html = injectIntoHtml(template, { ...seoData, canonical, robots });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // Determine if this is a 404 (robots = noindex indicates non-existent page)
  const is404 = robots.includes('noindex');
  
  // Set proper HTTP status code (CRITICAL: avoids soft 404s)
  if (is404) {
    res.status(404);
    // 404 pages: shorter cache to allow quick updates
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
  } else {
    // Regular pages: longer cache
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }
  
  return res.send(html);
};

module.exports = { seoInjectionMiddleware, FRONTEND_DIST };
