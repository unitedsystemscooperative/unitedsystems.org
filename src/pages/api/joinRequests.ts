import { IJoinRequest } from 'models/join/joinRequest';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase, getItems, insertItem } from 'utils/mongo';

const COLLECTION = 'joinRequests';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const joinInfo: IJoinRequest = req.body;

    if (req.method === 'POST') {
      joinInfo.timeStamp = new Date(joinInfo.timeStamp);
      await insertItem(COLLECTION, joinInfo, db);

      res.status(200).end();
    } else {
      if (!isHC) {
        res.status(401).send('unauthorized');
        return;
      }

      const result = await getItems<IJoinRequest>(
        COLLECTION,
        db,
        'timeStamp',
        -1
      );
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};