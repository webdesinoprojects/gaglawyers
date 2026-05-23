const Service = require('../models/Service');
const ServiceSection = require('../models/ServiceSection');
const axios = require('axios');
const cheerio = require('cheerio');
const { generateSlug, generateUniqueSlug } = require('../utils/slugify');
const { scheduleSitemapRegeneration } = require('../utils/sitemapRegen');

const normalizeSectionHeading = (section = {}, index = 0) => {
  const heading = String(section?.heading || '').trim();
  if (heading) return heading;
  const fallbackType = String(section?.type || 'section')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return `${fallbackType} ${index + 1}`;
};

/**
 * @route   GET /api/services
 * @desc    Get all services (id, name, slug only)
 */
const getAllServices = async (req, res) => {
  try {
    const includeInactive = String(req.query.includeInactive || '').toLowerCase() === 'true';
    const query = includeInactive ? {} : { isActive: { $ne: false } };
    const services = await Service.find(
      query,
      'name slug isActive shortDescription cardImageUrl cardImageAlt seo globalSettings servicesPageSettings'
    )
      .sort({ name: 1 })
      .lean();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/services
 * @desc    Create a new service
 */
const createService = async (req, res) => {
  try {
    const rawName = (req.body?.name || '').trim();
    const rawSlug = (req.body?.slug || '').trim();

    if (!rawName) {
      return res.status(400).json({
        success: false,
        message: 'Service name is required',
      });
    }

    const baseSlug = generateSlug(rawSlug || rawName);
    if (!baseSlug) {
      return res.status(400).json({
        success: false,
        message: 'A valid service slug could not be generated',
      });
    }

    const uniqueSlug = await generateUniqueSlug(Service, baseSlug);

    const service = await Service.create({
      name: rawName,
      slug: uniqueSlug,
      isActive: true,
      shortDescription: '',
      cardImageUrl: '',
      cardImageAlt: '',
      seo: {
        title: `${rawName} | GAG Lawyers`,
        metaDescription: '',
      },
      globalSettings: {},
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
    scheduleSitemapRegeneration('service:create');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/services/:slug
 * @desc    Get full service page data with sections
 */
const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const includeInactive = String(req.query.includeInactive || '').toLowerCase() === 'true';

    const service = await Service.findOne({ slug }).lean();
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Get visible sections, sorted by order
    const sections = await ServiceSection.find({
      serviceId: service._id,
      visible: true,
      type: { $ne: 'cta_banner' },
    })
      .sort({ order: 1 })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        ...service,
        sections,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   PUT /api/services/:slug
 * @desc    Update service settings and sections
 */
const updateService = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      name,
      slug: newSlug,
      seo,
      globalSettings,
      servicesPageSettings,
      sections,
      isActive,
      shortDescription,
      cardImageUrl,
      cardImageAlt,
    } = req.body;

    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Update service settings
    if (name) service.name = name;
    if (newSlug && newSlug !== slug) {
      // Check if new slug already exists
      const existingService = await Service.findOne({ slug: newSlug });
      if (existingService) {
        return res.status(400).json({
          success: false,
          message: 'Slug already exists',
        });
      }
      service.slug = newSlug;
    }
    if (seo) {
      service.seo = seo;
      service.markModified('seo');
    }
    if (globalSettings) {
      service.globalSettings = globalSettings;
      service.markModified('globalSettings');
    }
    if (servicesPageSettings) {
      service.servicesPageSettings = servicesPageSettings;
      service.markModified('servicesPageSettings');
    }
    if (typeof isActive === 'boolean') service.isActive = isActive;
    if (typeof shortDescription === 'string') service.shortDescription = shortDescription;
    if (typeof cardImageUrl === 'string') service.cardImageUrl = cardImageUrl;
    if (typeof cardImageAlt === 'string') service.cardImageAlt = cardImageAlt;
    await service.save();

    // Update sections if provided
    if (sections && Array.isArray(sections)) {
      const filteredSections = sections.filter((section) => section?.type && section.type !== 'cta_banner');

      const newSections = filteredSections.map((section, index) => ({
        serviceId: service._id,
        type: section.type,
        visible: section.visible !== false,
        order: section.order ?? index,
        heading: normalizeSectionHeading(section, index),
        background: section.background || 'light',
        content: section.content && typeof section.content === 'object' ? section.content : {},
      }));

      // Replace sections only when we have a valid computed set.
      await ServiceSection.deleteMany({ serviceId: service._id });
      if (newSections.length > 0) {
        await ServiceSection.insertMany(newSections);
      }
    }

    // Return updated service with sections
    const updatedSections = await ServiceSection.find({ serviceId: service._id })
      .sort({ order: 1 })
      .lean();

    res.status(200).json({
      success: true,
      data: {
        ...service.toObject(),
        sections: updatedSections,
      },
    });
    scheduleSitemapRegeneration('service:update');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/services/:slug/sections
 * @desc    Add a new section to a service
 */
const addSection = async (req, res) => {
  try {
    const { slug } = req.params;
    const { type, heading, background, content, order } = req.body;

    if (type === 'cta_banner') {
      return res.status(400).json({
        success: false,
        message: 'CTA Banner section type is no longer supported',
      });
    }

    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Get current max order
    const maxOrderSection = await ServiceSection.findOne({ serviceId: service._id })
      .sort({ order: -1 })
      .lean();
    const nextOrder = maxOrderSection ? maxOrderSection.order + 1 : 0;

    const section = await ServiceSection.create({
      serviceId: service._id,
      type,
      heading,
      background: background || 'light',
      content: content || {},
      order: order ?? nextOrder,
      visible: true,
    });

    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/services/:slug/sections/:sectionId
 * @desc    Delete a section
 */
const deleteSection = async (req, res) => {
  try {
    const { slug, sectionId } = req.params;

    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    const section = await ServiceSection.findOneAndDelete({
      _id: sectionId,
      serviceId: service._id,
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Section deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/services/:slug
 * @desc    Delete a service and all its sections
 */
const deleteService = async (req, res) => {
  try {
    const { slug } = req.params;

    const service = await Service.findOne({ slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }
    if (service.isActive === false && !includeInactive) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await ServiceSection.deleteMany({ serviceId: service._id });
    await Service.deleteOne({ _id: service._id });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: {
        slug: service.slug,
        name: service.name,
      },
    });
    scheduleSitemapRegeneration('service:delete');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  updateService,
  addSection,
  deleteSection,
};

/**
 * Utility: Clean text
 */
const cleanText = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ').replace(/\n+/g, '\n');
};

/**
 * Utility: Extract absolute URL
 */
const getAbsoluteUrl = (url, baseUrl = 'https://gaglawyers.com') => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return baseUrl + url;
  return baseUrl + '/' + url;
};

/**
 * @route   POST /api/services/import/extract
 * @desc    Extract content from a service page URL
 */
const extractServiceContent = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required',
      });
    }

    // Fetch the page with proper headers
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    const $ = cheerio.load(response.data);

    // Extract slug from URL
    const urlParts = url.split('/');
    const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

    // Extract name (h1 or title)
    let name = $('h1').first().text();
    if (!name) {
      name = $('title').text().split('|')[0].split('-')[0];
    }
    name = cleanText(name);

    const sections = [];
    let order = 0;

    // HERO SECTION
    const heroHeading = $('h1').first().text();
    const heroSubheading = $('h1').first().next('p').text() || 
                          $('.hero p, .banner p').first().text();
    const heroBgImage = $('.hero, .banner, header').first().css('background-image') ||
                       $('.hero img, .banner img').first().attr('src');
    
    if (heroHeading) {
      sections.push({
        type: 'hero',
        heading: cleanText(heroHeading),
        visible: true,
        order: order++,
        background: 'dark',
        content: {
          subheading: cleanText(heroSubheading),
          ctaText: 'Schedule Consultation',
          ctaLink: '/contact',
          backgroundImageUrl: heroBgImage ? getAbsoluteUrl(heroBgImage.replace(/url\(['"]?|['"]?\)/g, '')) : ''
        }
      });
    }

    // OVERVIEW SECTION
    const overviewHeading = $('h2').first().text();
    const overviewBody = [];
    $('h2').first().nextUntil('h2, h3').filter('p').each((i, elem) => {
      const text = $(elem).text();
      if (text && text.length > 20) {
        overviewBody.push(cleanText(text));
      }
    });

    if (overviewBody.length > 0) {
      sections.push({
        type: 'overview',
        heading: cleanText(overviewHeading) || 'Overview',
        visible: true,
        order: order++,
        background: 'light',
        content: {
          body: overviewBody.join('\n\n')
        }
      });
    }

    // BENEFITS SECTION
    const benefitsItems = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('benefit') || headingText.includes('why choose') || 
          headingText.includes('advantage') || headingText.includes('what we offer')) {
        
        const benefitsHeading = $(heading).text();
        
        // Look for list items or cards
        $(heading).nextUntil('h2, h3').find('li, .card, .benefit-item').each((j, item) => {
          const title = $(item).find('h4, h5, strong, b').first().text() || 
                       $(item).contents().first().text();
          const description = $(item).find('p').text() || 
                            $(item).text().replace(title, '');
          
          if (title && description) {
            benefitsItems.push({
              icon: 'CheckCircle',
              title: cleanText(title),
              description: cleanText(description)
            });
          }
        });

        if (benefitsItems.length > 0) {
          sections.push({
            type: 'benefits',
            heading: cleanText(benefitsHeading),
            visible: true,
            order: order++,
            background: 'light',
            content: { items: benefitsItems }
          });
        }
      }
    });

    // PROCESS SECTION
    const processSteps = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('process') || headingText.includes('how it works') || 
          headingText.includes('steps') || headingText.includes('procedure')) {
        
        const processHeading = $(heading).text();
        let stepNumber = 1;
        
        // Look for numbered items or steps
        $(heading).nextUntil('h2, h3').find('li, .step, .process-item').each((j, item) => {
          const title = $(item).find('h4, h5, strong, b').first().text() || 
                       $(item).contents().first().text();
          const description = $(item).find('p').text() || 
                            $(item).text().replace(title, '');
          
          if (title && description) {
            processSteps.push({
              stepNumber: stepNumber++,
              title: cleanText(title),
              description: cleanText(description)
            });
          }
        });

        if (processSteps.length > 0) {
          sections.push({
            type: 'process',
            heading: cleanText(processHeading),
            visible: true,
            order: order++,
            background: 'dark',
            content: { steps: processSteps }
          });
        }
      }
    });

    // FAQ SECTION
    const faqItems = [];
    $('h2, h3').each((i, heading) => {
      const headingText = $(heading).text().toLowerCase();
      if (headingText.includes('faq') || headingText.includes('question') || 
          headingText.includes('q&a') || headingText.includes('q & a')) {
        
        const faqHeading = $(heading).text();
        
        // Look for accordion or Q&A pairs
        $(heading).nextUntil('h2, h3').find('.faq-item, .accordion-item, dt, h4, h5').each((j, item) => {
          const question = $(item).text();
          const answer = $(item).next('dd, p, .answer').text() || 
                        $(item).nextUntil('dt, h4, h5').filter('p').first().text();
          
          if (question && answer && question.length > 10 && answer.length > 10) {
            faqItems.push({
              question: cleanText(question),
              answer: cleanText(answer)
            });
          }
        });

        if (faqItems.length > 0) {
          sections.push({
            type: 'faq',
            heading: cleanText(faqHeading),
            visible: true,
            order: order++,
            background: 'light',
            content: { items: faqItems }
          });
        }
      }
    });

    // Extract SEO
    const seo = {
      title: $('title').text() || name,
      metaDescription: $('meta[name="description"]').attr('content') || 
                      $('meta[property="og:description"]').attr('content') || ''
    };

    res.status(200).json({
      success: true,
      data: {
        slug,
        name,
        sections,
        seo,
      },
    });

  } catch (error) {
    console.error('Extract error:', error.message);
    res.status(500).json({
      success: false,
      message: error.response?.status === 403 ? 'Access denied by target site' : 'Failed to extract content',
      error: error.message,
    });
  }
};

/**
 * @route   POST /api/services/import/save
 * @desc    Save extracted content to database
 */
const importServiceContent = async (req, res) => {
  try {
    const { slug, name, sections, seo } = req.body;

    if (!slug || !sections) {
      return res.status(400).json({
        success: false,
        message: 'Slug and sections are required',
      });
    }

    // Find existing service by slug
    const service = await Service.findOne({ slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Service not found: ${slug}`,
      });
    }

    // Delete existing sections
    await ServiceSection.deleteMany({ serviceId: service._id });

    // Create new sections
    const sectionDocs = sections
      .filter((section) => section.type !== 'cta_banner')
      .map(section => ({
      serviceId: service._id,
      type: section.type,
      visible: section.visible !== false,
      order: section.order,
      heading: section.heading,
      background: section.background,
      content: section.content
    }));

    await ServiceSection.insertMany(sectionDocs);

    // Update service SEO
    if (seo) {
      service.seo = {
        title: seo.title,
        metaDescription: seo.metaDescription
      };
      await service.save();
    }

    res.status(200).json({
      success: true,
      message: `Successfully imported ${sections.length} sections for ${name}`,
      data: {
        slug,
        sectionsCount: sections.length,
      },
    });

  } catch (error) {
    console.error('Import error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to import content',
      error: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  createService,
  getServiceBySlug,
  updateService,
  deleteService,
  addSection,
  deleteSection,
  extractServiceContent,
  importServiceContent,
};
