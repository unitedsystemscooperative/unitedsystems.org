import { Carriers } from 'components/about';
import { AboutLayout } from 'components/layouts';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { connectToDatabase } from 'utils/mongo';
import { getFCs } from '../api/fc.api';

const FleetCarriersPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Fleet Carriers</title>
        <meta name="description" content="USC Fleet Carrier List" />
      </Head>
      <AboutLayout>
        <Carriers init={data} />
      </AboutLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ data: IFleetCarrier[] }> = async () => {
  const { db } = await connectToDatabase();
  const fcs = await getFCs(db);

  return { props: { data: fcs } };
};

export default FleetCarriersPage;
