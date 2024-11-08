import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const hashedPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashPass = await bcryptjs.hash(password, saltRounds);
    return hashPass;
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    //hash the password
    const hashedPass = await hashedPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
