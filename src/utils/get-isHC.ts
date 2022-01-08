import { IMember, Rank } from '~/admin/models';
import { Db } from 'mongodb';
import { getSession } from 'next-auth/react';

export async function getIsHC(req, db: Db) {
  // allow bypass of admin if these 3 env variables are set properly.
  if (process.env.NODE_ENV === 'development' && process.env.MONGODB_URI.includes('localhost:27017') && process.env.BYPASS_AUTH === 'true') {
    return true;
  }

  const session = await getSession({ req });
  let isHC = false;
  if (session) {
    const user = await db.collection('cmdrs').findOne<IMember>({ email: session.user.email });
    isHC = user && user.rank.valueOf() <= Rank.Captain.valueOf() ? true : false;
  }
  return isHC;
}
