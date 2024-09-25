import { getIsHC } from '@/utils/get-isHC';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  try {
    const isHC = await getIsHC(req);
    return Response.json(isHC, { status: 200 });
  } catch (e) {
    return new Response(null, { status: 500, statusText: e.message });
  }
}
