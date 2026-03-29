const express = require('express');
const {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, adminOnly, createPost);
router.put('/:id', protect, adminOnly, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);

module.exports = router;
