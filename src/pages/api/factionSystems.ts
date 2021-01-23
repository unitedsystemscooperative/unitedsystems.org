import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const factionSystems = await db
    .collection('factionSystems')
    .find({})
    .sort({ text: 1 })
    .toArray();

  res.status(200).json(factionSystems);
};
