import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  updateUser,
  deleteUser,
  signout,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.put(
  "/update/:userId",
  verifyUser,
  upload.single("profilePicture"),
  updateUser
);

router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);

export default router;
