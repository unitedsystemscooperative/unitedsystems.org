import { useFleetCarriers } from '@@/about/hooks/useFleetCarriers';
import { IFleetCarrier } from '@@/about/models/fleetCarrier';
import { Container, Typography } from '@mui/material';
import { PersonalCarriers } from './carriersPersonal';
import { USCCarriers } from './carriersUSC';
import { EDSpinner } from '@/components/_common/spinner';

/** Displays Fleet Carrier Information */
export const Carriers = ({ init }: { init?: IFleetCarrier[] }) => {
  const { personalCarriers, squadCarriers, isLoading } = useFleetCarriers(init);

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <EDSpinner />
      </Container>
    );
  }

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
};
