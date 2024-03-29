import { getAllies } from '#/allies.api';
import { runAdminAuthCheck } from '@/utils/runAuthCheck';
import { IAlly } from '@@/about/models/ally';
import { AllyDashboard } from '@@/admin/components/allies/allyDashboard';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const AlliesManagementPage = ({ data }: { data: IAlly[] }) => {
  return (
    <>
      <Head>
        <title>USC | Allies Management</title>
      </Head>
      <AllyDashboard init={data} />
    </>
  );
};

export default AlliesManagementPage;

export const getServerSideProps: GetServerSideProps<{ data: IAlly[] }> = async (context) => {
  return runAdminAuthCheck(context, 'admin_allies', getAllies);
};
