import { AllyDashboard } from 'components/admin/allies/allyDashboard';
import { IAlly } from 'models/about/ally';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { runAdminAuthCheck } from 'utils/runAuthCheck';
import { getAllies } from '../api/allies.api';

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
