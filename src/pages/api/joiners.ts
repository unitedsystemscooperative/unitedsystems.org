import { IJoinInfo } from 'models/join/joinInfo';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { getToken } from 'utils/get-token';
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
        const token = await getToken(req);
        if (token.role === 'high command') {
          const cursor = db
            .collection('joiners')
            .find({})
            .sort({ timeStamp: -1 });
          const factionSystems = await cursor.toArray();
          cursor.close();

          res.status(200).json(factionSystems);
        } else {
          res.statusMessage = 'You are not authorized for this information.';
          res.status(401).end();
        }
      } else {
        res.statusMessage = 'You are not signed in.';
        res.status(401).end();
      }
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
