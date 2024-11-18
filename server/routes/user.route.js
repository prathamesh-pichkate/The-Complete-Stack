import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.put(
  "/update/:userId",
  verifyUser,
  upload.single("profilePicture"),
  updateUser
);

export default router;
