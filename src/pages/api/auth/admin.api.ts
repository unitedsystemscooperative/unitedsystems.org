import { getIsHC } from '@/utils/get-isHC';
import { connectToDatabase } from '@/utils/mongo';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);
    res.status(200).send(isHC);
  } catch (e) {
    res.statusMessage = e.message;
    res.status(500).end();
  }
};
