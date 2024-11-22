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
