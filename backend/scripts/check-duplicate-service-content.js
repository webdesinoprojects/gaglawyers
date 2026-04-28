require('dotenv').config();
const crypto = require('crypto');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');

const MIN_SECTIONS_FOR_FULL_CONTENT = 4;
const EXPECTED_CORE_TYPES = ['hero', 'overview', 'faq'];

function normalizeString(value) {
  return String(value || '')
    .replace(/\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function stableNormalize(value) {
  if (Array.isArray(value)) return value.map((item) => stableNormalize(item));
  if (value && typeof value === 'object') {
    const keys = Object.keys(value).sort();
    const out = {};
    for (const key of keys) {
      out[key] = stableNormalize(value[key]);
    }
    return out;
  }
  if (typeof value === 'string') return normalizeString(value);
  return value;
}

function fingerprintSections(sections) {
  const normalized = sections.map((section) => ({
    type: section.type || '',
    heading: normalizeString(section.heading),
    content: stableNormalize(section.content || {}),
  }));
  const raw = JSON.stringify(normalized);
  return crypto.createHash('sha256').update(raw).digest('hex');
}

function isTextThin(text, minLen = 40) {
  return normalizeString(text).length < minLen;
}

function evaluateCompleteness(service, sections) {
  const reasons = [];
  const visibleNonCta = sections.filter((s) => s.type !== 'cta_banner' && s.visible !== false);
  const types = new Set(visibleNonCta.map((s) => s.type));

  if (visibleNonCta.length === 0) {
    reasons.push('No visible content sections');
    return reasons;
  }
  if (visibleNonCta.length < MIN_SECTIONS_FOR_FULL_CONTENT) {
    reasons.push(`Only ${visibleNonCta.length} visible sections (< ${MIN_SECTIONS_FOR_FULL_CONTENT})`);
  }

  for (const requiredType of EXPECTED_CORE_TYPES) {
    if (!types.has(requiredType)) reasons.push(`Missing required section type: ${requiredType}`);
  }

  for (const section of visibleNonCta) {
    if (!normalizeString(section.heading)) {
      reasons.push(`Empty heading in ${section.type} section`);
    }

    if (section.type === 'overview') {
      const body = section?.content?.body;
      if (!body || isTextThin(body, 80)) {
        reasons.push('Overview body is missing or too short');
      }
    }

    if (section.type === 'faq') {
      const items = Array.isArray(section?.content?.items) ? section.content.items : [];
      if (items.length < 3) reasons.push(`FAQ has too few items (${items.length})`);
      const badItems = items.filter(
        (item) => isTextThin(item?.question, 12) || isTextThin(item?.answer, 25)
      ).length;
      if (badItems > 0) reasons.push(`FAQ has ${badItems} weak/empty item(s)`);
    }

    if (section.type === 'process') {
      const steps = Array.isArray(section?.content?.steps) ? section.content.steps : [];
      if (steps.length < 3) reasons.push(`Process has too few steps (${steps.length})`);
    }

    if (section.type === 'benefits') {
      const items = Array.isArray(section?.content?.items) ? section.content.items : [];
      if (items.length < 3) reasons.push(`Benefits has too few items (${items.length})`);
    }
  }

  if (isTextThin(service?.shortDescription, 40)) {
    reasons.push('Service shortDescription is missing or too short');
  }

  return Array.from(new Set(reasons));
}

async function run() {
  await connectDB();

  const services = await Service.find({}).select('_id name slug shortDescription').sort({ name: 1 }).lean();
  const serviceIds = services.map((s) => s._id);
  const sections = await ServiceSection.find({ serviceId: { $in: serviceIds } })
    .sort({ serviceId: 1, order: 1 })
    .lean();

  const byService = new Map();
  for (const section of sections) {
    const key = String(section.serviceId);
    if (!byService.has(key)) byService.set(key, []);
    byService.get(key).push(section);
  }

  const duplicateMap = new Map();
  const incomplete = [];

  for (const service of services) {
    const sSections = byService.get(String(service._id)) || [];
    const visibleNonCta = sSections.filter((s) => s.type !== 'cta_banner' && s.visible !== false);

    if (visibleNonCta.length > 0) {
      const fp = fingerprintSections(visibleNonCta);
      if (!duplicateMap.has(fp)) duplicateMap.set(fp, []);
      duplicateMap.get(fp).push({
        serviceId: String(service._id),
        name: service.name,
        slug: service.slug,
        sectionCount: visibleNonCta.length,
      });
    }

    const issues = evaluateCompleteness(service, sSections);
    if (issues.length > 0) {
      incomplete.push({
        serviceId: String(service._id),
        name: service.name,
        slug: service.slug,
        issues,
      });
    }
  }

  const duplicateGroups = Array.from(duplicateMap.values()).filter((group) => group.length > 1);

  console.log('\n=== Service Content Audit ===');
  console.log(`Total services checked: ${services.length}`);
  console.log(`Duplicate-content groups: ${duplicateGroups.length}`);
  console.log(`Services flagged incomplete: ${incomplete.length}`);

  if (duplicateGroups.length > 0) {
    console.log('\n--- Duplicate Content Groups (Exact Match) ---');
    duplicateGroups.forEach((group, idx) => {
      console.log(`\nGroup ${idx + 1} (${group.length} services):`);
      group.forEach((item) => {
        console.log(`- ${item.name} [${item.slug}] (sections: ${item.sectionCount})`);
      });
    });
  }

  if (incomplete.length > 0) {
    console.log('\n--- Incomplete Content Services ---');
    incomplete.forEach((item) => {
      console.log(`\n- ${item.name} [${item.slug}]`);
      item.issues.forEach((issue) => console.log(`  * ${issue}`));
    });
  }

  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error('Audit failed:', error.message);
  try {
    await mongoose.disconnect();
  } catch (_) {}
  process.exit(1);
});
