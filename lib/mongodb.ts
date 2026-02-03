import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const clientPromise =
  global._mongoClientPromise ??
  (global._mongoClientPromise = new MongoClient(uri, options).connect());

export default clientPromise;
