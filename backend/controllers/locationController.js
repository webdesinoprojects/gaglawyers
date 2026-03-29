const LocationPage = require('../models/LocationPage');

const getAllLocationPages = async (req, res) => {
  try {
    const { service, city, active } = req.query;
    const filter = {};
    
    if (active === 'true') {
      filter.isActive = true;
    }
    
    if (service) {
      filter.service = service;
    }
    
    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    const pages = await LocationPage.find(filter)
      .populate('service', 'title')
      .sort({ city: 1 });
      
    res.status(200).json({
      success: true,
      count: pages.length,
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

module.exports = {
  getAllLocationPages,
  getLocationPageBySlug,
  createLocationPage,
  updateLocationPage,
  toggleLocationPage,
  deleteLocationPage,
};
