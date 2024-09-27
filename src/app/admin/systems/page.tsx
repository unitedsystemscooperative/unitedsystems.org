import { getSystems } from '@/app/api/systems/route';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { SystemDashboard } from '@/app/admin/systems/_components/systemDashboard';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | System Management',
};

export default async function SystemManagementPage() {
  const authResult = await runAdminAuthCheck('admin_systems', getSystems);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <SystemDashboard init={authResult.data} />
    </>
  );
}
