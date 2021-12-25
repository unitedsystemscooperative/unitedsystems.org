import { connectToDatabase } from '@/utils/mongo';
import { BuildDetail } from '@@/builds/components/builds/buildDetail';
import { IBuildInfov2 } from '@@/builds/models';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getBuilds } from 'src/pages/api/builds.api';

const BuildDetailPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>USC Build</title>
        <meta name="description" content="USC Build Detail" />
      </Head>
      <BuildDetail init={data} />
    </>
  );
};

export const getStaticProps: GetStaticProps<{ data: IBuildInfov2[] }> = async () => {
  const { db } = await connectToDatabase();
  const builds = await getBuilds(db);

  return { props: { data: builds } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { db } = await connectToDatabase();
  const builds = await getBuilds(db);

  const paths = builds.map((build) => ({ params: { id: build._id.toString() } }));
  return { paths, fallback: 'blocking' };
};

export default BuildDetailPage;
