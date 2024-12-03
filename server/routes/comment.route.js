import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likedComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);
router.get("/getPostComment/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyUser, likedComment);
export default router;
