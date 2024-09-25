import { getBuilds } from '#/builds.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { BuildDashboard } from '@@/admin/components/builds/buildDashboard';
import { IBuildInfov2 } from '@/app/builds/_models';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
