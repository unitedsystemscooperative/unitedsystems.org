import { auth } from '@/auth';
import { redirects } from '@/data/redirects';
import { redirect } from 'next/navigation';
import { SignInForm } from './signIn-form';

async function redirectIfLoggedIn(redirectKey: string) {
  const session = await auth();
  if (session) {
    const redirectPath = redirects.find((x) => x.key === redirectKey)?.path;
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      redirect('/');
    }
  }
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const redirectLocation = searchParams['redirect'] as string;
  await redirectIfLoggedIn(redirectLocation);

  return <SignInForm />;
}