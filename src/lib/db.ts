import mongoose from "mongoose";

/**
 * Mongoose connection helper (MongoDB Atlas). The app degrades gracefully when
 * MONGODB_URI is not configured (e.g. preview deployments): API routes fall
 * back to email-only handling instead of crashing.
 *
 * The connection promise is cached on globalThis in all environments to prevent
 * multiple connections during Next.js hot-reload (dev) or serverless module
 * re-evaluation.
 */
const MONGODB_URI = process.env.MONGODB_URI;

export const databaseConfigured = Boolean(MONGODB_URI);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = globalThis as unknown as { mongoose?: MongooseCache };

const cache: MongooseCache =
  globalForMongoose.mongoose ?? (globalForMongoose.mongoose = { conn: null, promise: null });

/**
 * Connect to MongoDB (idempotent). Returns the mongoose instance, or null when
 * MONGODB_URI is not set so callers can fall back gracefully.
 */
export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) return null;
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }

  return cache.conn;
}
