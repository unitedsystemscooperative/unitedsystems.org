import { AboutAllies } from 'components/about';
import { AboutLayout } from 'components/layouts';
import { IAlly } from 'models/about/ally';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { connectToDatabase } from 'utils/mongo';
import { getAllies } from '../api/allies';

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
