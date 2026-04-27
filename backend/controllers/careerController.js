const CareerOpening = require('../models/CareerOpening');
const ContactInquiry = require('../models/ContactInquiry');
const path = require('path');

const sortQuery = { order: 1, createdAt: -1 };

const getPublishedOpenings = async (req, res) => {
  try {
    const openings = await CareerOpening.find({ isPublished: true }).sort(sortQuery);
    res.status(200).json({
      success: true,
      count: openings.length,
      data: openings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getAllOpeningsForAdmin = async (req, res) => {
  try {
    const openings = await CareerOpening.find().sort(sortQuery);
    res.status(200).json({
      success: true,
      count: openings.length,
      data: openings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const createOpening = async (req, res) => {
  try {
    const opening = await CareerOpening.create(req.body);
    res.status(201).json({
      success: true,
      data: opening,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateOpening = async (req, res) => {
  try {
    const opening = await CareerOpening.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!opening) {
      return res.status(404).json({
        success: false,
        message: 'Career opening not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: opening,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteOpening = async (req, res) => {
  try {
    const opening = await CareerOpening.findByIdAndDelete(req.params.id);

    if (!opening) {
      return res.status(404).json({
        success: false,
        message: 'Career opening not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Career opening deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getCareerApplications = async (req, res) => {
  try {
    const applications = await ContactInquiry.find({
      $or: [
        { serviceOfInterest: { $regex: /^careers?\s*-/i } },
        { serviceOfInterest: { $regex: /^career/i } },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateCareerApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['new', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, in-progress, or resolved',
      });
    }

    const application = await ContactInquiry.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { serviceOfInterest: { $regex: /^careers?\s*-/i } },
          { serviceOfInterest: { $regex: /^career/i } },
        ],
      },
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Career application not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getMimeTypeFromFileName = (fileName = '') => {
  const ext = path.extname(String(fileName || '')).toLowerCase();

  if (ext === '.pdf') return 'application/pdf';
  if (ext === '.doc') return 'application/msword';
  if (ext === '.docx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }

  return 'application/octet-stream';
};

const downloadCareerResume = async (req, res) => {
  try {
    const application = await ContactInquiry.findOne({
      _id: req.params.id,
      $or: [
        { serviceOfInterest: { $regex: /^careers?\s*-/i } },
        { serviceOfInterest: { $regex: /^career/i } },
      ],
    });

    if (!application || !application.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found for this application',
      });
    }

    const upstreamResponse = await fetch(application.resumeUrl);

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      return res.status(502).json({
        success: false,
        message: 'Could not fetch resume from storage',
      });
    }

    const safeFileName =
      String(application.resumeOriginalName || 'resume')
        .replace(/[\r\n"]/g, '')
        .trim() || 'resume';
    const contentType = getMimeTypeFromFileName(safeFileName);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);

    const arrayBuffer = await upstreamResponse.arrayBuffer();
    return res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getPublishedOpenings,
  getAllOpeningsForAdmin,
  createOpening,
  updateOpening,
  deleteOpening,
  getCareerApplications,
  updateCareerApplicationStatus,
  downloadCareerResume,
};
