const BlogPost = require('../models/BlogPost');
const cloudinary = require('../config/cloudinary');

const getAllPosts = async (req, res) => {
  try {
    const { category, published } = req.query;
    const filter = {};
    
    if (published === 'true') {
      filter.isPublished = true;
    }
    
    if (category) {
      filter.category = category;
    }

    const posts = await BlogPost.find(filter)
      .populate('author', 'name email')
      .sort({ publishedAt: -1, createdAt: -1 });
      
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true })
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await BlogPost.create({
      ...req.body,
      author: req.user._id,
    });
    
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const oldPost = await BlogPost.findById(req.params.id);

    if (!oldPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (req.body.featuredImage && oldPost.featuredImage !== req.body.featuredImage && oldPost.featuredImagePublicId) {
      try {
        await cloudinary.uploader.destroy(oldPost.featuredImagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.featuredImagePublicId) {
      try {
        await cloudinary.uploader.destroy(post.featuredImagePublicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
      }
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post deleted',
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
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
