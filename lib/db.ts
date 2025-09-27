import clientPromise from "./mongodb";
import { Collection, Db, Document } from "mongodb";

// Generic helper to get a database instance
export async function getDb(dbName = "cropsseason"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

// Generic helper to get a typed collection
export async function getCollection<T extends Document>(
  name: string,
  dbName = "cropsseason"
): Promise<Collection<T>> {
  const db = await getDb(dbName);
  return db.collection<T>(name);
}
