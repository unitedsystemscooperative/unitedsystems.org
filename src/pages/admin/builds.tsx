import { BuildDashboard } from 'components/admin/builds/buildDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const BuildManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Build Management</title>
      </Head>
      <PrimaryLayout>
        <BuildDashboard />
      </PrimaryLayout>
    </>
  );
};

export default BuildManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_build');
};
