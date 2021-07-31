import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
  indent: {
    marginLeft: theme.spacing(3),
    '& p': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export const BGSInfo = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" className={classes.center}>
        Background Simulation (BGS) General Information
      </Typography>
      <Paper className={classes.paper}>
        <section>
          <Typography variant="h5">Influence</Typography>
          <div className={classes.indent}>
            <Typography variant="h6">Adding Influence</Typography>
            <div className={classes.indent}>
              <Typography>There are multiple ways to add influence:</Typography>
              <Typography>
                <ul>
                  <li>Complete INF missions. The more +'s the better.</li>
                  <li>
                    Bounty Hunting - Dropping the bounties at a station where
                    the giver of the bounty has a presence.
                  </li>
                  <li>
                    Exploration Data hand-in - Increases INF for the owner of
                    the station.
                  </li>
                  <li>
                    Commodity Trading - Increases INF for the owner of the
                    station.
                  </li>
                  <li>
                    Interstellar Factors - Increases INF for the owner of the
                    station.
                  </li>
                  <li>
                    Vista Genomics hand-in (Odyssey-Only and Unconfirmed) -
                    Increases INF for the owner of the station.
                  </li>
                </ul>
              </Typography>
            </div>

            <Typography variant="h6">Decreasing Influence</Typography>
            <div className={classes.indent}>
              <Typography>
                <ul>
                  <li>
                    Completing INF missions for other factions in the system.
                  </li>
                  <li>
                    "Clean Killing" - Killing innocent NPCs of that faction.
                    This is considered illegal and can bring System Authority
                    against you.
                  </li>
                  <li>
                    Black Market Trading - Bringing illegal/illicit goods and
                    selling them to a station will decrease the station owner's
                    INF.
                  </li>
                  <li>
                    Failing missions - Failing missions, whether intentional or
                    not, will decrease the mission faction's INF.
                    <br />
                    Note: Aborting the mission will only decrease your REP
                    without affecting INF.
                  </li>
                </ul>
              </Typography>
            </div>
            <Typography variant="h6">Diminishing Returns</Typography>
            <div className={classes.indent}>
              <Typography>
                Too much of one thing is too much. There are caps in place to
                prevent over-inflating changes in influence
              </Typography>
            </div>
          </div>
        </section>
        <Divider />
        <section>
          <Typography variant="h5">Conflicts</Typography>
          <div className={classes.indent}>
            <Typography variant="h6">Elections</Typography>
            <Typography className={classes.indent}>
              Complete election missions to win the conflict.
            </Typography>

            <Typography variant="h6">Wars</Typography>
            <div className={classes.indent}>
              <Typography>Wars are won in two ways:</Typography>
              <Typography>
                <ul>
                  <li>Conflict Zones</li>
                  <li>Combat Bonds</li>
                </ul>
              </Typography>
              <Typography>
                Diminishing returns are a possibility here. Follow the list
                below. A maximum of 9 should be a good cap.
              </Typography>
              <Container maxWidth="xs">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Conflict Zone Level</TableCell>
                      <TableCell align="center">Number Completed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">Low</TableCell>
                      <TableCell align="center">1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Medium</TableCell>
                      <TableCell align="center">2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">High</TableCell>
                      <TableCell align="center">3</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Container>
            </div>
          </div>
        </section>
      </Paper>
    </Container>
  );
};
