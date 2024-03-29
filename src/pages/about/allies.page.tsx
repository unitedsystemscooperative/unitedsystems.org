import { getAllies } from '#/allies.api';
import { connectToDatabase } from '@/utils/mongo';
import { AboutAllies } from '@@/about/components';
import { AboutLayout } from '@@/about/layouts/about';
import { IAlly } from '@@/about/models/ally';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

const AlliesPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Allies</title>
        <meta name="description" content="USC Ally List" />
      </Head>
      <AboutLayout>
        <AboutAllies init={data} />
      </AboutLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ data: IAlly[] }> = async () => {
  const { db } = await connectToDatabase();
  const allies = await getAllies(db);

  return { props: { data: allies } };
};

export default AlliesPage;
