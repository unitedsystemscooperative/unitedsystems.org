import { connectToDatabase } from '@/lib/db';
import { IMember } from '@/admin/_models';
import { getSession } from 'next-auth/react';

export async function getUserId(req): Promise<string> {
  const db = await connectToDatabase();
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
