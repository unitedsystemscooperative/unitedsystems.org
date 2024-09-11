import { getIsHC } from '@/utils/get-isHC';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);
    res.status(200).send(isHC);
  } catch (e) {
    res.statusMessage = e.message;
    res.status(500).end();
  }
};
