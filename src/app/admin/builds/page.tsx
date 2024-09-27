import { BuildDashboard } from '@/app/admin/builds/_components/buildDashboard';
import { getBuilds } from '@/app/api/builds/getBuilds';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Build Management',
};

export default async function BuildManagementPage() {
  const authResult = await runAdminAuthCheck('admin_build', getBuilds);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <BuildDashboard init={authResult.data} />
    </>
  );
}
