import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/client';
import { getIsHC } from './get-isHC';
import { connectToDatabase } from './mongo';

/**
 * For use in getServerSideProps of admin pages.
 * @param context
 * @param redirect key of path to the page to direct after login
 * @returns
 */
export const runAdminAuthCheck = async (
  context: GetServerSidePropsContext,
  redirect: string
): Promise<GetServerSidePropsResult<Record<string, never>>> => {
  const session = await getSession(context);

  if (session) {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(context.req, db);
    if (isHC) return { props: {} };
    else
      return {
        redirect: { permanent: false, destination: '/auth/not-authorized' },
      };
  } else
    return {
      redirect: {
        permanent: false,
        destination: `/auth/signIn?redirect=${redirect}`,
      },
    };
};
