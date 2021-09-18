import { CarriersDashboard } from 'components/admin/carriers/carriersDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

const FleetCarrierManagementPage = () => {
  return (
    <>
      <Head>
        <title>USC | Fleet Carrier Management</title>
      </Head>
      <PrimaryLayout>
        <CarriersDashboard />
      </PrimaryLayout>
    </>
  );
};

export default FleetCarrierManagementPage;

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
        destination: '/auth/signIn?redirect=admin_fc',
      },
    };
  }
};
