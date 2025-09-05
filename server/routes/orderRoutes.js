import express from "express";
import { addOrder, getOrders } from "../controllers/getOrders.js";

const router = express.Router();

router.get("/orders/:email", getOrders);
router.post("/orders", addOrder);

export default router;
