import { Typography, Fade, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { EDSpinner } from '@admiralfeb/react-components';
import {
  useFleetCarriers,
  usePersonalCarriers,
  useSquadCarriers,
} from 'hooks/about/useFleetCarriers';
import { PersonalCarriers } from './carriersPersonal';
import { USCCarriers } from './carriersUSC';

const useStyles = makeStyles({
  table: {
    textAlign: 'center',
  },
});

/** Displays Fleet Carrier Information */
export const Carriers = () => {
  const classes = useStyles();
  const { fleetCarriers, isLoading } = useFleetCarriers();
  const personalCarriers = usePersonalCarriers(fleetCarriers);
  const squadCarriers = useSquadCarriers(fleetCarriers);

  return (
    <>
      <Fade in={isLoading}>{isLoading ? <EDSpinner /> : <div></div>}</Fade>
      <Fade in={!isLoading}>
        <Container maxWidth="md" className={classes.table}>
          <Typography variant="h4">
            USC Fleet Carriers - {squadCarriers.length}
          </Typography>
          <USCCarriers carriers={squadCarriers} />
          <Typography variant="h4">
            Personal Fleet Carriers of USC - {personalCarriers.length}
          </Typography>
          <PersonalCarriers carriers={personalCarriers} />
        </Container>
      </Fade>
    </>
  );
};
