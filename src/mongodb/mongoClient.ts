import type { Db } from "mongodb";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB || "express-oh";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectDb = async (): Promise<Db | null> => {
  if (!client) {
    client = new MongoClient(URI);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }

  return db;
};

export const getDb = async (): Promise<Db> => {
  if (!db) throw new Error("Database not connected");
  return db;
};

export const closeDb = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
    db = null;
    client = null;
  }
};
