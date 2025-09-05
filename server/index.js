import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
// app.use("/images", express.static("images"));
app.use(authRoutes);
app.use(productsRoutes);
app.use(imageRoutes);
app.use(orderRoutes);
app.use(express.urlencoded({ extended: false }));

const dbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose
  .connect(dbUri)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("error", err));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
