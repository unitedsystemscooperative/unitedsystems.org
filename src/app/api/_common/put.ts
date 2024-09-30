import { auth } from '@/auth';
import { getIsHC } from '@/utils/auth-check';
import { updateItem } from '@/utils/db';
import { WithId } from 'mongodb';

export function generatePut<T extends { _id: string }>(collection: string) {
  return async (request: Request) => {
    const session = await auth();
    const isHC = await getIsHC(session);

    if (!isHC) {
      return new Response(null, { status: 403 });
    }
    const item: WithId<T> = JSON.parse(await request.json());

    const updateResult = await updateItem(collection, item);

    if (updateResult) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 500, statusText: `Failed to update id: ${item._id}` });
    }
  };
}
