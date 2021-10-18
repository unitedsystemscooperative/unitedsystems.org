import { SystemDashboard } from 'components/admin/systems/systemDashboard';
import { System } from 'models/about/system';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getSystems } from '../api/systems.api';

const SystemQueryPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | System Query ... System</title>
      </Head>
      <SystemDashboard init={data} />
    </>
  );
};

export default SystemQueryPage;

export const getServerSideProps: GetServerSideProps<{ data: System[] }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_index', getSystems);
};
