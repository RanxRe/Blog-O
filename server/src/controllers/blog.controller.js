import { handleError } from "../helpers/handleError.js";
import cloudinary from "../lib/cloudinary.js";
import blogModel from "../models/blog.model.js";
import { encode } from "entities";

export const addBlog = async (req, res, next) => {
  try {
    // our data we will get from client here will be multipart form data, we have to use json.parse() to get stringified data from client
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    // Upload the image
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-o-app",
          resource_type: "auto",
        });
        // save image URL
        featuredImage = uploadResult.secure_url;
      } catch (error) {
        next(handleError(500, error.message));
      }
    }

    const blog = new blogModel({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      //   we will use HTML entities for saving blogContent
      blogContent: encode(data.blogContent),
    });
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return next(handleError(404, "No category id found"));
    }

    const blog = await blogModel.findById(blogId).populate("category", "name");
    if (!blog) {
      return next(handleError(404, "No blogs found"));
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    // our data we will get from client here will be multipart form data, we have to use json.parse() to get stringified data from client
    const { blogId } = req.params;
    const data = JSON.parse(req.body.data);

    const existingBlog = await blogModel.findById(blogId);
    if (!existingBlog) {
      return next(handleError(404, "Blog not found"));
    }

    let featuredImage = existingBlog.featuredImage;

    // Upload the image
    // if we get feturedImage on req url then we eill set it
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-o-app",
          resource_type: "auto",
        });
        // save image URL
        featuredImage = uploadResult.secure_url;
      } catch (error) {
        next(handleError(500, error.message));
      }
    }

    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      {
        category: data.category,
        title: data.title,
        slug: data.slug,
        blogContent: encode(data.blogContent),
        featuredImage,
      },
      { new: true },
    );

    // await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findByIdAndDelete(blogId);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    const blog = await blogModel
      .find()
      .populate("author", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      totalCount: blog.length,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
