const SERVICE_IMAGES = {
  default: {
    overview:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=75',
    benefits:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=75',
    process:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75',
    team: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=75',
  },
  bail: {
    overview:
      'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=75',
  },
  civil: {
    overview:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=75',
  },
  cheque: {
    overview:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=75',
  },
  motor: {
    overview:
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=75',
  },
  consumer: {
    overview:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=75',
  },
  labour: {
    overview:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75',
  },
  supreme: {
    overview:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=75',
  },
};

export function getSectionImage(serviceSlug = '', sectionType = 'overview') {
  const key = Object.keys(SERVICE_IMAGES).find(
    (k) => k !== 'default' && serviceSlug.includes(k)
  );

  return (
    SERVICE_IMAGES[key]?.[sectionType] ||
    SERVICE_IMAGES.default[sectionType] ||
    SERVICE_IMAGES.default.overview
  );
}

export default SERVICE_IMAGES;
