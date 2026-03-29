const Service = require('../models/Service');

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
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
  getAllServices,
};
