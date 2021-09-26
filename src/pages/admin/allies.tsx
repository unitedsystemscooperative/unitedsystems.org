import { AllyDashboard } from 'components/admin/allies/allyDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const AlliesManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Allies Management</title>
      </Head>
      <AllyDashboard />
    </>
  );
};

export default AlliesManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_allies');
};
