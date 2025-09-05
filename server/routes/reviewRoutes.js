import express from "express";
import {
  getReviews,
  createReview,
  getReviewStats,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/reviews/:productId", getReviews);
router.get("/reviews/:productId/stats", getReviewStats);
router.post("/reviews", createReview);

export default router;
