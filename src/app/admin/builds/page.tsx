import { BuildDashboard } from '@/admin/builds/_components/buildDashboard';
import { getBuilds } from '@/api/builds/getBuilds';
import { runAdminAuthCheck } from 'utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Build Management',
};

export default async function BuildManagementPage() {
  const data = await runAdminAuthCheck('admin_build', getBuilds);
  return (
    <>
      <BuildDashboard init={data} />
    </>
  );
}
