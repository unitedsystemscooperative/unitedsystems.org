import { IJoinInfo } from 'models/join/joinInfo';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    if (req.method === 'POST') {
      const response = await db
        .collection<IJoinInfo>('joiners')
        .insertOne(req.body);

      res.json(response.ops);
    } else {
      const factionSystems = await db
        .collection('joiners')
        .find({})
        .sort({ timeStamp: -1 })
        .toArray();

      res.status(200).json(factionSystems);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
