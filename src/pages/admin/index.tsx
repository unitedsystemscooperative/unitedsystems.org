import { Button, Typography } from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import { getToken } from 'utils/get-token';

const AdminPage = () => {
  return (
    <PrimaryLayout>
      <Typography>USC Administration</Typography>
      <Link href="/admin/joinList" passHref>
        <Button variant="contained" color="primary">
          Join List
        </Button>
      </Link>
    </PrimaryLayout>
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
