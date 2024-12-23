const Blog = require('../models/blogModel');
const calculateReadingTime = require('../utils/calculateReadingTime');

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;
    const reading_time = calculateReadingTime(body);
    const blog = await Blog.create({
      title,
      description,
      tags,
      body,
      reading_time,
      author: req.user.id,
    });
    res.status(201).json({ blog });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add more controller methods (update, delete, get blogs, etc.)
