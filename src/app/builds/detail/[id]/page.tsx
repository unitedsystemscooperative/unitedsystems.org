import { getBuildById, getBuilds } from '#/builds/getBuilds';
import { Metadata } from 'next';
import { BuildDetail } from '../../_components/builds/buildDetail';

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
