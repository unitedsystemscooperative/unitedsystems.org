import { connectToDatabase } from '@/lib/db';

import { Filter, ObjectId, OptionalUnlessRequiredId, UpdateOptions, WithId } from 'mongodb';

export type WithStringId<T> = Omit<T, '_id'> & { _id: string };
export type WithOptionalId<T> = Omit<T, '_id'> & { _id?: string };
const mapIdToString = <T>(item: WithId<T>): WithStringId<T> => {
  return { ...item, _id: item._id.toString() };
};

export const insertItem = async <T>(collectionName: string, itemToInsert: WithId<T>) => {
  const db = await connectToDatabase();
  const result = await db
    .collection<WithId<T>>(collectionName)
    .insertOne(itemToInsert as OptionalUnlessRequiredId<WithId<T>>);

  return result.insertedId;
};
export const updateItem = async <T>(collectionName: string, itemToUpdate: WithId<T>) => {
  const db = await connectToDatabase();

  const filter: Filter<WithId<T>> = itemToUpdate._id;
  const options: UpdateOptions = { upsert: false };
  const updateResult = await db
    .collection<WithId<T>>(collectionName)
    .updateOne(filter, { ...itemToUpdate }, options);

  if (updateResult.modifiedCount > 0) return true;
  else return false;
};

export const deleteItem = async (collectionName: string, id: string) => {
  const db = await connectToDatabase();

  const idtoDelete = new ObjectId(id);
  await db.collection(collectionName).deleteOne({ _id: idtoDelete });
};

export const getItems = async <T>(
  collectionName: string,
  sortField?: keyof T,
  order?: 1 | -1
): Promise<WithStringId<T>[]> => {
  const db = await connectToDatabase();

  const cursor = db
    .collection<T>(collectionName)
    .find({})
    .sort({ [sortField]: order });
  const results = await cursor.toArray();
  cursor.close();

  return results.map((x) => mapIdToString(x));
};

export const getItemsByQuery = async <T>(
  collectionName: string,
  query: Filter<T>,
  sortField?: keyof T,
  order?: 1 | -1
): Promise<WithStringId<T>[]> => {
  const db = await connectToDatabase();

  const cursor = db
    .collection<T>(collectionName)
    .find(query)
    .sort({ [sortField]: order });
  const results = await cursor.toArray();
  cursor.close();

  return results.map((x) => mapIdToString(x));
};
