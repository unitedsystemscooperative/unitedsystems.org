import { AdminDashboard } from 'components/admin/adminDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>USC Administration</title>
        <meta name="description" content="USC Administration Tools" />
      </Head>
      <AdminDashboard />
    </>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_index');
};
