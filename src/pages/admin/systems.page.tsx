import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const SystemManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | System Management</title>
      </Head>
      <SystemDashboard />
    </>
  );
};

export default SystemManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_systems');
};
