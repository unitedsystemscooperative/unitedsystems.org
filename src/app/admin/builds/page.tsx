import { BuildDashboard } from '@/app/admin/builds/_components/buildDashboard';
import { getBuilds } from '@/app/api/builds/getBuilds';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
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
