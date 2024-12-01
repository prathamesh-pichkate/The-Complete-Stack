import comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(content, postId, userId);

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not authorized to create a comment")
      );
    }

    const newComment = new comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
