import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  //get the data
  const { email, password } = req.body;

  //verify if data is valid
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    //get the user validity
    const user = await User.findOne({ email });

    //check if user is present or not
    if (!user) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    //copare the password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    //create a token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //send the response with the cookie
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ message: "Signin successfully" });
  } catch (error) {
    next(error);
  }
};
