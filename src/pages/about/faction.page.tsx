import { getSystems } from '#/systems.api';
import { connectToDatabase } from '@/utils/mongo';
import { AboutSystems } from '~/about/components';
import { AboutLayout } from '~/about/layouts/about';
import { System } from '~/about/models/system';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

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
