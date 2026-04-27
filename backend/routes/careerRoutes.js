const express = require('express');
const {
  getPublishedOpenings,
  getAllOpeningsForAdmin,
  createOpening,
  updateOpening,
  deleteOpening,
  getCareerApplications,
  updateCareerApplicationStatus,
  downloadCareerResume,
} = require('../controllers/careerController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getPublishedOpenings);
router.get('/admin', protect, adminOnly, getAllOpeningsForAdmin);
router.get('/applications', protect, adminOnly, getCareerApplications);
router.get('/applications/:id/resume', protect, adminOnly, downloadCareerResume);
router.patch('/applications/:id/status', protect, adminOnly, updateCareerApplicationStatus);
router.post('/', protect, adminOnly, createOpening);
router.put('/:id', protect, adminOnly, updateOpening);
router.delete('/:id', protect, adminOnly, deleteOpening);

module.exports = router;
