import News from "../models/News.js";

// Get All Blogs
// In newsController.js
export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
    const blogs = await News.find({})
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit) // Skip the documents of previous pages
      .limit(Number(limit)); // Limit to 'limit' documents
    
    const totalBlogs = await News.countDocuments(); // Count total documents
    res.status(200).json({
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    next(err);
  }
};
