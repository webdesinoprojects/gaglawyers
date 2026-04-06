const NavigationMenu = require('../models/NavigationMenu');

// Get all menus
const getAllMenus = async (req, res) => {
  try {
    const menus = await NavigationMenu.find().sort({ menuLocation: 1 });
    
    res.json({
      success: true,
      count: menus.length,
      data: menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menus',
      error: error.message,
    });
  }
};

// Get menu by location
const getMenuByLocation = async (req, res) => {
  try {
    const menu = await NavigationMenu.findOne({ menuLocation: req.params.location });
    
    if (!menu) {
      return res.json({
        success: true,
        data: {
          menuLocation: req.params.location,
          items: [],
        },
      });
    }

    // Filter visible items and sort by order
    const visibleItems = menu.items
      .filter(item => item.isVisible)
      .sort((a, b) => a.order - b.order)
      .map(item => ({
        ...item.toObject(),
        children: item.children
          ? item.children.filter(child => child.isVisible).sort((a, b) => a.order - b.order)
          : [],
      }));

    res.json({
      success: true,
      data: {
        ...menu.toObject(),
        items: visibleItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu',
      error: error.message,
    });
  }
};

// Create or update menu
const upsertMenu = async (req, res) => {
  try {
    const { menuLocation } = req.params;
    
    const menu = await NavigationMenu.findOneAndUpdate(
      { menuLocation },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error saving menu',
      error: error.message,
    });
  }
};

// Delete menu
const deleteMenu = async (req, res) => {
  try {
    const menu = await NavigationMenu.findOneAndDelete({ menuLocation: req.params.location });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'Menu not found',
      });
    }

    res.json({
      success: true,
      message: 'Menu deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting menu',
      error: error.message,
    });
  }
};

module.exports = {
  getAllMenus,
  getMenuByLocation,
  upsertMenu,
  deleteMenu,
};
