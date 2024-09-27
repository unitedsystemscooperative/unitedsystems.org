import { updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { WithId } from 'mongodb';

export function generatePut<T extends { _id: string }>(collection: string) {
  return async (request: Request) => {
    const isHC = await getIsHC();

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
