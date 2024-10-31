import express from 'express';
import { getBlogs } from '../controllers/news.Controller.js';
// import { get } from 'mongoose';

const router = express.Router();

// Route to Get All Blogs
router.get('/', getBlogs);

export default router;
