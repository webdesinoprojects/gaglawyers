const fs = require('fs');
const path = require('path');

const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');
const LocationPage = require('../models/LocationPage');

const SITE_URL = (process.env.SITE_URL || 'https://gaglawyers.com').replace(/\/+$/, '');
const SITE_URL_INFO = new URL(SITE_URL);
const CANONICAL_HOST = SITE_URL_INFO.host;
const CANONICAL_ORIGIN = SITE_URL_INFO.origin;

// Resolve the built frontend index.html — configurable via env for flexible deployments
const FRONTEND_DIST = process.env.FRONTEND_DIST_PATH
  ? path.resolve(process.env.FRONTEND_DIST_PATH)
  : path.join(__dirname, '../../frontend/dist');

let _cachedTemplate = null;

// SEO-03: section content is per-service (56 of them) but needed by 61k+ location
// pages, so cache it in memory rather than hitting Mongo on every page view.
// Short TTL so edits made in the admin appear without a restart.
const SECTIONS_TTL_MS = 5 * 60 * 1000;
const _sectionsCache = new Map();

const getServiceSections = async (serviceId) => {
  if (!serviceId) return [];
  const key = String(serviceId);
  const hit = _sectionsCache.get(key);
  if (hit && Date.now() - hit.at < SECTIONS_TTL_MS) return hit.sections;
  // Sections live in their own collection, not on the Service document. Mirrors
  // the query in serviceController.getServicePageData so the server-rendered
  // content matches what the page actually shows.
  const sections = await ServiceSection.find({
    serviceId,
    visible: true,
    type: { $ne: 'cta_banner' },
  })
    .sort({ order: 1 })
    .lean();
  _sectionsCache.set(key, { at: Date.now(), sections });
  return sections;
};

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

const isHtmlPageRequest = (p = '') =>
  !p.startsWith('/api/') &&
  !p.match(/\.(js|mjs|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|json|xml|txt|gz|map)$/);

const buildRedirectTarget = (req, normalizedPath) => {
  const requestHost = String(req.get('host') || '').toLowerCase();
  const canonicalHost = String(CANONICAL_HOST || '').toLowerCase();
  const hostIsProductionDomain = /(^|\.)gaglawyers\.com(?::\d+)?$/i.test(requestHost);
  const shouldRedirectHost =
    process.env.NODE_ENV === 'production' &&
    hostIsProductionDomain &&
    requestHost &&
    canonicalHost &&
    requestHost !== canonicalHost;
  const shouldRedirectSlash = req.path.length > 1 && req.path.endsWith('/');

  if (!shouldRedirectHost && !shouldRedirectSlash) return '';

  const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
  const origin =
    process.env.NODE_ENV === 'production' && hostIsProductionDomain
      ? CANONICAL_ORIGIN
      : `${req.protocol}://${req.get('host')}`;
  return `${origin}${normalizedPath}${query}`;
};

const stripSiteSuffix = (value = '') =>
  String(value)
    .replace(/\s*\|\s*GAG Lawyers\s*$/i, '')
    .replace(/\s*-\s*GAG Lawyers\s*$/i, '')
    .trim();

// SEO-03. Service sections are authored once and shared by every city page for
// that service, with the city swapped in at render time. This mirrors the first
// pass of the frontend pipeline (LocationPageDynamic `localizeText`) so the
// server-rendered copy names the correct city. The frontend additionally applies
// cosmetic passes (heading suffixes, de-duplicating "in <city>"); we skip those
// deliberately — the text here is the same content and the same meaning, just
// less polished, which keeps this simple and avoids two copies of fiddly regex.
const localizeText = (value, city) => {
  if (typeof value !== 'string' || !city) return value;
  return value
    .replace(/\bNew Delhi\b/gi, city)
    .replace(/\bDelhi\b/gi, city)
    .replace(/\{city\}/gi, city);
};

// Flatten one section's content into plain paragraphs. Section shapes vary by
// type: overview => {body}, benefits/faq => {items:[...]}, hero => {description}.
const sectionParagraphs = (content) => {
  if (!content || typeof content !== 'object') return [];
  const out = [];
  if (typeof content.description === 'string') out.push(content.description);
  if (typeof content.body === 'string') out.push(content.body);
  if (Array.isArray(content.items)) {
    content.items.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const label = item.title || item.question || '';
      const text = item.description || item.answer || '';
      if (label || text) out.push([label, text].filter(Boolean).join(': '));
    });
  }
  return out.filter((t) => typeof t === 'string' && t.trim());
};

const buildFallbackContent = ({ title, description, canonical, robots, page, sections }) => {
  if (String(robots || '').toLowerCase().includes('noindex')) {
    return '';
  }

  const city = page?.city || '';
  // page.content.heading/intro are stored per page and already contain the city
  // (generated as `${serviceName} in ${city}`), so they need no localisation and
  // match the H1/intro the visitor sees.
  const heading = page?.content?.heading || stripSiteSuffix(title) || 'GAG Lawyers';
  const intro = page?.content?.intro || description;

  const parts = [
    '<main class="seo-fallback-content" data-seo-fallback="true">',
    `<h1>${escHtml(heading)}</h1>`,
    `<p>${escHtml(intro)}</p>`,
  ];

  (Array.isArray(sections) ? sections : []).forEach((section) => {
    // The hero section supplies the H1 and intro above, so skip it here rather
    // than repeating the same heading immediately as an <h2>.
    if (section?.type === 'hero') return;
    const secHeading = localizeText(section?.heading || '', city);
    if (secHeading) parts.push(`<h2>${escHtml(secHeading)}</h2>`);
    sectionParagraphs(section?.content).forEach((text) => {
      parts.push(`<p>${escHtml(localizeText(text, city))}</p>`);
    });
  });

  parts.push(`<a href="${escHtml(canonical)}">View page</a>`, '</main>');
  return parts.join('');
};

// react-helmet-async marks the tags it manages with data-rh. Stamping the same
// attribute on the tags we inject server-side lets Helmet *replace* them on
// hydration instead of appending a second copy — otherwise every page ends up
// with two canonicals, two descriptions and two keywords in the rendered DOM.
// The attribute is inert for crawlers that never execute JS.
const RH = 'data-rh="true"';

const injectIntoHtml = (template, { title, description, keywords, canonical, robots = 'index, follow', page = null, sections = null }) => {
  let html = template;

  // Replace title and description in-place
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escHtml(title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*\/?>/gi, `<meta name="description" content="${escHtml(description)}" ${RH} />`);

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
    `<meta name="robots" content="${robots}" ${RH} />`,
    `<link rel="canonical" href="${escHtml(canonical)}" ${RH} />`,
    `<meta name="keywords" content="${escHtml(keywords)}" ${RH} />`,
    `<meta property="og:title" content="${escHtml(title)}" ${RH} />`,
    `<meta property="og:description" content="${escHtml(description)}" ${RH} />`,
    `<meta property="og:url" content="${escHtml(canonical)}" ${RH} />`,
    `<meta name="twitter:title" content="${escHtml(title)}" ${RH} />`,
    `<meta name="twitter:description" content="${escHtml(description)}" ${RH} />`,
  ].join('\n  ');

  const fallbackContent = buildFallbackContent({ title, description, canonical, robots, page, sections });
  html = html.replace(/<div\s+id="root"\s*><\/div>/i, `<div id="root">${fallbackContent}</div>`);

  // JS-enabled visitors: hide the SEO fallback immediately and keep it hidden — React
  // takes over #root whenever it's ready (no timed "re-show", which used to flash the
  // fallback on cold/hard-refresh loads where the bundle took >3s). No-JS crawlers never
  // get the js-enabled class, so they still see the server-rendered fallback content.
  const fallbackVisibilityGuard = fallbackContent
    ? [
        '<script>',
        'document.documentElement.classList.add("js-enabled");',
        '</script>',
        '<style>.js-enabled .seo-fallback-content{display:none!important;}</style>',
      ].join('\n  ')
    : '';

  return html.replace('</head>', `  ${fallbackVisibilityGuard}\n  ${extraTags}\n</head>`);
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
  if (!isHtmlPageRequest(p)) {
    return next();
  }

  // Normalize path: strip trailing slash unless it's the root
  const urlPath = (p.length > 1 ? p.replace(/\/+$/, '') : '/');
  const redirectTarget = buildRedirectTarget(req, urlPath);
  if (redirectTarget) {
    return res.redirect(301, redirectTarget);
  }

  const template = getTemplate();
  if (!template) {
    // Frontend dist not available (local dev without a build) — skip injection
    return next();
  }

  const canonical = `${SITE_URL}${urlPath}`;

  if (urlPath === '/admin' || urlPath.startsWith('/admin/')) {
    const html = injectIntoHtml(template, {
      title: 'Admin | GAG Lawyers',
      description: 'GAG Lawyers admin portal.',
      keywords: 'GAG Lawyers admin',
      canonical,
      robots: 'noindex, nofollow',
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    return res.send(html);
  }

  let seoData = STATIC_SEO[urlPath] || null;
  // robots defaults to index,follow. Only set noindex when DB confirms page doesn't exist.
  let robots = 'index, follow';
  // SEO-03: populated for location pages so the fallback can render real content.
  let page = null;
  let sections = null;

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
          const found = await LocationPage.findOne({ slug, isActive: true })
            .select('seo city serviceName service content')
            .lean();
          if (found?.seo?.title) {
            page = found;
            seoData = {
              title: page.seo.title,
              description: page.seo.description || `Expert legal services in ${page.city} from GAG Lawyers.`,
              keywords: page.seo.keywords || `${page.serviceName}, ${page.city}, lawyers, GAG Lawyers`,
            };
            // SEO-03: pull the service's authored sections so crawlers receive the
            // real page content, not just a heading and one line. Only for
            // 'service' template pages — 'custom' pages render their own content,
            // and we must not publish text the visitor never sees.
            if (page.content?.templateMode !== 'custom') {
              try {
                sections = await getServiceSections(page.service);
              } catch (e) {
                console.error('[seoInjection] section lookup failed for', slug, e.message);
              }
            }
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

  const html = injectIntoHtml(template, { ...seoData, canonical, robots, page, sections });
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
