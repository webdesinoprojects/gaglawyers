const Page = require('../models/Page');

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const {
      status,
      pageType,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};
    if (status) query.status = status;
    if (pageType) query.pageType = pageType;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [pages, total] = await Promise.all([
      Page.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('author', 'name email')
        .select('-blocks.content'), // Exclude heavy content for list view
      Page.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: pages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pages',
      error: error.message,
    });
  }
};

// Get page by slug (public)
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug, status: 'published' })
      .populate('author', 'name email');
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch page',
      error: error.message,
    });
  }
};

// Get page by ID (admin)
exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch page',
      error: error.message,
    });
  }
};

// Create page
exports.createPage = async (req, res) => {
  try {
    const pageData = {
      ...req.body,
      author: req.user._id,
    };
    
    const page = new Page(pageData);
    await page.save();
    
    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page,
    });
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create page',
      error: error.message,
    });
  }
};

// Update page
exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page,
    });
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update page',
      error: error.message,
    });
  }
};

// Delete page
exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete page',
      error: error.message,
    });
  }
};

// Publish/Unpublish page
exports.togglePublish = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    page.status = page.status === 'published' ? 'draft' : 'published';
    if (page.status === 'published' && !page.publishedAt) {
      page.publishedAt = new Date();
    }
    
    await page.save();
    
    res.json({
      success: true,
      message: `Page ${page.status === 'published' ? 'published' : 'unpublished'} successfully`,
      data: page,
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update page status',
      error: error.message,
    });
  }
};

// Reorder blocks
exports.reorderBlocks = async (req, res) => {
  try {
    const { blocks } = req.body;
    const page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    page.blocks = blocks;
    await page.save();
    
    res.json({
      success: true,
      message: 'Blocks reordered successfully',
      data: page,
    });
  } catch (error) {
    console.error('Error reordering blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder blocks',
      error: error.message,
    });
  }
};

// Duplicate page
exports.duplicatePage = async (req, res) => {
  try {
    const originalPage = await Page.findById(req.params.id);
    
    if (!originalPage) {
      return res.status(404).json({
        success: false,
        message: 'Page not found',
      });
    }
    
    const duplicatedPage = new Page({
      ...originalPage.toObject(),
      _id: undefined,
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      status: 'draft',
      publishedAt: null,
      author: req.user._id,
    });
    
    await duplicatedPage.save();
    
    res.status(201).json({
      success: true,
      message: 'Page duplicated successfully',
      data: duplicatedPage,
    });
  } catch (error) {
    console.error('Error duplicating page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate page',
      error: error.message,
    });
  }
};
