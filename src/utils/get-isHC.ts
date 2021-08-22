import { IMember } from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
import { Db } from 'mongodb4';
import { getSession } from 'next-auth/client';

export async function getIsHC(req, db: Db) {
  const session = await getSession({ req });
  let isHC = false;
  if (session) {
    const user = await db
      .collection('cmdrs')
      .findOne<IMember>({ email: session.user.email });
    isHC = user && user.rank.valueOf() <= Rank.Captain.valueOf() ? true : false;
  }
  return isHC;
}
