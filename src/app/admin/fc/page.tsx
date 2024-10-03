import { CarriersDashboard } from '@/admin/fc/_components/carriersDashboard';
import { getFCs } from '@/api/fc/fc-api-utils';
import { runAdminAuthCheck } from 'utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Carrier Management',
};

export default async function FleetCarrierManagementPage() {
  const data = await runAdminAuthCheck('admin_fc', getFCs);
  return (
    <>
      <CarriersDashboard init={data} />
    </>
  );
}
