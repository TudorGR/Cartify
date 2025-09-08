import mongoose from "mongoose";

// Global connection cache for serverless
let cachedConnection = null;
let connectionPromise = null;

export const connectDB = async () => {
  // If we have a cached connection and it's ready, return it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  // If there's already a connection attempt in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    const dbUri = process.env.MONGODB_URI;

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

export const ensureDbConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    console.log(
      "Database not connected, current state:",
      mongoose.connection.readyState
    );
    throw new Error("Database not connected");
  }
};
