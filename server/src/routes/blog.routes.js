import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlogSingle,
  getRelatedBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../lib/multer.js";

export const blogRouter = express.Router();

// we are sending file also so using multer middleware here and the 'file' from client
blogRouter.post("/add", upload.single("file"), addBlog);
blogRouter.get("/get-all", getAllBlog);
blogRouter.get("/get-blog/:slug", getBlogSingle);
blogRouter.get("/edit/:blogId", editBlog);
blogRouter.put("/update/:blogId", upload.single("file"), updateBlog);
blogRouter.delete("/delete/:blogId", deleteBlog);
blogRouter.get("/get-related-blog/:category/:slug", getRelatedBlog);
