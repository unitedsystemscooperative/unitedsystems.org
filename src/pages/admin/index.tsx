import { AdminDashboard } from 'components/admin/adminDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { getToken } from 'utils/get-token';

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>USC Administration</title>
        <meta name="description" content="USC Administration Tools" />
      </Head>
      <PrimaryLayout>
        <AdminDashboard />
      </PrimaryLayout>
    </>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const token = await getToken(context.req);
    if (token.role === 'high command') {
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/not-authorized',
        },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signIn?redirect=admin_index',
      },
    };
  }
};
