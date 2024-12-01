import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyUser, createComment);
router.get("/getPostComment/:postId", getPostComments);
export default router;
