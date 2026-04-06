const FormContent = require('../models/FormContent');

// Get all forms
const getAllForms = async (req, res) => {
  try {
    const forms = await FormContent.find().sort({ formIdentifier: 1 });
    
    res.json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching forms',
      error: error.message,
    });
  }
};

// Get form by identifier
const getFormByIdentifier = async (req, res) => {
  try {
    const form = await FormContent.findOne({ formIdentifier: req.params.identifier });
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found',
      });
    }

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching form',
      error: error.message,
    });
  }
};

// Create or update form
const upsertForm = async (req, res) => {
  try {
    const { formIdentifier } = req.params;
    
    const form = await FormContent.findOneAndUpdate(
      { formIdentifier },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      data: form,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error saving form',
      error: error.message,
    });
  }
};

// Delete form
const deleteForm = async (req, res) => {
  try {
    const form = await FormContent.findOneAndDelete({ formIdentifier: req.params.identifier });

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Form not found',
      });
    }

    res.json({
      success: true,
      message: 'Form deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting form',
      error: error.message,
    });
  }
};

module.exports = {
  getAllForms,
  getFormByIdentifier,
  upsertForm,
  deleteForm,
};
