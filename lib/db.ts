import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

// Reuse connection across hot reloads in dev
const cached = (global as any).mongoose ?? { conn: null, promise: null };
(global as any).mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      })
      .catch((err) => {
        cached.promise = null; // reset so next call retries
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
