import { getFCs } from '@/app/api/fc/fc-api-utils';
import { CarriersDashboard } from '@/app/admin/fc/_components/carriersDashboard';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Carrier Management',
};

export default async function FleetCarrierManagementPage() {
  const authResult = await runAdminAuthCheck('admin_fc', getFCs);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <CarriersDashboard init={authResult.data} />
    </>
  );
}
