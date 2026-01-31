import mongoose from "mongoose";
import { Student } from "../models/student.js";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    await Student.syncIndexes();
    console.log("Db indexes synced");
  } catch (error) {
    console.log("Error connection to MongoDB:", error);
    process.exit(1);
  }
};
