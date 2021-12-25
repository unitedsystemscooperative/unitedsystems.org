import { getCmdrs } from '#/cmdrs.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { VoteDashboard } from '~/admin/components/vote/voteDashboard';
import { ICMDRs } from '~/admin/models/cmdr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
