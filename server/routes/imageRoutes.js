import express from "express";
import {
  getImageKitAuth,
  getOptimizedImageUrl,
  listImages,
} from "../controllers/imageController.js";

const router = express.Router();

// Get ImageKit authentication parameters
router.get("/api/imagekit/auth", getImageKitAuth);

// Generate optimized image URL
router.get("/api/imagekit/url", getOptimizedImageUrl);

// List images from ImageKit
router.get("/api/imagekit/images", listImages);

export default router;
