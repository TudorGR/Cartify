import express from "express";
import {
  getDiscounted,
  getFeatured,
  getProduct,
  getProducts,
  getProductsCategory,
  searchProducts,
} from "../controllers/productsController.js";

const router = express.Router();

router.post("/search", searchProducts);
router.get("/products", getProducts);
router.get("/products/:category", getProductsCategory);
router.get("/featured", getFeatured);
router.get("/discounted", getDiscounted);
router.get("/product/:id", getProduct);

export default router;
