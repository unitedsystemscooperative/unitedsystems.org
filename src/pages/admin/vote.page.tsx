import { VoteDashboard } from 'components/admin/vote/voteDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_index');
};
