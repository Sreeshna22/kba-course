import express from "express";
import { Blog } from "../Models/Blog.js";

const router = express.Router();

// ➕ Create Blog
router.post("/add", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📖 Get All Blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// 📖 Get One Blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// 📝 Update Blog
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: "Error updating blog" });
  }
});

// ❌ Delete Blog
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting blog" });
  }
});

export default router;
