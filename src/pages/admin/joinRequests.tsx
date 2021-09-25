import { JoinDashboard } from 'components/admin/join/joinDashboard';
import { PrimaryLayout } from 'components/layouts/primary';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const JoinRequestsPage = () => {
  return (
    <>
      <Head>
        <title>USC Join List</title>
        <meta name="description" content="USC Join List" />
      </Head>
      <PrimaryLayout>
        <JoinDashboard />
      </PrimaryLayout>
    </>
  );
};

export default JoinRequestsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_joinList');
};
