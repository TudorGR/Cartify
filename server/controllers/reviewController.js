import ReviewModel from "../models/review.js";
import mongoose from "mongoose";

// Utility function to ensure DB connection
const ensureDbConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected");
  }
};

export const getReviews = async (req, res) => {
  try {
    // Ensure database connection
    await ensureDbConnection();
    
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get review statistics for a product
export const getReviewStats = async (req, res) => {
  try {
    // Ensure database connection
    await ensureDbConnection();
    
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId });

    if (reviews.length === 0) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      ratingDistribution[review.rating]++;
    });

    res.json({
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    // Ensure database connection
    await ensureDbConnection();
    
    const { productId, name, email, rating, comment } = req.body;

    const review = new ReviewModel({
      productId,
      name,
      email,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
