import { JoinDashboard } from '@/admin/joinRequests/_components/joinDashboard';
import { runAdminAuthCheck } from 'utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Join Request Dashboard',
};

export default async function JoinRequestsPage() {
  await runAdminAuthCheck('admin_joinRequests');
  return (
    <>
      <JoinDashboard />
    </>
  );
}
