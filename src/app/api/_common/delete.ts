import { deleteItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { NextRequest } from 'next/server';

export function generateDelete(collection: string) {
  return async (request: NextRequest) => {
    const isHC = await getIsHC();

    if (!isHC) {
      return new Response(null, { status: 403 });
    }
    const item = request.nextUrl.searchParams.get('id');
    if (!item) {
      return new Response(null, { status: 400, statusText: `Id not provided` });
    }

    await deleteItem(collection, item);

    return new Response(null, { status: 200 });
  };
}
