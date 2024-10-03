import { runAdminAuthCheck } from 'utils/auth-check';
import { CMDRDashboard } from '@/admin/cmdrs/_components/cmdrDashboard';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';
import { getCmdrs } from '@/api/cmdrs/cmdrs-api-utils';

export const metadata: Metadata = {
  title: 'USC | CMDR Management',
};

export default async function CmdrManagementPage() {
  const data = await runAdminAuthCheck('admin_cmdrs', getCmdrs);
  return (
    <>
      <CMDRDashboard init={data} />
    </>
  );
}
