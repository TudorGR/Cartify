// Simple test to verify MongoDB connection works
import mongoose from "mongoose";
import "dotenv/config";

// Configure mongoose for serverless
mongoose.set("bufferCommands", false);
mongoose.set("strictQuery", true);

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    console.log(
      "MongoDB URI (first 30 chars):",
      process.env.MONGODB_URI?.substring(0, 30) + "..."
    );

    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log("✅ Successfully connected to MongoDB!");
    console.log("Connection state:", mongoose.connection.readyState);
    console.log("Database name:", mongoose.connection.name);

    // Test a simple operation
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    await mongoose.disconnect();
    console.log("✅ Disconnected successfully");
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);

    if (error.reason) {
      console.error("Detailed reason:", error.reason);
    }

    process.exit(1);
  }
}

testConnection();
