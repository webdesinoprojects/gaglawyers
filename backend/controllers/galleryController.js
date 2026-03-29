const GalleryImage = require('../models/GalleryImage');

const getAllImages = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    
    if (category) {
      filter.category = category;
    }

    const images = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createImage = async (req, res) => {
  try {
    const image = await GalleryImage.create(req.body);
    res.status(201).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted',
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
  getAllImages,
  createImage,
  updateImage,
  deleteImage,
};
