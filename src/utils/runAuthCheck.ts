import { auth } from '@/auth';
import { getIsHC } from './get-isHC';

export type AuthCheckValue<T = never> =
  | { redirect: true; permanent: boolean; destination: string }
  | { redirect: false; data: T | null };

/**
 * For use in getServerSideProps of admin pages.
 * @param context
 * @param redirect key of path to the page to direct after login
 * @returns
 */
export const runAdminAuthCheck = async <T = never>(
  redirect: string,
  fetchFn?: () => Promise<T>
): Promise<AuthCheckValue<T>> => {
  const session = await auth();

  if (session) {
    const isHC = await getIsHC();
    if (isHC) {
      if (fetchFn) {
        const result = await fetchFn();
        return { redirect: false, data: result };
      } else {
        return { redirect: false, data: null };
      }
    } else
      return {
        redirect: true,
        permanent: false,
        destination: '/auth/not-authorized',
      };
  } else
    return {
      redirect: true,
      permanent: false,
      destination: `/auth/signIn?redirect=${redirect}`,
    };
};
