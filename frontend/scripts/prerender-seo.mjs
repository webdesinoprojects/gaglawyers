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
const SITE_URL = (env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://www.gaglawyers.com').replace(/\/+$/, '');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const injectSeo = (html, seo) => {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  ].join('\n    ');

  return html.replace('</head>', `    ${tags}\n  </head>`);
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

const getServices = async () => {
  if (!API_BASE_URL) return [];
  const response = await fetch(`${API_BASE_URL}/api/services`);
  const data = await response.json();
  if (!data?.success || !Array.isArray(data?.data)) return [];
  return data.data.filter((s) => s?.slug);
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
  ];

  const services = await getServices();
  const servicePages = services.map(buildServiceSeo);
  const pages = [...staticPages, ...servicePages];

  for (const page of pages) {
    const html = injectSeo(baseTemplate, page.seo);
    writeRouteFile(page.route, html);
  }

  console.log(`Prerendered SEO HTML for ${pages.length} routes.`);
};

main().catch((error) => {
  console.error('prerender-seo failed:', error.message);
  process.exit(1);
});

