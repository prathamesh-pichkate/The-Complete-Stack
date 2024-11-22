import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost } from "../controllers/post.controller.js";

import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/create", verifyUser, upload.single("image"), createPost);

export default router;
