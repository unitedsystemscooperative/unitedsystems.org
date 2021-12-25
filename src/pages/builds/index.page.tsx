import { getBuilds } from '#/builds.api';
import { connectToDatabase } from '@/utils/mongo';
import { BuildSystem } from '@@/builds/components';
import { IBuildInfov2 } from '@@/builds/models';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

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
