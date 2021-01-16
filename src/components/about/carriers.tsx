import { Typography, makeStyles, Fade, Container } from '@material-ui/core';
import { EDSpinner } from '@admiralfeb/react-components';
import {
  useFleetCarriers,
  usePersonalCarriers,
  useSquadCarriers,
} from 'hooks/information/useFleetCarriers';
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
  const { fleetCarriers, loading } = useFleetCarriers();
  let personalCarriers = usePersonalCarriers(fleetCarriers);
  let squadCarriers = useSquadCarriers(fleetCarriers);

  return (
    <>
      <Fade in={loading}>{loading ? <EDSpinner /> : <div></div>}</Fade>
      <Fade in={!loading}>
        <Container maxWidth="md" className={classes.table}>
          <Typography variant="h4">USC Fleet Carriers</Typography>
          <USCCarriers carriers={squadCarriers} />
          <Typography variant="h4">Personal Fleet Carriers of USC</Typography>
          <PersonalCarriers carriers={personalCarriers} />
        </Container>
      </Fade>
    </>
  );
};
