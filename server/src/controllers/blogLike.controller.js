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
    const { blogId } = req.params;
    const likeCount = await likeModel.countDocuments({ blogId });
    res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
