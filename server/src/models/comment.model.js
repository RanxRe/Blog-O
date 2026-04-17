import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel;
