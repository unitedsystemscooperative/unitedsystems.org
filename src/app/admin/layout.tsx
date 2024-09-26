import { auth } from '@/auth';
import { ReactNode } from 'react';
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return <>{children}</>;
}
