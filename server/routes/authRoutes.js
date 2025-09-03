import express from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/logout", logoutUser);

export default router;
