import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { CMDRDashboard } from '@/app/admin/cmdrs/_components/cmdrDashboard';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';
import { getCmdrs } from '@/app/api/cmdrs/cmdrs-api-utils';

export const metadata: Metadata = {
  title: 'USC | CMDR Management',
};

export default async function CmdrManagementPage() {
  const authResult = await runAdminAuthCheck('admin_cmdrs', getCmdrs);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <CMDRDashboard init={authResult.data} />
    </>
  );
}
