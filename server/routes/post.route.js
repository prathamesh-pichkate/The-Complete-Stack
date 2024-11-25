import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createPost,
  getposts,
  deletepost,
  updatepost,
} from "../controllers/post.controller.js";

import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/create", verifyUser, upload.single("image"), createPost);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletepost);
router.put(
  "/updatepost/:postId/:userId",
  verifyUser,
  upload.single("image"),
  updatepost
);

export default router;
