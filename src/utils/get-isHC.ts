import { IUser } from 'models/auth/user';
import { Db } from 'mongodb';
import { getSession } from 'next-auth/client';

export async function getIsHC(req, db: Db) {
  const session = await getSession({ req });
  let isHC = false;
  if (session) {
    const user = await db
      .collection('members')
      .findOne<IUser>({ email: session.user.email });
    isHC = user && user.role === 'high command' ? true : false;
  }
  return isHC;
}
