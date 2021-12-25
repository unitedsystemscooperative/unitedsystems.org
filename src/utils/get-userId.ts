import { IMember } from '@@/admin/models';
import { Db } from 'mongodb4';
import { getSession } from 'next-auth/client';

export async function getUserId(req, db: Db): Promise<string> {
  const session = await getSession({ req });
  let id: string;
  if (session) {
    const user = await db.collection('cmdrs').findOne<IMember>({ email: session.user.email });
    if (user) {
      id = user._id.toString();
    }
  }
  return id;
}
