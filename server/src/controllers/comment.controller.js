import { handleError } from "../helpers/handleError.js";
import commentModel from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { author, blogId, comment } = req.body;
    const newComment = new commentModel({
      author: author,
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
