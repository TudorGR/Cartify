import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cookieParser from "cookie-parser";
import oauthRoutes from "./routes/oauthRoutes.js";
import passport from "./config/passport.js";
import session from "express-session";

const app = express();
// Behind Vercel/Proxies, trust proxy for secure cookies to work correctly
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(
  Boolean
);
const corsOptions = {
  origin: (origin, callback) => {
    // allow SSR / same-origin and Vercel preview domains
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// CORS middleware will handle preflight automatically in Express 5

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use("/images", express.static("images"));
app.use(authRoutes);
app.use(productsRoutes);
app.use(imageRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(oauthRoutes);
// quick health endpoint for warm-ups/monitoring
app.get("/health", (_req, res) => res.status(200).send("ok"));

const dbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Tune Mongoose to fail fast on bad connections in serverless and avoid long buffering
mongoose.set("bufferCommands", false);
// Optional: keep queries strict; harmless if already default
mongoose.set("strictQuery", true);

mongoose
  .connect(dbUri, {
    serverSelectionTimeoutMS: 8000, // fail fast to avoid 10s+ serverless timeouts
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("error", err));

if (!process.env.VERCEL) {
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

export default app;
