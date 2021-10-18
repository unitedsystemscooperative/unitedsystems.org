import { BuildDashboard } from 'components/admin/builds/buildDashboard';
import { IBuildInfov2 } from 'models/builds';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getBuilds } from '../api/builds.api';

const BuildManagementPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | Build Management</title>
      </Head>
      <BuildDashboard init={data} />
    </>
  );
};

export default BuildManagementPage;

export const getServerSideProps: GetServerSideProps<{ data: IBuildInfov2[] }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_build', getBuilds);
};
