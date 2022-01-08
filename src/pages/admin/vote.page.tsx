import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { VoteDashboard } from '~/admin/components/vote/voteDashboard';
import { ICMDRs } from '~/admin/models/cmdr';

const VoteAssistPage = () => {
  return (
    <>
      <Head>
        <title>USC | Vote Assistant</title>
      </Head>
      <VoteDashboard />
    </>
  );
};

export default VoteAssistPage;

export const getServerSideProps: GetServerSideProps<{ data: ICMDRs }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_index');
};
