import express from "express";
import {
  getFeatured,
  getProduct,
  getProducts,
  getProductsCategory,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:category", getProductsCategory);
router.get("/featured", getFeatured);
router.get("/product/:id", getProduct);

export default router;
