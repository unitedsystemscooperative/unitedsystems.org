import { VoteDashboard } from 'components/admin/vote/voteDashboard';
import { ICMDRs } from 'models/admin/cmdr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getCmdrs } from '../api/cmdrs.api';

const VoteAssistPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | Vote Assistant</title>
      </Head>
      <VoteDashboard init={data} />
    </>
  );
};

export default VoteAssistPage;

export const getServerSideProps: GetServerSideProps<{ data: ICMDRs }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_index', getCmdrs);
};
