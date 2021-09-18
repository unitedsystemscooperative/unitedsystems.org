import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const SystemQueryPage = () => {
  return (
    <>
      <Head>
        <title>USC | System Query ... System</title>
      </Head>
      <PrimaryLayout>
        <SystemDashboard />
      </PrimaryLayout>
    </>
  );
};

export default SystemQueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_index');
};
