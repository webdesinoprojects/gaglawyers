import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

const readEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    out[key] = value;
  }
  return out;
};

const env = {
  ...readEnvFile(path.join(ROOT, '.env')),
  ...readEnvFile(path.join(ROOT, '.env.local')),
  ...readEnvFile(path.join(ROOT, '.env.production')),
  ...readEnvFile(path.join(ROOT, '.env.production.local')),
};

const API_BASE_URL = env.VITE_API_URL || process.env.VITE_API_URL || '';
const SITE_URL = (env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://gaglawyers.com').replace(/\/+$/, '');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const injectSeo = (html, seo) => {
  let result = html;

  // Replace title and description in-place
  result = result.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  result = result.replace(/<meta\s+name="description"[^>]*\/?>/gi, `<meta name="description" content="${escapeHtml(seo.description)}" />`);

  // Strip ALL existing SEO tags that we will re-inject — prevents duplicate/conflicting tags
  // when dist/index.html already has homepage SEO from a previous prerender run
  result = result.replace(/<link\s+rel="canonical"[^>]*\/?>/gi, '');
  result = result.replace(/<meta\s+name="keywords"[^>]*\/?>/gi, '');
  result = result.replace(/<meta\s+property="og:[^"]*"[^>]*\/?>/gi, '');
  result = result.replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>/gi, '');

  const newTags = [
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  ].join('\n    ');

  return result.replace('</head>', `    ${newTags}\n  </head>`);
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const writeRouteFile = (routePath, html) => {
  const normalized = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
  const targetDir = normalized ? path.join(DIST_DIR, normalized) : DIST_DIR;
  ensureDir(targetDir);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
};

const buildServiceSeo = (service) => {
  const name = String(service?.name || 'Service').trim();
  const title = String(service?.seo?.title || `${name} - GAG Lawyers`).trim();
  const description = String(
    service?.seo?.metaDescription ||
      service?.seo?.description ||
      `Professional legal assistance for ${name.toLowerCase()} matters from GAG Lawyers.`
  ).trim();
  const keywords = String(
    service?.seo?.keywords || `${name}, ${name} lawyer, legal services, GAG Lawyers`
  ).trim();
  const slug = String(service?.slug || '').trim();
  return {
    route: `/${slug}`,
    seo: {
      title,
      description,
      keywords,
      canonical: `${SITE_URL}/${slug}`,
    },
  };
};

const buildLocationSeo = (page) => {
  const slug = String(page?.slug || '').trim();
  const city = String(page?.city || '').trim();
  const serviceName = String(page?.serviceName || '').trim();
  const title = String(page?.seo?.title || `${serviceName} Lawyer in ${city} | GAG Lawyers`).trim();
  const description = String(
    page?.seo?.description ||
      `Expert ${serviceName.toLowerCase()} legal services in ${city}. Contact GAG Lawyers for trusted legal representation and case guidance.`
  ).trim();
  const keywords = String(
    page?.seo?.keywords || `${serviceName}, ${city}, lawyer, advocate, GAG Lawyers`
  ).trim();
  return {
    route: `/${slug}`,
    seo: { title, description, keywords, canonical: `${SITE_URL}/${slug}` },
  };
};

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
};

const getServices = async () => {
  if (!API_BASE_URL) return [];
  const data = await fetchJson(`${API_BASE_URL}/api/services`);
  if (!data?.success || !Array.isArray(data?.data)) return [];
  return data.data.filter((s) => s?.slug);
};

// Max location pages to prerender at build time.
// For very large sites (61k+), set PRERENDER_LOCATION_LIMIT=0 to skip prerendering
// and rely on the backend SSR injection middleware instead.
const PRERENDER_LIMIT = process.env.PRERENDER_LOCATION_LIMIT !== undefined
  ? parseInt(process.env.PRERENDER_LOCATION_LIMIT, 10)
  : 5000;

// Process location pages in streaming batches — never loads all pages into memory at once.
// Calls onBatch(pages[]) for each fetched batch so callers can write files immediately.
const streamLocationPages = async (onBatch) => {
  if (!API_BASE_URL) return 0;
  if (PRERENDER_LIMIT === 0) {
    console.log('Location prerendering skipped (PRERENDER_LOCATION_LIMIT=0). Backend SSR handles these.');
    return 0;
  }

  const BATCH = 500;
  let fetched = 0;
  let currentPage = 1;

  while (true) {
    if (PRERENDER_LIMIT > 0 && fetched >= PRERENDER_LIMIT) break;
    const remaining = PRERENDER_LIMIT > 0 ? PRERENDER_LIMIT - fetched : BATCH;
    const batchSize = Math.min(BATCH, remaining);

    const data = await fetchJson(
      `${API_BASE_URL}/api/locations?page=${currentPage}&limit=${batchSize}`
    );
    if (!data?.success || !Array.isArray(data?.data) || data.data.length === 0) break;

    const valid = data.data.filter((p) => p?.slug && p?.isActive !== false);
    await onBatch(valid);
    fetched += valid.length;

    process.stdout.write(`\r  Location pages written: ${fetched}...`);

    const totalPages = data?.total ? Math.ceil(data.total / batchSize) : 1;
    if (currentPage >= totalPages) break;
    currentPage++;
  }

  process.stdout.write('\n');
  return fetched;
};

const main = async () => {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error('dist/index.html not found. Run vite build first.');
  }

  const baseTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const staticPages = [
    {
      route: '/',
      seo: {
        title: 'GAG Lawyers - Grover & Grover Advocates',
        description:
          'GAG Lawyers - Grover & Grover Advocates: Trusted legal experts for your every need. Your path to legal solutions starts here',
        keywords:
          'GAG Lawyers, Grover and Grover Advocates, legal services India, corporate law, civil litigation, family law, property law, lawyers',
        canonical: `${SITE_URL}/`,
      },
    },
    {
      route: '/about',
      seo: {
        title: 'About GAG Lawyers - Grover & Grover Advocates',
        description: 'Learn about GAG Lawyers – our history, values, and commitment to providing trusted legal services across India.',
        keywords: 'about GAG Lawyers, Grover and Grover Advocates, law firm history, legal experts India',
        canonical: `${SITE_URL}/about`,
      },
    },
    {
      route: '/services',
      seo: {
        title: 'Legal Services - 25+ Practice Areas | GAG Lawyers',
        description:
          'Expert legal services across multiple practice areas including corporate law, criminal defense, civil litigation, family law, and real estate.',
        keywords:
          'legal services, advocates, litigation, legal consultation, law firm practice areas',
        canonical: `${SITE_URL}/services`,
      },
    },
    {
      route: '/team',
      seo: {
        title: 'Our Team | GAG Lawyers - Grover & Grover Advocates',
        description: 'Meet our team led by Advocate Rahul Grover. Skilled lawyers and professionals combining legal excellence with personal commitment to client success.',
        keywords: 'legal team, advocate rahul grover, law firm team, lawyers in india, legal specialists',
        canonical: `${SITE_URL}/team`,
      },
    },
    {
      route: '/contact',
      seo: {
        title: 'Contact GAG Lawyers | Schedule a Legal Consultation',
        description: 'Get in touch with GAG Lawyers – Grover & Grover Advocates for expert legal advice and representation across India.',
        keywords: 'contact GAG Lawyers, legal consultation, schedule appointment, law firm contact',
        canonical: `${SITE_URL}/contact`,
      },
    },
    {
      route: '/articles',
      seo: {
        title: 'Legal Insights & News | GAG Lawyers Articles',
        description:
          'Stay informed with expert legal analysis, case updates, and insights on Indian law from GAG Lawyers.',
        keywords:
          'legal articles, law updates, legal insights, corporate law news, litigation updates',
        canonical: `${SITE_URL}/articles`,
      },
    },
    {
      route: '/careers',
      seo: {
        title: 'Careers at GAG Lawyers | Join Our Legal Team',
        description: 'Explore career opportunities at GAG Lawyers – Grover & Grover Advocates. Join a dynamic legal team committed to excellence.',
        keywords: 'legal careers, law firm jobs, advocate positions, GAG Lawyers careers',
        canonical: `${SITE_URL}/careers`,
      },
    },
    {
      route: '/gallery',
      seo: {
        title: 'Image Gallery | GAG Lawyers - Grover & Grover Advocates',
        description: 'Visual journey into the life of GAG Lawyers - courtroom advocacy, client engagements, events, milestones, and community outreach.',
        keywords: 'law firm gallery, courtroom photos, legal events, firm milestones',
        canonical: `${SITE_URL}/gallery`,
      },
    },
  ];

  let services = [];

  try {
    services = await getServices();
    console.log(`Fetched ${services.length} service pages.`);
  } catch (err) {
    console.warn('Warning: Could not fetch services:', err.message);
  }

  // Write static and service pages
  const allPages = [...staticPages, ...services.map(buildServiceSeo)];
  for (const page of allPages) {
    const html = injectSeo(baseTemplate, page.seo);
    writeRouteFile(page.route, html);
  }
  console.log(`Written ${allPages.length} static + service pages.`);

  // Stream location pages in batches — memory efficient for 61k+ pages
  let locationCount = 0;
  try {
    locationCount = await streamLocationPages(async (batch) => {
      for (const page of batch) {
        const entry = buildLocationSeo(page);
        const html = injectSeo(baseTemplate, entry.seo);
        writeRouteFile(entry.route, html);
      }
    });
  } catch (err) {
    console.warn('Warning: Could not prerender location pages:', err.message);
    console.warn('Tip: Set PRERENDER_LOCATION_LIMIT=0 and use the backend SSR middleware for location pages.');
  }

  const total = allPages.length + locationCount;
  console.log(`Prerendered SEO HTML for ${total} routes (${staticPages.length} static + ${services.length} services + ${locationCount} locations).`);
};

main().catch((error) => {
  console.error('prerender-seo failed:', error.message);
  process.exit(1);
});
