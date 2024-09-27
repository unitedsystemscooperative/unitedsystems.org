import { AllyDashboard } from '@/app/admin/allies/_components/allyDashboard';
import { getAllies } from '@/app/api/allies/allies-api-utils';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Allies Management',
};

export default async function AlliesManagementPage() {
  const authResult = await runAdminAuthCheck('admin_allies', getAllies);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <AllyDashboard init={authResult.data} />
    </>
  );
}
