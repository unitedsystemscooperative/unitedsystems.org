import { AllyDashboard } from '@/app/admin/allies/_components/allyDashboard';
import { getAllies } from '@/app/api/allies/allies-api-utils';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Allies Management',
};

export default async function AlliesManagementPage() {
  const data = await runAdminAuthCheck('admin_allies', getAllies);
  return (
    <>
      <AllyDashboard init={data} />
    </>
  );
}
