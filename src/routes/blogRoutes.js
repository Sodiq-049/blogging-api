const express = require('express');
const { createBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, createBlog);
// Add other routes here (e.g., update, delete, get blogs)

module.exports = router;
