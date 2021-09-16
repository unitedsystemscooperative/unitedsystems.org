import axios from 'axios';
import { ExpansionComponent } from 'components/admin/expansion/expansion';
import { PrimaryLayout } from 'components/layouts';
import { IEDDBFaction } from 'models/eddb/faction';
import { IEDDBPopulatedSystem } from 'models/eddb/populatedSystem';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

const ExpansionPage = ({
  systems,
  factions,
}: {
  systems: IEDDBPopulatedSystem[];
  factions: IEDDBFaction[];
}) => {
  return (
    <>
      <Head>
        <title>USC | Expansion Calculator</title>
      </Head>
      <PrimaryLayout>
        <ExpansionComponent systems={systems} factions={factions} />
      </PrimaryLayout>
    </>
  );
};

export default ExpansionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(context.req, db);
    if (isHC) {
      const systems = (
        await axios.get<IEDDBPopulatedSystem[]>(
          'https://eddb.io/archive/v6/systems_populated.json'
        )
      ).data;
      const factions = (
        await axios.get<IEDDBFaction[]>(
          'https://eddb.io/archive/v6/factions.json'
        )
      ).data;
      return { props: { systems, factions } };
    } else {
      return {
        redirect: { permanent: false, destination: '/auth/not-authorized' },
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signIn?redirect=admin',
      },
    };
  }
};
