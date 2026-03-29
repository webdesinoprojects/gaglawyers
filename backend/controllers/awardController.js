const Award = require('../models/Award');
const cloudinary = require('../config/cloudinary');

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

    if (req.body.imageUrl && oldAward.imageUrl !== req.body.imageUrl && oldAward.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(oldAward.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

    if (award.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(award.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await Award.findByIdAndDelete(req.params.id);

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
  createAward,
  updateAward,
  deleteAward,
};
