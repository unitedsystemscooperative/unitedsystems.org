import { IJoinInfo } from 'models/join/joinInfo';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
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
      const session = await getSession({ req });
      if (session) {
        const factionSystems = await db
          .collection('joiners')
          .find({})
          .sort({ timeStamp: -1 })
          .toArray();

        res.status(200).json(factionSystems);
      } else {
        res
          .status(401)
          .send({ error: 'You must be signed in to view the joiners' });
      }
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
