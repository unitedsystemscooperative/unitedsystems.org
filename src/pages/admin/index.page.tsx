import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { AdminDashboard } from '@@/admin/components/adminDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

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
