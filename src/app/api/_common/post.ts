import { insertItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { WithId } from 'mongodb';

export function generatePost<T extends { _id: string }>(collection: string) {
  return async (request: Request) => {
    const isHC = await getIsHC();

    if (!isHC) {
      return new Response(null, { status: 403 });
    }
    const item: WithId<T> = JSON.parse(await request.json());

    await insertItem(collection, item);

    return new Response(null, { status: 200 });
  };
}
