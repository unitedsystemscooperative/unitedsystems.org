import { auth } from '@/auth';
import { getIsHC } from '@/utils/auth-check';
import { insertItem } from '@/utils/db';
import { WithId } from 'mongodb';

export function generatePost<T extends { _id: string }>(collection: string) {
  return async (request: Request) => {
    const session = await auth();
    const isHC = await getIsHC(session);

    if (!isHC) {
      return new Response(null, { status: 403 });
    }
    const item: WithId<T> = JSON.parse(await request.json());

    await insertItem(collection, item);

    return new Response(null, { status: 200 });
  };
}
