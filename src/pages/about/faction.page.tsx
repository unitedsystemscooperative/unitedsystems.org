import { getSystems } from '#/systems.api';
import { AboutSystems } from '@@/about/components';
import { AboutLayout } from '@@/about/layouts/about';
import { System } from '@@/about/models/system';
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
  const systems = await getSystems();

  return { props: { data: systems } };
};

export default FactionPage;
