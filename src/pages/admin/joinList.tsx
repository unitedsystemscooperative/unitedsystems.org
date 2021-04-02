import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from 'utils/mongo';
import { getIsHC } from 'utils/get-isHC';
import { JoinDashboard } from 'components/admin/join/joinDashboard';

export const JoinList = () => {
  return (
    <>
      <Head>
        <title>USC Join List</title>
        <meta name="description" content="USC Join List" />
      </Head>
      <PrimaryLayout>
        <JoinDashboard />
      </PrimaryLayout>
    </>
  );
};

export default JoinList;

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
        destination: '/auth/signIn?redirect=admin_joinList',
      },
    };
  }
};
