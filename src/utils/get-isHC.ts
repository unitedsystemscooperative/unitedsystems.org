import { IMember, Rank } from '~/admin/models';
import { Db } from 'mongodb';
import { getSession } from 'next-auth/react';

export async function getIsHC(req, db: Db) {
  const session = await getSession({ req });
  let isHC = false;
  if (session) {
    const user = await db.collection('cmdrs').findOne<IMember>({ email: session.user.email });
    isHC = user && user.rank.valueOf() <= Rank.Captain.valueOf() ? true : false;
  }
  return isHC;
}
