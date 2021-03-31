import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  linkButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const AdminDashboard = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" className={classes.header}>
        USC Administration
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.header}>
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="https://docs.google.com/spreadsheets/d/1mvj2tCVpx5JSLca04QQqJxlaNJJJPAIBFgSAW4PD7_Y/edit#gid=0"
          target="_blank"
          className={classes.linkButton}
        >
          CMDR Spreadsheet
        </Button>
        <Link href="/admin/joinList" passHref>
          <Button
            variant="contained"
            color="primary"
            className={classes.linkButton}
          >
            Join List
          </Button>
        </Link>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.header}>
          Website Management
        </Typography>
        <Link href="/admin/allies" passHref>
          <Button
            variant="contained"
            color="primary"
            className={classes.linkButton}
          >
            Allies List
          </Button>
        </Link>
        <Link href="/admin/fc" passHref>
          <Button
            variant="contained"
            color="primary"
            className={classes.linkButton}
          >
            Fleet Carrier List
          </Button>
        </Link>
        <Link href="/admin/systems" passHref>
          <Button
            variant="contained"
            color="primary"
            className={classes.linkButton}
          >
            System List
          </Button>
        </Link>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.header}>
          Bot Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href="https://carl.gg"
          target="_blank"
          className={classes.linkButton}
        >
          Carl / COVAS Carl
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="https://dyno.gg/"
          target="_blank"
          className={classes.linkButton}
        >
          Dyno / COVAS Archer
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="https://giveawaybot.party/"
          target="_blank"
          className={classes.linkButton}
        >
          Giveaway Bot
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="https://mee6.xyz/"
          target="_blank"
          className={classes.linkButton}
        >
          Mee6
        </Button>
        <Button
          variant="contained"
          color="primary"
          href="https://monitorss.xyz/"
          target="_blank"
          className={classes.linkButton}
        >
          MonitoRSS
        </Button>
      </Paper>
    </Container>
  );
};
