import { BuildSystem } from 'components/builds';
import { IBuildInfov2 } from 'models/builds';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { connectToDatabase } from 'utils/mongo';
import { getBuilds } from '../api/builds.api';

const BuildPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>USC Build Archive</title>
        <meta name="description" content="Builds of the USC" />
      </Head>
      <BuildSystem init={data} />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ data: IBuildInfov2[] }> = async () => {
  const { db } = await connectToDatabase();
  const builds = await getBuilds(db);

  return { props: { data: builds } };
};

export default BuildPage;
