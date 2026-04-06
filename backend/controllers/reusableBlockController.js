const ReusableBlock = require('../models/ReusableBlock');

// Get all blocks
const getAllBlocks = async (req, res) => {
  try {
    const { category, blockType, isActive } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (blockType) filter.blockType = blockType;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const blocks = await ReusableBlock.find(filter).sort({ blockName: 1 });
    
    res.json({
      success: true,
      count: blocks.length,
      data: blocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blocks',
      error: error.message,
    });
  }
};

// Get single block by identifier
const getBlockByIdentifier = async (req, res) => {
  try {
    const block = await ReusableBlock.findOne({ blockIdentifier: req.params.identifier });
    
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
    res.status(500).json({
      success: false,
      message: 'Error fetching block',
      error: error.message,
    });
  }
};

// Create block
const createBlock = async (req, res) => {
  try {
    const block = await ReusableBlock.create(req.body);
    
    res.status(201).json({
      success: true,
      data: block,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating block',
      error: error.message,
    });
  }
};

// Update block
const updateBlock = async (req, res) => {
  try {
    const block = await ReusableBlock.findByIdAndUpdate(
      req.params.id,
      req.body,
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
      data: block,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating block',
      error: error.message,
    });
  }
};

// Delete block
const deleteBlock = async (req, res) => {
  try {
    const block = await ReusableBlock.findByIdAndDelete(req.params.id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }

    res.json({
      success: true,
      message: 'Block deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting block',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlocks,
  getBlockByIdentifier,
  createBlock,
  updateBlock,
  deleteBlock,
};
