import { getCmdrs } from '#/cmdrs.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { CMDRDashboard } from '@@/admin/components/cmdrs/cmdrDashboard';
import { ICMDRs } from '@@/admin/models';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

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
