import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const SystemQueryPage = () => {
  return (
    <>
      <Head>
        <title>USC | System Query ... System</title>
      </Head>
      <SystemDashboard />
    </>
  );
};

export default SystemQueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_index');
};
