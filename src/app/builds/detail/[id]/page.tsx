import Head from 'next/head';
import { getBuilds } from 'src/pages/api/builds.api';
import { BuildDetail } from '../../_components/builds/buildDetail';

export async function generateStaticParams() {
  const builds = await getBuilds();

  const paths = builds.map((build) => ({ id: build._id.toString() }));

  return paths;
}

export default async function BuildDetailPage() {
  const builds = await getBuilds();
  return (
    <>
      <Head>
        <title>USC Build</title>
        <meta name="description" content="USC Build Detail" />
      </Head>
      <BuildDetail init={builds} />
    </>
  );
}
