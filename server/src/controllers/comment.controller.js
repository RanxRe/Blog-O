import { handleError } from "../helpers/handleError.js";
import commentModel from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { user, blogId, comment } = req.body;
    const newComment = new commentModel({
      // author: req.user._id,
      user: user,
      blogId: blogId,
      comment: comment,
    });

    await newComment.save();
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getComment = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const comments = await commentModel
      .find({ blogId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCount = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const commentCount = await commentModel.countDocuments({ blogId });
    res.status(200).json({
      success: true,
      commentCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
