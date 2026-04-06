const PageBlock = require('../models/PageBlock');
const ReusableBlock = require('../models/ReusableBlock');

// Get page blocks with populated block data
const getPageBlocks = async (req, res) => {
  try {
    const { pageName } = req.params;
    
    let pageBlocks = await PageBlock.findOne({ pageName }).populate('blocks.blockId');
    
    if (!pageBlocks) {
      return res.json({
        success: true,
        data: {
          pageName,
          blocks: [],
        },
      });
    }

    // Filter visible blocks and sort by order
    const visibleBlocks = pageBlocks.blocks
      .filter(b => b.isVisible && b.blockId && b.blockId.isActive)
      .sort((a, b) => a.order - b.order);

    res.json({
      success: true,
      data: {
        pageName: pageBlocks.pageName,
        blocks: visibleBlocks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching page blocks',
      error: error.message,
    });
  }
};

// Update page blocks
const updatePageBlocks = async (req, res) => {
  try {
    const { pageName } = req.params;
    const { blocks } = req.body;

    let pageBlocks = await PageBlock.findOne({ pageName });

    if (!pageBlocks) {
      pageBlocks = await PageBlock.create({
        pageName,
        blocks,
      });
    } else {
      pageBlocks.blocks = blocks;
      await pageBlocks.save();
    }

    const populated = await PageBlock.findById(pageBlocks._id).populate('blocks.blockId');

    res.json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating page blocks',
      error: error.message,
    });
  }
};

// Add block to page
const addBlockToPage = async (req, res) => {
  try {
    const { pageName } = req.params;
    const { blockId, order, isVisible } = req.body;

    const block = await ReusableBlock.findById(blockId);
    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found',
      });
    }

    let pageBlocks = await PageBlock.findOne({ pageName });

    if (!pageBlocks) {
      pageBlocks = await PageBlock.create({
        pageName,
        blocks: [{
          blockId,
          blockIdentifier: block.blockIdentifier,
          order: order || 0,
          isVisible: isVisible !== undefined ? isVisible : true,
        }],
      });
    } else {
      pageBlocks.blocks.push({
        blockId,
        blockIdentifier: block.blockIdentifier,
        order: order || pageBlocks.blocks.length,
        isVisible: isVisible !== undefined ? isVisible : true,
      });
      await pageBlocks.save();
    }

    // Update usage count
    block.usageCount += 1;
    await block.save();

    const populated = await PageBlock.findById(pageBlocks._id).populate('blocks.blockId');

    res.json({
      success: true,
      data: populated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding block to page',
      error: error.message,
    });
  }
};

// Remove block from page
const removeBlockFromPage = async (req, res) => {
  try {
    const { pageName, blockId } = req.params;

    const pageBlocks = await PageBlock.findOne({ pageName });

    if (!pageBlocks) {
      return res.status(404).json({
        success: false,
        message: 'Page blocks not found',
      });
    }

    const blockIndex = pageBlocks.blocks.findIndex(b => b.blockId.toString() === blockId);
    
    if (blockIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Block not found on page',
      });
    }

    pageBlocks.blocks.splice(blockIndex, 1);
    await pageBlocks.save();

    // Update usage count
    const block = await ReusableBlock.findById(blockId);
    if (block && block.usageCount > 0) {
      block.usageCount -= 1;
      await block.save();
    }

    res.json({
      success: true,
      message: 'Block removed from page',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing block from page',
      error: error.message,
    });
  }
};

module.exports = {
  getPageBlocks,
  updatePageBlocks,
  addBlockToPage,
  removeBlockFromPage,
};
