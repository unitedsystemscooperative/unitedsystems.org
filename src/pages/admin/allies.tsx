import { AllyDashboard } from 'components/admin/allies/allyDashboard';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const SystemManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Allies Management</title>
      </Head>
      <PrimaryLayout>
        <AllyDashboard />
      </PrimaryLayout>
    </>
  );
};

export default SystemManagementPage;
