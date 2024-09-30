import { SystemDashboard } from '@/app/admin/systems/_components/systemDashboard';
import { getSystems } from '@/app/api/systems/systems-api-utils';
import { runAdminAuthCheck } from '@/utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | System Management',
};

export default async function SystemManagementPage() {
  const data = await runAdminAuthCheck('admin_systems', getSystems);
  return (
    <>
      <SystemDashboard init={data} />
    </>
  );
}
