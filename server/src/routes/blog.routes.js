import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlogByCategory,
  getBlogPublic,
  getBlogSingle,
  getRelatedBlog,
  search,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../lib/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const blogRouter = express.Router();

// we are sending file also so using multer middleware here and the 'file' from client
blogRouter.post("/add", authenticate, upload.single("file"), addBlog);
blogRouter.get("/get-all", authenticate, getAllBlog);
blogRouter.get("/edit/:blogId", authenticate, editBlog);
blogRouter.put("/update/:blogId", authenticate, upload.single("file"), updateBlog);
blogRouter.delete("/delete/:blogId", authenticate, deleteBlog);

blogRouter.get("/get-blog/:slug", getBlogSingle);
blogRouter.get("/blogs", getBlogPublic);
blogRouter.get("/get-related-blog/:category/:slug", getRelatedBlog);
blogRouter.get("/get-blog-by-category/:category", getBlogByCategory);
blogRouter.get("/search", search);
