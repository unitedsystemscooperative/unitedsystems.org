import { EDSpinner } from '@admiralfeb/react-components';
import { Container, Typography } from '@mui/material';
import {
  useFleetCarriers,
  usePersonalCarriers,
  useSquadCarriers,
} from 'hooks/about/useFleetCarriers';
import { PersonalCarriers } from './carriersPersonal';
import { USCCarriers } from './carriersUSC';

/** Displays Fleet Carrier Information */
export const Carriers = () => {
  const { fleetCarriers, isLoading } = useFleetCarriers();
  const personalCarriers = usePersonalCarriers(fleetCarriers);
  const squadCarriers = useSquadCarriers(fleetCarriers);

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <EDSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4">
        USC Fleet Carriers - {squadCarriers.length}
      </Typography>
      <USCCarriers carriers={squadCarriers} />
      <Typography variant="h4">
        Personal Fleet Carriers of USC - {personalCarriers.length}
      </Typography>
      <PersonalCarriers carriers={personalCarriers} />
    </Container>
  );
};
