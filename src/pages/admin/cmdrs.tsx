import { CMDRDashboard } from 'components/admin/cmdrs/cmdrDashboard';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

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
        destination: '/auth/signIn?redirect=admin_cmdrs',
      },
    };
  }
};
