import News from "../models/News.js";

// Get All Blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await News.find({}).sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    next(err);
  }
};
