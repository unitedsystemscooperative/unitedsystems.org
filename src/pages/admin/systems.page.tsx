import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { System } from 'models/about/system';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getSystems } from '../api/systems.api';

const SystemManagementPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | System Management</title>
      </Head>
      <SystemDashboard init={data} />
    </>
  );
};

export default SystemManagementPage;

export const getServerSideProps: GetServerSideProps<{ data: System[] }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_systems', getSystems);
};
