import { EDSpinner } from '@admiralfeb/react-components';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';

const BuildTable = () => {
  return <></>;
};

const useStyles = makeStyles((theme) => ({
  center: { textAlign: 'center' },
}));
export const BuildDashboard = () => {
  const classes = useStyles();
  const { loading, shipBuilds, error } = useShipBuilds();

  if (loading) return <EDSpinner />;

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" className={classes.center}>
        Build Management
      </Typography>
    </Container>
  );
};
