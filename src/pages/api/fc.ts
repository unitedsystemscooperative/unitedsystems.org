import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const carriers = await db
    .collection('fleetCarriers')
    .find({})
    .sort({ name: 1 })
    .toArray();

  res.status(200).json(carriers);
};
