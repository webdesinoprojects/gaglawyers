const PageContent = require('../models/PageContent');

const getPageContent = async (req, res) => {
  try {
    const { pageName } = req.params;
    const page = await PageContent.findOne({ pageName, isPublished: true });

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
  getPageContent,
  updatePageContent,
};
