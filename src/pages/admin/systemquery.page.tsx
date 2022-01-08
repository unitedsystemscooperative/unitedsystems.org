import { getSystems } from '#/systems.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { System } from '~/about/models/system';
import { SystemDashboard } from '~/admin/components/systems/systemDashboard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
