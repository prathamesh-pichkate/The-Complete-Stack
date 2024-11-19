import cloudinary from "../utils/cloudinaryFile.js";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    // Check if user is authorized to update their own profile
    if (req.user.id !== req.params.userId) {
      return next(
        errorHandler(403, "You are not authorized to update this user")
      );
    }

    const { username, email, password } = req.body;
    let updateProfilePicture = null;

    // Check if a file is provided and upload it to Cloudinary
    if (req.file) {
      // Use a promise to handle the upload
      updateProfilePicture = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "user_profiles", use_filename: true },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          )
          .end(req.file.buffer); // Use buffer for memory storage files
      });
    }

    // Prepare the update fields
    const updates = {
      username,
      email,
      ...(updateProfilePicture && { profilePicture: updateProfilePicture }),
    };

    // If password is provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this user")
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
