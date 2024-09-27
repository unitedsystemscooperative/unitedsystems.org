import { getCmdrs } from '@/app/api/cmdrs/cmdrs-api-utils';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { VoteDashboard } from '@/app/admin/vote/_components/voteDashboard';
import { Metadata } from 'next';
import { redirect, RedirectType } from 'next/navigation';

export const metadata: Metadata = {
  title: 'USC | Vote Assistant',
};

export default async function VoteAssistPage() {
  const authResult = await runAdminAuthCheck('admin_index', getCmdrs);
  if (authResult.redirect) {
    redirect(authResult.destination, RedirectType.replace);
  }
  return (
    <>
      <VoteDashboard init={authResult.data} />
    </>
  );
}
