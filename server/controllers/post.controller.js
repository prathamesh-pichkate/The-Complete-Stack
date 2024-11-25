import Post from "../models/post.model.js";
import cloudinary from "../utils/cloudinaryFile.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to create a post"));
  }

  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return next(
      errorHandler(400, "All fields (title, content, category) are required")
    );
  }

  let uploadedImageUrl = null;

  try {
    // Handle image file upload via Multer (form-data)
    if (req.file) {
      uploadedImageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "posts", use_filename: true },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          )
          .end(req.file.buffer);
      });
    }

    // Use default image if no file or image is provided
    if (!uploadedImageUrl) {
      uploadedImageUrl =
        "https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D";
    }

    // Generate a slug for the post
    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters and spaces

    // Create a new post
    const newPost = new Post({
      title,
      content,
      category,
      slug,
      userId: req.user.id,
      image: uploadedImageUrl,
    });

    // Save the post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this post")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this post")
    );
  }

  try {
    // Fetch the existing post
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    let updatedImageUrl = post.image; // Default to the existing image URL

    // If a new image file is uploaded, upload it to Cloudinary
    if (req.file) {
      updatedImageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "posts", use_filename: true },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          )
          .end(req.file.buffer);
      });
    }

    // Update the post details
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title || post.title,
          content: req.body.content || post.content,
          category: req.body.category || post.category,
          image: updatedImageUrl, // Use the new image URL if provided
        },
      },
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
