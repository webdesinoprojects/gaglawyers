const LocationPage = require('../models/LocationPage');
const Service = require('../models/Service');

const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getAllLocationPages = async (req, res) => {
  try {
    const { service, city, active, page = 1, limit = 20, skip = 0, search, missingMeta } = req.query;
    const andConditions = [];
    const validServiceIds = await Service.distinct('_id');

    // Strictly include only pages linked to existing services
    andConditions.push({ service: { $in: validServiceIds } });

    if (active === 'true') {
      andConditions.push({ isActive: true });
    } else if (active === 'false') {
      andConditions.push({ isActive: false });
    }

    if (service) {
      andConditions.push({ service });
    }

    if (city && String(city).trim()) {
      andConditions.push({ city: new RegExp(escapeRegExp(city.trim()), 'i') });
    }

    if (search && String(search).trim()) {
      const safe = escapeRegExp(search.trim());
      const re = new RegExp(safe, 'i');
      andConditions.push({
        $or: [
          { 'seo.title': re },
          { 'seo.h1': re },
          { slug: re },
          { city: re },
          { serviceName: re },
        ],
      });
    }

    if (missingMeta === 'true') {
      andConditions.push({
        $or: [
          { 'seo.description': { $exists: false } },
          { 'seo.description': '' },
          { 'seo.description': null },
        ],
      });
    }

    const filter = andConditions.length > 0 ? { $and: andConditions } : {};

    const skipCount = parseInt(skip) || ((parseInt(page) - 1) * parseInt(limit));
    const total = await LocationPage.countDocuments(filter);

    const pages = await LocationPage.find(filter)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(parseInt(limit));
      
    res.status(200).json({
      success: true,
      count: pages.length,
      pagination: {
        total,
        pages: Math.ceil(total / parseInt(limit)),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      },
      data: pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getLocationPageBySlug = async (req, res) => {
  try {
    const page = await LocationPage.findOne({ slug: req.params.slug, isActive: true })
      .populate('service', 'name slug')
      .lean();

    if (!page || !page.service) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    LocationPage.updateOne(
      { _id: page._id },
      { $inc: { views: 1 } }
    ).catch((error) => {
      console.error('Error incrementing location page views:', error);
    });

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getFooterLocationLinks = async (req, res) => {
  try {
    const requestedLimit = parseInt(req.query.limit, 10);
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(requestedLimit, 1), 1000)
      : 300;

    const links = await LocationPage.aggregate([
      {
        $match: {
          isActive: true,
          city: { $exists: true, $ne: '' },
          slug: { $exists: true, $ne: '' },
          service: { $exists: true, $ne: null },
        },
      },
      {
        $lookup: {
          from: 'services',
          localField: 'service',
          foreignField: '_id',
          as: 'serviceInfo',
        },
      },
      {
        $unwind: '$serviceInfo',
      },
      {
        $project: {
          city: { $trim: { input: '$city' } },
          serviceName: {
            $trim: {
              input: '$serviceInfo.name',
            },
          },
          slug: 1,
          createdAt: 1,
        },
      },
      {
        $match: {
          serviceName: { $exists: true, $ne: '' },
        },
      },
      {
        $sort: { city: 1, serviceName: 1, createdAt: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      success: true,
      count: links.length,
      data: links.map(({ city, serviceName, slug }) => ({ city, serviceName, slug })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createLocationPage = async (req, res) => {
  try {
    const serviceId = req.body?.service;
    const serviceExists = serviceId ? await Service.exists({ _id: serviceId }) : null;
    if (!serviceExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service selected',
      });
    }

    const page = await LocationPage.create(req.body);
    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateLocationPage = async (req, res) => {
  try {
    const serviceId = req.body?.service;
    const serviceExists = serviceId ? await Service.exists({ _id: serviceId }) : null;
    if (!serviceExists) {
      return res.status(400).json({
        success: false,
        message: 'Invalid service selected',
      });
    }

    const page = await LocationPage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const toggleLocationPage = async (req, res) => {
  try {
    const page = await LocationPage.findById(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    page.isActive = !page.isActive;
    await page.save();

    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteLocationPage = async (req, res) => {
  try {
    const page = await LocationPage.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Page deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const bulkToggleLocationPages = async (req, res) => {
  try {
    const { ids, isActive } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or empty ids array',
      });
    }

    const result = await LocationPage.updateMany(
      { _id: { $in: ids } },
      { $set: { isActive } }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} pages updated`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const bulkCreateLocationPages = async (req, res) => {
  try {
    const { pages } = req.body;

    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or empty pages array',
      });
    }

    const uniqueServiceIds = [
      ...new Set(
        pages
          .map((page) => String(page?.service || '').trim())
          .filter(Boolean)
      ),
    ];

    const validServices = await Service.find({ _id: { $in: uniqueServiceIds } })
      .select('_id')
      .lean();
    const validServiceIdSet = new Set(validServices.map((service) => String(service._id)));
    const hasInvalidService = uniqueServiceIds.some((id) => !validServiceIdSet.has(id));

    if (hasInvalidService) {
      return res.status(400).json({
        success: false,
        message: 'One or more pages have invalid service references',
      });
    }

    const createdPages = await LocationPage.insertMany(pages, { ordered: false });

    res.status(201).json({
      success: true,
      message: `${createdPages.length} pages created`,
      count: createdPages.length,
      data: createdPages,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Some pages already exist (duplicate slugs)',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  }
};

const getLocationStats = async (req, res) => {
  try {
    const validServiceIds = await Service.distinct('_id');
    const validFilter = { service: { $in: validServiceIds } };

    const [total, active, inactive, byService] = await Promise.all([
      LocationPage.countDocuments(validFilter),
      LocationPage.countDocuments({ ...validFilter, isActive: true }),
      LocationPage.countDocuments({ ...validFilter, isActive: false }),
      LocationPage.aggregate([
        {
          $match: validFilter,
        },
        {
          $group: {
            _id: '$service',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'services',
            localField: '_id',
            foreignField: '_id',
            as: 'serviceInfo',
          },
        },
        {
          $unwind: '$serviceInfo',
        },
        {
          $project: {
            serviceName: '$serviceInfo.name',
            count: 1,
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        byService,
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

module.exports = {
  getAllLocationPages,
  getLocationPageBySlug,
  getFooterLocationLinks,
  createLocationPage,
  updateLocationPage,
  toggleLocationPage,
  deleteLocationPage,
  bulkToggleLocationPages,
  bulkCreateLocationPages,
  getLocationStats,
};
