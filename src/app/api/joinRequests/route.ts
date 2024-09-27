import { IJoinRequest } from '@/app/join/_models/joinRequest';
import { getItems, insertItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';

const COLLECTION = 'joinRequests';

export async function GET() {
  const isHC = await getIsHC();

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
