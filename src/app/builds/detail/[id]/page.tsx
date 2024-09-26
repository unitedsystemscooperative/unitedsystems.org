import Head from 'next/head';
import { getBuildById, getBuilds } from 'src/app/api/builds/getBuilds';
import { BuildDetail } from '../../_components/builds/buildDetail';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const builds = await getBuilds();

  const paths = builds.map((build) => ({ id: build._id.toString() }));

  return paths;
}

export default async function BuildDetailPage({ params }: { params: { id: string } }) {
  const builds = await getBuildById(params.id);
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
