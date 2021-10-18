import { CarriersDashboard } from 'components/admin/carriers/carriersDashboard';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getFCs } from '../api/fc.api';

const FleetCarrierManagementPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | Fleet Carrier Management</title>
      </Head>
      <CarriersDashboard init={data} />
    </>
  );
};

export default FleetCarrierManagementPage;

export const getServerSideProps: GetServerSideProps<{ data: IFleetCarrier[] }> = async (
  context
) => {
  return runAdminAuthCheck(context, 'admin_fc', getFCs);
};
