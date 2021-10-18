import { CMDRDashboard } from 'components/admin/cmdrs/cmdrDashboard';
import { ICMDRs } from 'models/admin/cmdr';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getCmdrs } from '../api/cmdrs.api';

const CmdrManagementPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>USC | CMDR Management</title>
      </Head>
      <CMDRDashboard init={data} />
    </>
  );
};

export default CmdrManagementPage;

export const getServerSideProps: GetServerSideProps<{ data: ICMDRs }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_cmdrs', getCmdrs);
};
