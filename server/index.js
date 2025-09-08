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

// Environment variable validation
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  if (!process.env.VERCEL) {
    process.exit(1);
  }
}

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
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const dbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Optimize for serverless - disable buffering and set strict mode
mongoose.set("bufferCommands", false);
mongoose.set("strictQuery", true);

// Global connection cache for serverless
let cachedConnection = null;
let connectionPromise = null;

const connectDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  // If there's already a connection attempt in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    connectionPromise = mongoose.connect(dbUri, {
      maxPoolSize: 1, // Limit to 1 connection for serverless
      serverSelectionTimeoutMS: 5000, // Reduce timeout for faster failure
      socketTimeoutMS: 45000, // Keep socket alive longer than function timeout
      family: 4, // Use IPv4, skip trying IPv6
    });

    cachedConnection = await connectionPromise;
    console.log("Connected to MongoDB");

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      cachedConnection = null;
      connectionPromise = null;
    });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB error:", error);
      cachedConnection = null;
      connectionPromise = null;
    });

    return cachedConnection;
  } catch (error) {
    console.error("Database connection error:", error);
    connectionPromise = null;
    cachedConnection = null;
    throw error;
  }
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    // Skip database connection for health check and favicon
    if (
      req.path === "/health" ||
      req.path === "/favicon.ico" ||
      req.path === "/favicon.png"
    ) {
      return next();
    }

    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);

    // Provide more helpful error messages
    let errorMessage = "Database connection failed";

    if (error.message.includes("IP") || error.message.includes("whitelist")) {
      errorMessage =
        "Database access denied. Please check MongoDB Atlas IP whitelist settings.";
    } else if (error.message.includes("authentication")) {
      errorMessage =
        "Database authentication failed. Please check credentials.";
    } else if (error.message.includes("timeout")) {
      errorMessage = "Database connection timeout. Please try again.";
    }

    res.status(500).json({
      error: errorMessage,
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const response = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      server: "running",
    };

    // Try to check database status (optional)
    try {
      await connectDB();
      const dbState = mongoose.connection.readyState;
      const states = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
      };

      response.database = {
        state: states[dbState] || "unknown",
        readyState: dbState,
        connected: dbState === 1,
      };
    } catch (dbError) {
      response.database = {
        state: "error",
        connected: false,
        error: dbError.message,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
});

// Routes
app.use(authRoutes);
app.use(productsRoutes);
app.use(imageRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(oauthRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  // Don't expose internal errors in production
  const isDevelopment = process.env.NODE_ENV !== "production";
  const errorMessage = isDevelopment ? error.message : "Internal server error";

  res.status(500).json({
    error: errorMessage,
    ...(isDevelopment && { stack: error.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Initialize connection for local development
if (!process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    );
  });
}

export default app;
