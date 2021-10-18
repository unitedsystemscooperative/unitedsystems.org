import { AboutSystems } from 'components/about';
import { AboutLayout } from 'components/layouts';
import { System } from 'models/about/system';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { connectToDatabase } from 'utils/mongo';
import { getSystems } from '../api/systems.api';

const FactionPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Faction Information</title>
        <meta name="description" content="USC Faction Information" />
      </Head>
      <AboutLayout>
        <AboutSystems init={data} />
      </AboutLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ data: System[] }> = async () => {
  const { db } = await connectToDatabase();
  const systems = await getSystems(db);

  return { props: { data: systems } };
};

export default FactionPage;
