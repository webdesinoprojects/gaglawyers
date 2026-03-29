const Award = require('../models/Award');

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
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found',
      });
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
    const award = await Award.findByIdAndDelete(req.params.id);

    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found',
      });
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
  createAward,
  updateAward,
  deleteAward,
};
