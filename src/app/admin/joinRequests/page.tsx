import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { JoinDashboard } from '@/app/admin/joinRequests/_components/joinDashboard';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Join Request Dashboard',
};

export default async function JoinRequestsPage() {
  const authResult = await runAdminAuthCheck('admin_joinRequests');
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <JoinDashboard />
    </>
  );
}
