const PageContent = require('../models/PageContent');
const cloudinary = require('../config/cloudinary');

const getAllPages = async (req, res) => {
  try {
    const pages = await PageContent.find().sort({ pageName: 1 });
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

const getPageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    const page = await PageContent.findOne({ pageName });

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

const updatePageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    
    const oldPage = await PageContent.findOne({ pageName });
    
    if (oldPage && req.body.seo?.ogImage && oldPage.seo?.ogImage !== req.body.seo.ogImage && oldPage.seo?.ogImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldPage.seo.ogImagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    const page = await PageContent.findOneAndUpdate(
      { pageName },
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

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

module.exports = {
  getAllPages,
  getPageContent,
  updatePageContent,
};
