import { handleError } from "../helpers/handleError.js";
import likeModel from "../models/like.model.js";

export const doLike = async (req, res, next) => {
  try {
    const { userId, blogId } = req.body;
    let like = await likeModel.findOne({ userId, blogId });
    if (!like) {
      const newLike = new likeModel({
        userId,
        blogId,
      });
      like = await newLike.save();
    } else {
      await likeModel.findByIdAndDelete(like._id);
    }
    const likeCount = await likeModel.countDocuments({ blogId });
    res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blogId, userId } = req.params;
    // const userId = req.user?._id; // from JWT
    const likeCount = await likeModel.countDocuments({ blogId });

    let isLiked = false;
    if (userId) {
      const existing = await likeModel.countDocuments({ blogId, userId });
      if (existing > 0) {
        isLiked = true;
      }
    }
    res.status(200).json({
      success: true,
      likeCount,
      isLiked,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
