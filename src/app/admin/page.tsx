import { AdminDashboard } from '@/app/admin/_components/adminDashboard';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Administration',
  description: 'USC Administration Tools',
};

export default async function AdminPage() {
  const authResult = await runAdminAuthCheck('admin_index');
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <AdminDashboard />
    </>
  );
}
