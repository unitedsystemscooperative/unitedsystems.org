import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { AdminDashboard } from '@@/admin/components/adminDashboard';
import Head from 'next/head';
import { redirect, RedirectType } from 'next/navigation';

export default async function AdminPage() {
  const authResult = await runAdminAuthCheck('admin_index');
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <Head>
        <title>USC Administration</title>
        <meta name="description" content="USC Administration Tools" />
      </Head>
      <AdminDashboard />
    </>
  );
}
