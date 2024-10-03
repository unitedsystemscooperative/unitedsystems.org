import { getFCs } from '#/fc/fc-api-utils';
import { genericSortArray } from 'functions/sort';
import { Container, Typography } from '@mui/material';
import { Metadata } from 'next';
import { PersonalCarriers } from './_components/carriersPersonal';
import { USCCarriers } from './_components/carriersUSC';

export const metadata: Metadata = {
  title: 'United Systems Cooperative Fleet Carriers',
  description: 'USC Fleet Carrier List',
};

async function getFleetCarriers() {
  const fleetCarriers = await getFCs();

  const personalCarriers = genericSortArray(
    fleetCarriers.filter((x) => !x.purpose),
    { orderBy: 'name', order: 'asc' }
  );
  const squadCarriers = genericSortArray(
    fleetCarriers.filter((x) => x.purpose),
    { orderBy: 'name', order: 'asc' }
  );

  return { personalCarriers, squadCarriers };
}

export default async function FleetCarriersPage() {
  const { personalCarriers, squadCarriers } = await getFleetCarriers();
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4">USC Fleet Carriers - {squadCarriers.length}</Typography>
      <USCCarriers carriers={squadCarriers} />
      <Typography variant="h4">
        Personal Fleet Carriers of USC - {personalCarriers.length}
      </Typography>
      <PersonalCarriers carriers={personalCarriers} />
    </Container>
  );
}
