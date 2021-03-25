import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { getToken } from 'utils/get-token';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const token = await getToken(req);
      if (token.role === 'high command') {
        res.status(200).send(true);
      } else {
        res.statusMessage = 'You are not an admin member';
        res.status(401).end();
      }
    } else {
      res.statusMessage = 'You are not signed in.';
      res.status(401).end();
    }
  } catch (e) {
    res.statusMessage = e.message;
    res.status(500).end();
  }
};
