const Award = require('../models/Award');
const PageContent = require('../models/PageContent');
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');

const MAX_HOME_AWARDS = 16;

const getAwardsHomeSettings = (page) => {
  const sections = page?.sections;
  const awardsHome = typeof sections?.get === 'function'
    ? sections.get('awardsHome')
    : sections?.awardsHome;

  return {
    configured: awardsHome?.awardSelectionConfigured === true,
    awardIds: Array.isArray(awardsHome?.awardIds)
      ? awardsHome.awardIds.map((id) => String(id))
      : [],
  };
};

const getAllAwards = async (req, res) => {
  try {
    const awards = await Award.find({ isPublished: true }).sort({ year: -1, order: 1 });
    res.status(200).json({
      success: true,
      count: awards.length,
      data: awards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// Admin list includes drafts so an unpublished award can be edited or
// published again. The public list above intentionally remains published-only.
const getAllAwardsAdmin = async (req, res) => {
  try {
    const awards = await Award.find({}).sort({ year: -1, order: 1 });
    res.status(200).json({
      success: true,
      count: awards.length,
      data: awards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getHomeAwardSettings = async (req, res) => {
  try {
    const page = await PageContent.findOne({ pageName: 'home' }).select('sections');
    const settings = getAwardsHomeSettings(page);

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateHomeAwardSettings = async (req, res) => {
  try {
    const configured = req.body.configured !== false;
    const requestedIds = configured && Array.isArray(req.body.awardIds)
      ? req.body.awardIds.map((id) => String(id).trim()).filter(Boolean)
      : [];
    const awardIds = [...new Set(requestedIds)];

    if (awardIds.length > MAX_HOME_AWARDS) {
      return res.status(400).json({
        success: false,
        message: `Select no more than ${MAX_HOME_AWARDS} homepage awards`,
      });
    }

    if (awardIds.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message: 'One or more award IDs are invalid',
      });
    }

    if (awardIds.length > 0) {
      const publishedAwards = await Award.find({
        _id: { $in: awardIds },
        isPublished: true,
      }).select('_id');

      if (publishedAwards.length !== awardIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Only existing, published awards can be selected for the homepage',
        });
      }
    }

    const page = await PageContent.findOneAndUpdate(
      { pageName: 'home' },
      {
        $set: {
          'sections.awardsHome.awardSelectionConfigured': configured,
          'sections.awardsHome.awardIds': awardIds,
        },
      },
      { new: true, runValidators: true }
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Home page content was not found',
      });
    }

    res.status(200).json({
      success: true,
      message: configured
        ? 'Homepage award selection saved'
        : 'Homepage awards restored to automatic selection',
      data: getAwardsHomeSettings(page),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createAward = async (req, res) => {
  try {
    const award = await Award.create(req.body);
    res.status(201).json({
      success: true,
      data: award,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateAward = async (req, res) => {
  try {
    const oldAward = await Award.findById(req.params.id);

    if (!oldAward) {
      return res.status(404).json({
        success: false,
        message: 'Award not found',
      });
    }

    const replacedImagePublicId = req.body.imageUrl
      && oldAward.imageUrl !== req.body.imageUrl
      && oldAward.cloudinaryPublicId
      ? oldAward.cloudinaryPublicId
      : '';

    const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Delete the old Cloudinary asset only after the database update succeeds.
    if (replacedImagePublicId) {
      try {
        await cloudinary.uploader.destroy(replacedImagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    res.status(200).json({
      success: true,
      data: award,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteAward = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);

    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found',
      });
    }

    await Award.findByIdAndDelete(req.params.id);

    // Database deletion is authoritative. A Cloudinary cleanup failure may leave
    // an orphaned asset, but can no longer leave a broken award record behind.
    if (award.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(award.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Award deleted',
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
  getAllAwards,
  getAllAwardsAdmin,
  getHomeAwardSettings,
  updateHomeAwardSettings,
  createAward,
  updateAward,
  deleteAward,
};
