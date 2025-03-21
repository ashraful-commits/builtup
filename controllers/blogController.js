const {validator} = require("../utility/validator");
const Blog = require("../models/blog");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    
    // Fix image retrieval
    const image = req.file ? req.file.filename : null;

    

    const newBlog = new Blog({
      title,
      description,
      image,
      tags,
    });

    console.log("New Blog Data:", newBlog);

    await newBlog.save();
    res.redirect("/auth/admin");
  } catch (error) {
    console.error("Error creating blog:", error.message);
    return validator(error.message, "/auth/admin", req, res);
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.redirect("/auth/admin");
  } catch (error) {
    return validator(error.message, "/auth/admin", req, res);
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.redirect("/auth/admin");
    }
    res.redirect("/auth/admin");
  } catch (error) {
    return validator(error.message, "/auth/admin", req, res);
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const image = req.file.fileName ? req.file.fileName :null;
    console.log(tags)
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, image, tags },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        res.redirect("/auth/admin");
    }

    res.redirect("/auth/admin");
  } catch (error) {
    return validator(error.message, "/auth/admin", req, res);
  }
};

// Delete a blog post
const fs = require("fs");
const path = require("path");

const deleteBlog = async (req, res) => {
  try {
    // Find the blog post before deleting it
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.redirect("/auth/admin");
    }

    // Delete the associated image file if it exists
    if (blog.image) {
      const imagePath = path.join(__dirname, "../public/images", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Remove the image
      }
    }

    // Now delete the blog post
    await Blog.findByIdAndDelete(req.params.id);

    res.redirect("/auth/admin");
  } catch (error) {
    return validator(error.message, "/auth/admin", req, res);
  }
};


// Activate or deactivate a blog post
const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.redirect("/auth/admin");
    }

    blog.isActive = !blog.isActive;
    await blog.save();

    res.redirect("/auth/admin");
  } catch (error) {
    return validator(error.message, "/auth/admin", req, res);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
};
