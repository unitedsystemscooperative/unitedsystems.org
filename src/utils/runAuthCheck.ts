import { Db } from 'mongodb';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';
import { getIsHC } from './get-isHC';
import { connectToDatabase } from './mongo';

/**
 * For use in getServerSideProps of admin pages.
 * @param context
 * @param redirect key of path to the page to direct after login
 * @returns
 */
export const runAdminAuthCheck = async <T = never>(
  context: GetServerSidePropsContext,
  redirect: string,
  fetchFn?: (db: Db) => Promise<T>
): Promise<GetServerSidePropsResult<{ data: T }>> => {
  const session = await getSession(context);

  if (session) {
    const db = await connectToDatabase();
    const isHC = await getIsHC(context.req, db);
    if (isHC) {
      if (fetchFn) {
        const result = await fetchFn(db);
        return { props: { data: result } };
      } else {
        return { props: { data: null } };
      }
    } else
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
