import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to create a post"));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all the required firelds"));
  }

  //create a slug for the post
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, ""); // remove special characters and spaces

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedpost = await newPost.save();
    res.status(201).json(savedpost);
  } catch (error) {
    next(error);
  }
};
