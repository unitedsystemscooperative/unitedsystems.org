import { ICMDR } from '@/admin/_models';
import { auth } from 'auth';
import { getIsHC } from 'utils/auth-check';
import { deleteItem, insertItem, updateItem } from 'utils/db';
import { NextRequest } from 'next/server';
import { COLLECTION, determineCMDRisMember, getCmdrs } from './cmdrs-api-utils';

export async function GET() {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }

  const result = await getCmdrs();

  return Response.json(result, { status: 200 });
}

export async function POST(request: Request) {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }

  const cmdr: ICMDR = JSON.parse(await request.json());

  if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
  cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
  await insertItem(COLLECTION, cmdr);

  return new Response(null, { status: 200 });
}

export async function PUT(request: Request) {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }

  const cmdr: ICMDR = JSON.parse(await request.json());

  if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
  cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
  const updateResult = await updateItem(COLLECTION, cmdr);

  if (updateResult) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(null, { status: 500, statusText: `Failed to update id: ${cmdr._id}` });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }
  const cmdr = request.nextUrl.searchParams.get('id');
  if (!cmdr) {
    return new Response(null, { status: 400, statusText: `Id not provided` });
  }

  await deleteItem(COLLECTION, cmdr);

  return new Response(null, { status: 200 });
}
