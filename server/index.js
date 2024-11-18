import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorMiddlewar from "./middleware/error.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

//Routers
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(errorMiddlewar);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
