import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const SystemManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | System Management</title>
      </Head>
      <PrimaryLayout>
        <SystemDashboard />
      </PrimaryLayout>
    </>
  );
};

export default SystemManagementPage;
