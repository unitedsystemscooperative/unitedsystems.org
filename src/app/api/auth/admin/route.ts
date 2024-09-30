import { auth } from '@/auth';
import { getIsHC } from '@/utils/auth-check';

export async function GET() {
  try {
    const session = await auth();
    const isHC = await getIsHC(session);
    return Response.json(isHC, { status: 200 });
  } catch (e) {
    return new Response(null, { status: 500, statusText: e.message });
  }
}
