import { CarriersDashboard } from 'components/admin/carriers/carriersDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const FleetCarrierManagementPage = () => {
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

export default FleetCarrierManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_fc');
};
