import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { CMDRDashboard } from '~/admin/components/cmdrs/cmdrDashboard';

const CmdrManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | CMDR Management</title>
      </Head>
      <CMDRDashboard />
    </>
  );
};

export default CmdrManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_cmdrs');
};
