import { IJoinRequest } from '@/join/_models/joinRequest';
import { auth } from 'auth';
import { getIsHC } from 'utils/auth-check';
import { getItems, insertItem } from 'utils/db';

const COLLECTION = 'joinRequests';

export async function GET() {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    return new Response(null, { status: 403 });
  }

  const result = await getItems<IJoinRequest>(COLLECTION, 'timeStamp', -1);

  return Response.json(result);
}

export async function POST(request: Request) {
  const joinInfo: IJoinRequest = JSON.parse(await request.json());
  joinInfo.timeStamp = new Date(joinInfo.timeStamp ?? new Date());
  await insertItem(COLLECTION, joinInfo);

  return new Response(null, { status: 201 });
}
