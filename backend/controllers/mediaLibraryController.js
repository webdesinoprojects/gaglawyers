const MediaLibrary = require('../models/MediaLibrary');
const cloudinary = require('../config/cloudinary');
const fs = require('fs').promises;

// Upload media to Cloudinary and save to database
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { title, description, altText, folder = 'general', tags } = req.body;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `gag-lawyers/${folder}`,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    // Determine file type
    let fileType = 'other';
    if (result.resource_type === 'image') fileType = 'image';
    else if (result.resource_type === 'video') fileType = 'video';
    else if (result.format === 'pdf') fileType = 'document';

    // Save to database
    const media = new MediaLibrary({
      title: title || req.file.originalname,
      description,
      altText,
      cloudinaryPublicId: result.public_id,
      cloudinaryUrl: result.url,
      secureUrl: result.secure_url,
      fileType,
      mimeType: req.file.mimetype,
      format: result.format,
      width: result.width,
      height: result.height,
      fileSize: result.bytes,
      folder,
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: req.user?._id,
    });

    await media.save();

    // Clean up temp file
    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.error('Error deleting temp file:', err);
    }

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully',
      data: media,
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media',
      error: error.message,
    });
  }
};

// Get all media with pagination and filters
exports.getAllMedia = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      fileType,
      folder,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};
    
    if (fileType) query.fileType = fileType;
    if (folder) query.folder = folder;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [media, total] = await Promise.all([
      MediaLibrary.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('uploadedBy', 'name email'),
      MediaLibrary.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media',
      error: error.message,
    });
  }
};

// Get media by ID
exports.getMediaById = async (req, res) => {
  try {
    const media = await MediaLibrary.findById(req.params.id)
      .populate('uploadedBy', 'name email');
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }
    
    res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch media',
      error: error.message,
    });
  }
};

// Update media metadata
exports.updateMedia = async (req, res) => {
  try {
    const { title, description, altText, tags, folder } = req.body;
    
    const media = await MediaLibrary.findByIdAndUpdate(
      req.params.id,
      { title, description, altText, tags, folder },
      { new: true, runValidators: true }
    );
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Media updated successfully',
      data: media,
    });
  } catch (error) {
    console.error('Error updating media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update media',
      error: error.message,
    });
  }
};

// Delete media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await MediaLibrary.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }
    
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.cloudinaryPublicId, {
      resource_type: media.fileType === 'video' ? 'video' : 'image',
    });
    
    // Delete from database
    await media.deleteOne();
    
    res.json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media',
      error: error.message,
    });
  }
};

// Get folders list
exports.getFolders = async (req, res) => {
  try {
    const folders = await MediaLibrary.distinct('folder');
    res.json({
      success: true,
      data: folders,
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch folders',
      error: error.message,
    });
  }
};

// Bulk delete media
exports.bulkDeleteMedia = async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid media IDs',
      });
    }
    
    const media = await MediaLibrary.find({ _id: { $in: ids } });
    
    // Delete from Cloudinary
    const deletePromises = media.map(item =>
      cloudinary.uploader.destroy(item.cloudinaryPublicId, {
        resource_type: item.fileType === 'video' ? 'video' : 'image',
      })
    );
    
    await Promise.all(deletePromises);
    
    // Delete from database
    await MediaLibrary.deleteMany({ _id: { $in: ids } });
    
    res.json({
      success: true,
      message: `${media.length} media items deleted successfully`,
    });
  } catch (error) {
    console.error('Error bulk deleting media:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete media',
      error: error.message,
    });
  }
};
