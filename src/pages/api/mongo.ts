import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'util/mongodb';

export default (req: NextApiRequest, res: NextApiResponse) => {};

const getFromMongo = async (collectionName: string, query?: any) => {
  try {
    const { client } = await connectToDatabase();

    const database = client.db('ggtavern');
    const collection = database.collection(collectionName);

    if (query && Object.keys(query).includes('index')) {
      query.index = parseInt(query.index);
    }
    const cursor = collection.find(query);
    const response = await cursor.toArray();
    return response;
  } catch (err) {
    console.error(err);
  }
};
