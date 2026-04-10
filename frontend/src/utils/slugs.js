/**
 * Utility functions for slug generation and URL management
 */

/**
 * Convert text to URL-friendly slug
 * @param {string} text - Text to convert
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
};

/**
 * Build canonical location page slug
 * Format: {service-slug}-lawyer-in-{city-slug}
 * @param {string} serviceSlug - Service slug
 * @param {string} cityDisplayName - City name
 * @returns {string} Location page slug
 */
export const buildLocationPageSlug = (serviceSlug, cityDisplayName) => {
  const service = generateSlug(String(serviceSlug || ''));
  const city = generateSlug(String(cityDisplayName || ''));

  if (!service || !city) return '';
  return `${service}-lawyer-in-${city}`;
};

/**
 * Convert slug back to readable text
 * @param {string} slug - URL slug
 * @returns {string} Readable text
 */
export const slugToText = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get location path from service slug and city
 * @param {string} serviceSlug - Service slug
 * @param {string} citySlug - City slug
 * @returns {string} Location path
 */
export const getLocationPath = (serviceSlug, citySlug) => {
  return `/${serviceSlug}/${citySlug}`;
};

/**
 * Get service page path from service slug
 * @param {string} serviceSlug - Service slug
 * @returns {string} Service page path
 */
export const getServicePath = (serviceSlug) => {
  return `/services/${serviceSlug}`;
};

/**
 * Validate if a value is a valid service slug
 * @param {string} slug - Slug to validate
 * @param {array} services - Array of service objects
 * @returns {boolean} True if valid service slug
 */
export const isValidServiceSlug = (slug, services) => {
  return services.some(service => service.slug === slug);
};

/**
 * List of major Indian cities for location pages
 */
export const MAJOR_CITIES = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Gurgaon', slug: 'gurgaon' },
  { name: 'Noida', slug: 'noida' },
  { name: 'Greater Noida', slug: 'greater-noida' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Indore', slug: 'indore' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Chandigarh', slug: 'chandigarh' },
  { name: 'Lucknow', slug: 'lucknow' },
];

/**
 * Get city name from slug
 * @param {string} slug - City slug
 * @returns {string} City name
 */
export const getCityNameFromSlug = (slug) => {
  const city = MAJOR_CITIES.find(c => c.slug === slug);
  return city ? city.name : slugToText(slug);
};

/**
 * Get all location paths for a service
 * @param {string} serviceSlug - Service slug
 * @returns {array} Array of location paths
 */
export const getServiceLocationPaths = (serviceSlug) => {
  return MAJOR_CITIES.map(city => getLocationPath(serviceSlug, city.slug));
};

/**
 * Extract slug from URL path
 * @param {string} path - URL path
 * @returns {string} Extracted slug
 */
export const extractSlugFromPath = (path) => {
  const parts = path.split('/').filter(p => p);
  return parts[parts.length - 1] || '';
};

/**
 * Check if URL is a location page
 * @param {string} path - URL path
 * @returns {boolean} True if location page
 */
export const isLocationPath = (path) => {
  const parts = path.split('/').filter(p => p);
  return parts.length === 2 && parts[0] !== 'services' && parts[0] !== 'blog';
};

/**
 * Generate canonical URL for SEO
 * @param {string} baseUrl - Base URL of site
 * @param {string} path - Page path
 * @returns {string} Full canonical URL
 */
export const getCanonicalUrl = (baseUrl, path) => {
  return `${baseUrl}${path}`;
};

/**
 * Format service title for display
 * @param {string} title - Service title
 * @returns {string} Formatted title
 */
export const formatServiceTitle = (title) => {
  return title
    .replace(/&/g, 'and')
    .replace(/[()]/g, '')
    .trim();
};

/**
 * Generate breadcrumb data for service/location pages
 * @param {string} serviceName - Service name
 * @param {string} serviceSlug - Service slug
 * @param {string} cityName - City name (optional)
 * @param {string} citySlug - City slug (optional)
 * @returns {array} Breadcrumb items
 */
export const generateBreadcrumbs = (serviceName, serviceSlug, cityName = null, citySlug = null) => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: serviceName, path: getServicePath(serviceSlug) },
  ];

  if (cityName && citySlug) {
    breadcrumbs.push({
      label: `${serviceName} in ${cityName}`,
      path: getLocationPath(serviceSlug, citySlug),
    });
  }

  return breadcrumbs;
};
