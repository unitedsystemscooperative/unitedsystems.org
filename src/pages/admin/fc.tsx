import { CarriersDashboard } from 'components/admin/carriers/carriersDashboard';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const SystemManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Fleet Carrier Management</title>
      </Head>
      <PrimaryLayout>
        <CarriersDashboard />
      </PrimaryLayout>
    </>
  );
};

export default SystemManagementPage;
