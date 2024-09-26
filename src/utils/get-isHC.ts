import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/db';
import { IMember, Rank } from '@@/admin/models';

export async function getIsHC() {
  const db = await connectToDatabase();
  const session = await auth();
  let isHC = false;
  if (session && session.user) {
    const user = await db.collection('cmdrs').findOne<IMember>({ email: session.user.email });
    isHC = user && user.rank.valueOf() <= Rank.Captain.valueOf() ? true : false;
  }
  return isHC;
}
