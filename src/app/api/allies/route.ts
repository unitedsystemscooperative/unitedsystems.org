import { IAlly } from '@/app/about/_models/ally';
import { deleteItem, insertItem, updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { NextRequest } from 'next/server';
import { getAllies } from './getAllies';

const COLLECTION = 'allies';

export async function GET() {
  const result = await getAllies();

  return Response.json(result, { status: 200 });
}

export async function POST(request: Request) {
  const isHC = await getIsHC(request);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }
  const ally: IAlly = JSON.parse(await request.json());

  await insertItem(COLLECTION, ally);

  return new Response(null, { status: 200 });
}
export async function PUT(request: Request) {
  const isHC = await getIsHC(request);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }
  const ally: IAlly = JSON.parse(await request.json());

  const updateResult = await updateItem(COLLECTION, ally);

  if (updateResult) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(null, { status: 500, statusText: `Failed to update id: ${ally._id}` });
  }
}

export async function DELETE(request: NextRequest) {
  const isHC = await getIsHC(request);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }
  const ally = request.nextUrl.searchParams.get('id');
  if (!ally) {
    return new Response(null, { status: 400, statusText: `Id not provided` });
  }

  await deleteItem(COLLECTION, ally);

  return new Response(null, { status: 200 });
}
