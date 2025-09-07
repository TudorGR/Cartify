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
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(
  Boolean
);
const corsOptions = {
  origin: (origin, callback) => {
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
app.use(cookieParser());

// Session configuration for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const dbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Set Mongoose options for serverless
mongoose.set("bufferCommands", false);
mongoose.set("strictQuery", true);

// Create a connection promise
let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  // If there's already a connection attempt in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose.connect(dbUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 10000,
    maxPoolSize: 5,
    retryWrites: true,
    retryReads: true,
    heartbeatFrequencyMS: 2000,
    serverSelectionRetryDelayMS: 1000,
  });

  try {
    await connectionPromise;
    isConnected = true;
    console.log("Connected to DB");
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
      connectionPromise = null;
    });

    mongoose.connection.on('error', (error) => {
      console.log('MongoDB error:', error);
      isConnected = false;
      connectionPromise = null;
    });

  } catch (error) {
    console.log("Database connection error:", error);
    connectionPromise = null;
    throw error;
  }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check endpoint
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Routes
app.use(authRoutes);
app.use(productsRoutes);
app.use(imageRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(oauthRoutes);

// Initialize connection for local development
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  });
}

export default app;
