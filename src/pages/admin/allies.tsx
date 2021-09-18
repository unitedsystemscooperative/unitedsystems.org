import { AllyDashboard } from 'components/admin/allies/allyDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const AlliesManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Allies Management</title>
      </Head>
      <PrimaryLayout>
        <AllyDashboard />
      </PrimaryLayout>
    </>
  );
};

export default AlliesManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_allies');
};
