import { IDbItem } from '@/models/dbItem';
import {
  Db,
  Filter,
  MongoClient,
  MongoClientOptions,
  ObjectId,
  OptionalId,
  UpdateFilter,
  UpdateOptions,
} from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
const opts: MongoClientOptions = {
  maxIdleTimeMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, opts);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, opts);
  clientPromise = client.connect();
}

export { clientPromise };

export const connectToDatabase = async () => {
  const client = await clientPromise;
  return client.db();
};

export const insertItem = async <T extends IDbItem>(
  collectionName: string,
  itemToInsert: T,
  db: Db
) => {
  if (typeof itemToInsert._id === 'string') itemToInsert._id = new ObjectId(itemToInsert._id);
  const result = await db.collection<T>(collectionName).insertOne(itemToInsert as OptionalId<T>);
  return result.insertedId;
};

export const updateItem = async <T extends IDbItem>(
  collectionName: string,
  itemToUpdate: T,
  db: Db
) => {
  let { _id } = itemToUpdate;
  if (typeof _id === 'string') _id = new ObjectId(_id);
  delete itemToUpdate._id;
  const updateDoc: UpdateFilter<T> = { $set: { ...itemToUpdate } };
  const options: UpdateOptions = { upsert: false };
  const updateResult = await db
    .collection<T>(collectionName)
    .updateOne({ _id }, updateDoc, options);

  if (updateResult.modifiedCount > 0) return true;
  else return false;
};

export const deleteItem = async (collectionName: string, id: string, db: Db) => {
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
  const results = (await cursor.toArray()) as T[];
  cursor.close();

  return results;
};

export const getItemsByQuery = async <T>(
  collectionName: string,
  db: Db,
  query: Filter<T>,
  sortField?: keyof T,
  order?: 1 | -1
) => {
  const cursor = db
    .collection<T>(collectionName)
    .find(query)
    .sort({ [sortField]: order });
  const results = await cursor.toArray();
  cursor.close();

  return results;
};
