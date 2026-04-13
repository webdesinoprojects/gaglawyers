require('dotenv').config();

const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Service = require('./models/Service');
const LocationPage = require('./models/LocationPage');

const APPLY = process.argv.includes('--apply');

const DOC_BASE = 'C:/Users/Krishna/Downloads/Updated GAG Lawyers Services Content and Locations/Updated GAG Lawyers Services Content and Locations';

const TARGETS = [
  {
    key: 'bail',
    file: 'Bail Lawyer.docx',
    serviceSlugs: ['bail-lawyer'],
  },
  {
    key: 'cat',
    file: 'cat matter.docx',
    serviceSlugs: ['cat-matters-lawyer', 'cat-central-administrative-tribunal'],
  },
  {
    key: 'cheque',
    file: 'Cheque Bounce.docx',
    serviceSlugs: ['cheque-bounce'],
  },
  {
    key: 'civil',
    file: 'Civil_Lawyer .docx',
    serviceSlugs: ['civil-lawyer', 'civil-law-disputes'],
  },
];

const titleCase = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const normalizeSpace = (s) => String(s || '').replace(/\s+/g, ' ').trim();

const localize = (text, city) =>
  String(text || '')
    .replace(/\bDelhi\b/gi, city)
    .replace(/\bin delhi\b/gi, `in ${city}`)
    .replace(/\bDelhi High Court\b/gi, `${city} High Court`);

const makeGeneric = (text) =>
  String(text || '')
    .replace(/\bDelhi\b/gi, 'India')
    .replace(/\bin delhi\b/gi, 'in India')
    .replace(/\bDelhi High Court\b/gi, 'High Court');

function extractParagraphsFromDocx(docPath) {
  const data = fs.readFileSync(docPath);
  const text = data.toString('utf8');

  const paras = [];
  const pMatches = text.match(/<w:p[\s\S]*?<\/w:p>/g) || [];

  for (const p of pMatches) {
    const runs = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]);
    if (!runs.length) continue;

    const line = normalizeSpace(
      runs
        .join('')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
    );

    if (line) paras.push(line);
  }

  return paras;
}

function parseDoc(paras) {
  const lines = paras.filter(Boolean);

  const idxKeywords = lines.findIndex((l) => /^keywords\s*:/i.test(l));
  const idxTitle = lines.findIndex((l) => /^title\s*:/i.test(l));
  const idxDescription = lines.findIndex((l) => /^description\s*:/i.test(l));

  const keywordLines = idxKeywords >= 0 && idxTitle > idxKeywords
    ? lines.slice(idxKeywords + 1, idxTitle)
    : [];

  const keywords = keywordLines
    .map((k) => normalizeSpace(k.replace(/-\d+\s*$/g, '').replace(/^[-•]\s*/, '')))
    .filter(Boolean);

  const title = idxTitle >= 0 ? normalizeSpace(lines[idxTitle].replace(/^title\s*:\s*/i, '')) : '';
  const description = idxDescription >= 0 ? normalizeSpace(lines[idxDescription].replace(/^description\s*:\s*/i, '')) : '';

  const contentStart = idxDescription >= 0 ? idxDescription + 1 : 0;
  const contentLines = lines.slice(contentStart).filter(Boolean);

  const sections = [];
  let current = null;

  for (const line of contentLines) {
    const isHeading = line.length <= 90 && !/[.!?]$/.test(line) && !/^[-•\d]/.test(line);

    if (isHeading) {
      if (current && current.content.length) sections.push(current);
      current = { title: line, content: [] };
      continue;
    }

    if (!current) current = { title: 'Overview', content: [] };
    current.content.push(line);
  }

  if (current && current.content.length) sections.push(current);

  const intro = contentLines.find((l) => l.length > 80) || description;

  return {
    title,
    description,
    keywords,
    intro,
    sections: sections.slice(0, 8),
  };
}

async function updateTarget(target) {
  const docPath = path.join(DOC_BASE, target.file);
  if (!fs.existsSync(docPath)) {
    console.log(`MISSING FILE: ${target.file}`);
    return { updatedServices: 0, updatedLocations: 0 };
  }

  const parsed = parseDoc(extractParagraphsFromDocx(docPath));
  const services = await Service.find({ slug: { $in: target.serviceSlugs } });

  if (!services.length) {
    console.log(`No services found for ${target.key}`);
    return { updatedServices: 0, updatedLocations: 0 };
  }

  let updatedServices = 0;

  for (const service of services) {
    const genericIntro = makeGeneric(parsed.intro);
    const genericDesc = makeGeneric(parsed.description);

    if (APPLY) {
      service.shortDescription = genericDesc || service.shortDescription;
      service.longDescription = genericIntro || service.longDescription;
      service.overview = genericIntro || service.overview;
      await service.save();
    }

    updatedServices += 1;
  }

  const serviceIds = services.map((s) => s._id);
  const pages = await LocationPage.find({ service: { $in: serviceIds } });

  let updatedLocations = 0;
  for (const page of pages) {
    const city = titleCase(page.city);

    const seoTitle = localize(parsed.title, city);
    const seoDescription = localize(parsed.description, city);
    const seoKeywords = parsed.keywords.map((k) => localize(k, city)).join(', ');
    const h1 = seoTitle.replace(/\s*-\s*GAG Lawyers\s*$/i, '').trim();
    const intro = localize(parsed.intro, city);

    const mappedSections = parsed.sections.map((s) => ({
      title: localize(s.title, city),
      content: localize(s.content.join('\n\n'), city),
    }));

    if (APPLY) {
      page.city = city;
      page.serviceName = services[0].name;
      page.seo = {
        ...(page.seo || {}),
        title: seoTitle || page.seo?.title,
        description: seoDescription || page.seo?.description,
        keywords: seoKeywords || page.seo?.keywords,
        h1: h1 || page.seo?.h1,
      };
      page.content = {
        ...(page.content || {}),
        heading: h1 || page.content?.heading,
        intro: intro || page.content?.intro,
        sections: mappedSections.length ? mappedSections : page.content?.sections,
      };
      await page.save();
    }

    updatedLocations += 1;
  }

  console.log(`[${target.key}] services=${updatedServices}, locations=${updatedLocations}`);
  return { updatedServices, updatedLocations };
}

async function run() {
  try {
    await connectDB();
    console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY RUN'}`);

    let totalServices = 0;
    let totalLocations = 0;

    for (const target of TARGETS) {
      const out = await updateTarget(target);
      totalServices += out.updatedServices;
      totalLocations += out.updatedLocations;
    }

    console.log(`Done. services=${totalServices}, locations=${totalLocations}`);
    process.exit(0);
  } catch (error) {
    console.error('Failed:', error);
    process.exit(1);
  }
}

run();


