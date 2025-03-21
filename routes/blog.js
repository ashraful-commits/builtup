const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
} = require("../controllers/blogController");
const { photoMulter } = require("../middlewares/multer");

// Create a blog post (with file upload support)
router.post("/", photoMulter, createBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get a single blog post by ID
router.get("/:id", getBlogById);

// Update a blog post (with file upload support)
router.put("/:id", photoMulter, updateBlog);

// Delete a blog post
router.get("/delete/:id", deleteBlog);

// Activate or deactivate a blog post
router.patch("/:id/toggle-status", toggleBlogStatus);

module.exports = router;
