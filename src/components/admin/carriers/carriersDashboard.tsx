import { Typography, makeStyles, Fade, Container } from '@material-ui/core';
import { EDSpinner } from '@admiralfeb/react-components';
import { useFleetCarriers } from 'hooks/about/useFleetCarriers';
import { CarriersAdmin } from './carriersTable';

const useStyles = makeStyles({
  table: {
    textAlign: 'center',
  },
});

/** Displays Fleet Carrier Information */
export const CarriersDashboard = () => {
  const classes = useStyles();
  const { fleetCarriers, isLoading } = useFleetCarriers();

  return (
    <>
      <Fade in={isLoading}>{isLoading ? <EDSpinner /> : <div></div>}</Fade>
      <Fade in={!isLoading}>
        <Container maxWidth="lg" className={classes.table}>
          <Typography variant="h3">USC Fleet Carrier Administration</Typography>
          <CarriersAdmin carriers={fleetCarriers} />
        </Container>
      </Fade>
    </>
  );
};
