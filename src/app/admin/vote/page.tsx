import { VoteDashboard } from '@/app/admin/vote/_components/voteDashboard';
import { getCmdrs } from '@/app/api/cmdrs/cmdrs-api-utils';
import { runAdminAuthCheck } from '@/utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Vote Assistant',
};

export default async function VoteAssistPage() {
  const data = await runAdminAuthCheck('admin_index', getCmdrs);
  return (
    <>
      <VoteDashboard init={data} />
    </>
  );
}
