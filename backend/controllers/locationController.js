const LocationPage = require('../models/LocationPage');

const getAllLocationPages = async (req, res) => {
  try {
    const { service, city, active, page = 1, limit = 20 } = req.query;
    const filter = {};
    
    if (active === 'true') {
      filter.isActive = true;
    } else if (active === 'false') {
      filter.isActive = false;
    }
    
    if (service) {
      filter.service = service;
    }
    
    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await LocationPage.countDocuments(filter);

    const pages = await LocationPage.find(filter)
      .populate('service', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    res.status(200).json({
      success: true,
      count: pages.length,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
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
      .populate('service', 'title description');

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }

    page.views += 1;
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

const createLocationPage = async (req, res) => {
  try {
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
    const [total, active, inactive, byService] = await Promise.all([
      LocationPage.countDocuments(),
      LocationPage.countDocuments({ isActive: true }),
      LocationPage.countDocuments({ isActive: false }),
      LocationPage.aggregate([
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
            serviceName: '$serviceInfo.title',
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
  createLocationPage,
  updateLocationPage,
  toggleLocationPage,
  deleteLocationPage,
  bulkToggleLocationPages,
  bulkCreateLocationPages,
  getLocationStats,
};
