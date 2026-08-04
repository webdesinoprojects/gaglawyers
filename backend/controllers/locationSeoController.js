const Service = require('../models/Service');
const LocationPage = require('../models/LocationPage');

// Placeholders supported in the template: {city}, {service} (full name, e.g.
// "Criminal Lawyer"), {base} (name minus a trailing Lawyer/Advocate, e.g. "Criminal").
const baseService = (name = '') =>
  String(name).replace(/\s+(lawyers?|advocates?)\s*$/i, '').trim() || String(name).trim();

const render = (str, ctx) =>
  String(str || '')
    .replace(/\{service\}/gi, ctx.service)
    .replace(/\{base\}/gi, ctx.base)
    .replace(/\{city\}/gi, ctx.city)
    .trim();

// Default template = the exact pattern the pages currently use (so the editor is
// pre-filled, never blank — this is the "import").
const DEFAULT_TEMPLATE = {
  title: '{service} in {city} - GAG Lawyers',
  description:
    '{service} in {city} - GAG Lawyers. We offer expert legal guidance and personalized attention to meet your specific legal needs in {city}. Our dedicated team of experienced attorneys is committed to delivering exceptional and effective legal services to individuals, businesses, and corporations',
  keywords:
    '{service} in {city}, advocate for {base} matters in {city}, best {base} lawyers near me, {base} lawyer fees in {city}, {base} lawyer near me, best {base} lawyers in {city}, top {base} lawyer in india, best advocates for {base} cases in {city}, best lawyers for {base} cases in {city}, lawyer for {base} cases in {city}, lawyer for {base} matters in {city}, lawyer for {base} disputes in {city}, {base} lawyer in high court, {base} lawyer in supreme court',
};

const hasTpl = (t) => t && (t.title || t.description || t.keywords);

// GET /api/cms/services/:slug/location-seo-template
exports.getTemplate = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug }).select('name slug locationSeoTemplate').lean();
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    const tpl = hasTpl(service.locationSeoTemplate) ? service.locationSeoTemplate : DEFAULT_TEMPLATE;
    const count = await LocationPage.countDocuments({ service: service._id });
    res.json({ success: true, data: { serviceName: service.name, template: { title: tpl.title || '', description: tpl.description || '', keywords: tpl.keywords || '' }, isDefault: !hasTpl(service.locationSeoTemplate), pageCount: count } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// PUT /api/cms/services/:slug/location-seo-template   body: {title, description, keywords}
exports.saveTemplate = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    const { title = '', description = '', keywords = '' } = req.body || {};
    service.locationSeoTemplate = { title: String(title), description: String(description), keywords: String(keywords) };
    service.markModified('locationSeoTemplate');
    await service.save();
    res.json({ success: true, message: 'Template saved' });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST /api/cms/services/:slug/location-seo-template/apply   body: {dryRun: bool}
// Writes ONLY the filled template fields into each of this service's LocationPage.seo.
// Blank template fields are skipped (existing meta preserved). Never deletes anything.
exports.applyTemplate = async (req, res) => {
  try {
    const dryRun = req.body?.dryRun !== false; // default to dry-run for safety
    const service = await Service.findOne({ slug: req.params.slug }).lean();
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    const tpl = hasTpl(service.locationSeoTemplate) ? service.locationSeoTemplate : DEFAULT_TEMPLATE;

    const pages = await LocationPage.find({ service: service._id }).select('slug city serviceName seo').lean();
    let updated = 0;
    const samples = [];
    for (const page of pages) {
      const ctx = { service: String(page.serviceName || service.name || '').trim(), base: baseService(page.serviceName || service.name), city: String(page.city || '').trim() };
      const next = { ...(page.seo || {}) };
      if (tpl.title) next.title = render(tpl.title, ctx);
      if (tpl.description) next.description = render(tpl.description, ctx);
      if (tpl.keywords) next.keywords = render(tpl.keywords, ctx);
      if (samples.length < 3) samples.push({ slug: page.slug, title: next.title, keywords: (next.keywords || '').slice(0, 160) });
      if (!dryRun) {
        await LocationPage.updateOne({ _id: page._id }, { $set: { seo: next } });
      }
      updated += 1;
    }
    res.json({ success: true, dryRun, serviceName: service.name, total: pages.length, updated: dryRun ? 0 : updated, samples });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
