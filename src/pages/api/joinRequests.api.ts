import { insertItem, getItems } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { IJoinRequest } from '@/app/join/_models/joinRequest';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'joinRequests';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);

    const joinInfo: IJoinRequest = req.body;

    if (req.method === 'POST') {
      joinInfo.timeStamp = new Date(joinInfo.timeStamp);
      await insertItem(COLLECTION, joinInfo);

      res.status(200).end();
    } else {
      if (!isHC) {
        res.status(401).send('unauthorized');
        return;
      }

      const result = await getItems<IJoinRequest>(COLLECTION, 'timeStamp', -1);
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
