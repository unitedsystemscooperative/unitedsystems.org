import { IDbItem } from 'models/dbItem';
import {
  Db,
  MongoClient,
  MongoClientOptions,
  ObjectId,
  OptionalId,
  UpdateFilter,
  UpdateOptions,
} from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export const insertItem = async <T extends IDbItem>(
  collectionName: string,
  itemToInsert: T,
  db: Db
) => {
  if (typeof itemToInsert._id === 'string')
    itemToInsert._id = new ObjectId(itemToInsert._id);
  await db
    .collection<T>(collectionName)
    .insertOne(itemToInsert as OptionalId<T>);
};

export const updateItem = async <T extends IDbItem>(
  collectionName: string,
  itemToUpdate: T,
  db: Db
) => {
  console.log(itemToUpdate);
  let { _id } = itemToUpdate;
  if (typeof _id === 'string') _id = new ObjectId(_id);
  delete itemToUpdate._id;
  const updateDoc: UpdateFilter<T> = { $set: { ...itemToUpdate } };
  const options: UpdateOptions = { upsert: false };
  console.log(_id);
  console.log({ updateDoc });
  const updateResult = await db
    .collection<T>(collectionName)
    .updateOne({ _id }, updateDoc, options);

  console.log(updateResult);
  if (updateResult.modifiedCount > 0) return true;
  else return false;
};

export const deleteItem = async (
  collectionName: string,
  id: string,
  db: Db
) => {
  const idtoDelete = new ObjectId(id);
  await db.collection(collectionName).deleteOne({ _id: idtoDelete });
};

export const getItems = async <T>(
  collectionName: string,
  db: Db,
  sortField?: keyof T,
  order?: 1 | -1
): Promise<T[]> => {
  const cursor = db
    .collection<T>(collectionName)
    .find({})
    .sort({ [sortField]: order });
  const results = await cursor.toArray();
  cursor.close();
  console.log(results);

  return results;
};
