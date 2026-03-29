const Review = require('../models/Review');
const cloudinary = require('../config/cloudinary');

const getAllReviews = async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = { isPublished: true };
    
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const reviews = await Review.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const oldReview = await Review.findById(req.params.id);

    if (!oldReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (req.body.imageUrl && oldReview.imageUrl !== req.body.imageUrl && oldReview.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(oldReview.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (review.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(review.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Review deleted',
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
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
};
