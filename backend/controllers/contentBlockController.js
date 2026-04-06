const ContentBlock = require('../models/ContentBlock');

// Get all content blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const { blockType, category, isActive } = req.query;
    
    const query = {};
    if (blockType) query.blockType = blockType;
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    
    const blocks = await ContentBlock.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
      .populate('usedInPages.pageId', 'title slug');
    
    res.json({
      success: true,
      data: blocks,
    });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blocks',
      error: error.message,
    });
  }
};

// Get block by ID
exports.getBlockById = async (req, res) => {
  try {
    const block = await ContentBlock.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('usedInPages.pageId', 'title slug');
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    res.json({
      success: true,
      data: block,
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch block',
      error: error.message,
    });
  }
};

// Get block by identifier
exports.getBlockByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const block = await ContentBlock.findOne({ identifier, isActive: true });
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    res.json({
      success: true,
      data: block,
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch block',
      error: error.message,
    });
  }
};

// Create content block
exports.createBlock = async (req, res) => {
  try {
    const blockData = {
      ...req.body,
      createdBy: req.user._id,
    };
    
    const block = new ContentBlock(blockData);
    await block.save();
    
    res.status(201).json({
      success: true,
      message: 'Block created successfully',
      data: block,
    });
  } catch (error) {
    console.error('Error creating block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create block',
      error: error.message,
    });
  }
};

// Update content block
exports.updateBlock = async (req, res) => {
  try {
    const block = await ContentBlock.findByIdAndUpdate(
      req.params.id,
      { ...req.body, version: { $inc: 1 } },
      { new: true, runValidators: true }
    );
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Block updated successfully',
      data: block,
    });
  } catch (error) {
    console.error('Error updating block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update block',
      error: error.message,
    });
  }
};

// Delete content block
exports.deleteBlock = async (req, res) => {
  try {
    const block = await ContentBlock.findById(req.params.id);
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    // Check if block is being used
    if (block.usedInPages && block.usedInPages.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete block that is being used in pages',
        usedInPages: block.usedInPages,
      });
    }
    
    await block.deleteOne();
    
    res.json({
      success: true,
      message: 'Block deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete block',
      error: error.message,
    });
  }
};

// Toggle block active status
exports.toggleActive = async (req, res) => {
  try {
    const block = await ContentBlock.findById(req.params.id);
    
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    block.isActive = !block.isActive;
    await block.save();
    
    res.json({
      success: true,
      message: `Block ${block.isActive ? 'activated' : 'deactivated'} successfully`,
      data: block,
    });
  } catch (error) {
    console.error('Error toggling block status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update block status',
      error: error.message,
    });
  }
};

// Duplicate block
exports.duplicateBlock = async (req, res) => {
  try {
    const originalBlock = await ContentBlock.findById(req.params.id);
    
    if (!originalBlock) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }
    
    const duplicatedBlock = new ContentBlock({
      ...originalBlock.toObject(),
      _id: undefined,
      name: `${originalBlock.name} (Copy)`,
      identifier: `${originalBlock.identifier}-copy-${Date.now()}`,
      usedInPages: [],
      createdBy: req.user._id,
    });
    
    await duplicatedBlock.save();
    
    res.status(201).json({
      success: true,
      message: 'Block duplicated successfully',
      data: duplicatedBlock,
    });
  } catch (error) {
    console.error('Error duplicating block:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate block',
      error: error.message,
    });
  }
};

// Get block types
exports.getBlockTypes = async (req, res) => {
  try {
    const blockTypes = await ContentBlock.distinct('blockType');
    res.json({
      success: true,
      data: blockTypes,
    });
  } catch (error) {
    console.error('Error fetching block types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch block types',
      error: error.message,
    });
  }
};
