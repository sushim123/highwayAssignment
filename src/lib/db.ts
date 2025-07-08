import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
export const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error(
      "MONGODB_URI is not defined in .env. Database connection skipped."
    );
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
