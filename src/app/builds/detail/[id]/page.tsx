import Head from 'next/head';
import { getBuildById, getBuilds } from 'src/app/api/builds/getBuilds';
import { BuildDetail } from '../../_components/builds/buildDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Build',
  description: 'USC Build Detail',
};

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
      <BuildDetail init={builds} />
    </>
  );
}
