const BlogPost = require('../models/BlogPost');
const cloudinary = require('../config/cloudinary');
const { generateSlug, generateUniqueSlug } = require('../utils/slugify');

const escapeRegExp = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getAllPosts = async (req, res) => {
  try {
    const { category, published, page = 1, limit = 10, search } = req.query;
    const filter = {};
    
    if (published === 'true') {
      filter.isPublished = true;
    } else if (published === 'false') {
      filter.isPublished = false;
    }
    
    if (category) {
      filter.category = category;
    }

    if (search && String(search).trim()) {
      const safe = escapeRegExp(search.trim());
      const re = new RegExp(safe, 'i');
      filter.$or = [
        { title: re },
        { slug: re },
        { excerpt: re },
        { category: re },
        { tags: re },
        { 'seo.title': re },
        { 'seo.description': re },
        { 'seo.keywords': re },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await BlogPost.countDocuments(filter);

    const posts = await BlogPost.find(filter)
      .populate('author', 'name email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
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
    const { title, tags, isPublished, ...rest } = req.body;
    
    const baseSlug = req.body.slug || generateSlug(title);
    const slug = await generateUniqueSlug(BlogPost, baseSlug);
    
    const postData = {
      ...rest,
      title,
      slug,
      author: req.user._id,
      isPublished: isPublished || false,
    };
    
    if (tags && typeof tags === 'string') {
      postData.tags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      postData.tags = tags;
    }
    
    if (isPublished && !postData.publishedAt) {
      postData.publishedAt = new Date();
    }
    
    const post = await BlogPost.create(postData);
    
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

    const { title, tags, isPublished, slug, ...rest } = req.body;
    const updateData = { ...rest };
    
    if (title && title !== oldPost.title) {
      updateData.title = title;
      if (!slug) {
        const baseSlug = generateSlug(title);
        updateData.slug = await generateUniqueSlug(BlogPost, baseSlug, req.params.id);
      }
    }
    
    if (slug && slug !== oldPost.slug) {
      updateData.slug = await generateUniqueSlug(BlogPost, slug, req.params.id);
    }
    
    if (tags !== undefined) {
      if (typeof tags === 'string') {
        updateData.tags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else if (Array.isArray(tags)) {
        updateData.tags = tags;
      }
    }
    
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
      if (isPublished && !oldPost.isPublished && !oldPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, {
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
