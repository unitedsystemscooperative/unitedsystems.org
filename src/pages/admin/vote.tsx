import { VoteDashboard } from 'components/admin/vote/voteDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

const VoteAssistPage = () => {
  return (
    <>
      <Head>
        <title>USC | Vote Assistant</title>
      </Head>
      <PrimaryLayout>
        <VoteDashboard />
      </PrimaryLayout>
    </>
  );
};

export default VoteAssistPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(context.req, db);
    if (isHC) {
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
        destination: '/auth/signIn?redirect=admin',
      },
    };
  }
};
