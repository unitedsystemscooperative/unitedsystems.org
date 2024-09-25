import { getFCs } from '#/fc.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { IFleetCarrier } from '@/app/about/_models/fleetCarrier';
import { CarriersDashboard } from '@@/admin/components/carriers/carriersDashboard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
