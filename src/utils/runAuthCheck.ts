'use server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getIsHC } from './get-isHC';

export type AuthCheckValue<T = never> =
  | { redirect: true; permanent: boolean; destination: string }
  | { redirect: false; data: T | undefined };

/**
 * For use in getServerSideProps of admin pages.
 * @param context
 * @param redirect key of path to the page to direct after login
 * @returns
 */
export const runAdminAuthCheck = async <T = never>(
  redirectPath: string,
  fetchFn?: () => Promise<T>
): Promise<T | undefined> => {
  const session = await auth();

  if (session) {
    const isHC = await getIsHC();
    if (isHC) {
      if (fetchFn) {
        const result = await fetchFn();
        return result;
      } else {
        return undefined;
      }
    } else redirect('/auth/not-authorized');
  } else redirect(`/auth/signIn?redirect=${redirectPath}`);
};
