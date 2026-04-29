const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/** Canonical location page URL:
 * - if service ends with "-lawyer": {service-slug}-in-{city-slug}
 * - otherwise: {service-slug}-lawyer-in-{city-slug}
 */
const buildLocationPageSlug = (serviceSlug, cityDisplayName) => {
  const s = generateSlug(serviceSlug || '');
  const c = generateSlug(cityDisplayName || '');
  if (!s || !c) return '';
  const needsLawyerSuffix = !s.endsWith('-lawyer');
  return needsLawyerSuffix ? `${s}-lawyer-in-${c}` : `${s}-in-${c}`;
};

const generateUniqueSlug = async (Model, baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const existing = await Model.findOne(query);
    if (!existing) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

module.exports = { generateSlug, generateUniqueSlug, buildLocationPageSlug };
