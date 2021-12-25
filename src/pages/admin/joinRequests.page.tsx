import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { JoinDashboard } from '@@/admin/components/join/joinDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const JoinRequestsPage = () => {
  return (
    <>
      <Head>
        <title>USC Join List</title>
        <meta name="description" content="USC Join List" />
      </Head>
      <JoinDashboard />
    </>
  );
};

export default JoinRequestsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_joinRequests');
};
