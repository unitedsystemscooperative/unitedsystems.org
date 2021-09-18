import { CMDRDashboard } from 'components/admin/cmdrs/cmdrDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';

const CmdrManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | CMDR Management</title>
      </Head>
      <PrimaryLayout>
        <CMDRDashboard />
      </PrimaryLayout>
    </>
  );
};

export default CmdrManagementPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return runAdminAuthCheck(context, 'admin_cmdrs');
};
