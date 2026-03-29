const express = require('express');
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllTeamMembers);
router.post('/', protect, adminOnly, createTeamMember);
router.put('/:id', protect, adminOnly, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

module.exports = router;
