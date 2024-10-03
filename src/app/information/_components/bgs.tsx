import { IndentedDiv } from '@/_components/_common';
import {
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const BGSInfo = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center">
        Background Simulation (BGS) General Information
      </Typography>
      <Paper sx={{ p: 2 }}>
        <section>
          <Typography variant="h5">Influence</Typography>
          <IndentedDiv>
            <Typography variant="h6">Adding Influence</Typography>
            <IndentedDiv>
              <Typography>There are multiple ways to add influence:</Typography>
              <Typography>
                <ul>
                  <li>Complete INF missions. The more +'s the better.</li>
                  <li>
                    Bounty Hunting - Dropping the bounties at a station where the giver of the
                    bounty has a presence.
                  </li>
                  <li>Exploration Data hand-in - Increases INF for the owner of the station.</li>
                  <li>Commodity Trading - Increases INF for the owner of the station.</li>
                  <li>Interstellar Factors - Increases INF for the owner of the station.</li>
                  <li>
                    Vista Genomics hand-in (Odyssey-Only and Unconfirmed) - Increases INF for the
                    owner of the station.
                  </li>
                </ul>
              </Typography>
            </IndentedDiv>

            <Typography variant="h6">Decreasing Influence</Typography>
            <IndentedDiv>
              <Typography>
                <ul>
                  <li>Completing INF missions for other factions in the system.</li>
                  <li>
                    "Clean Killing" - Killing innocent NPCs of that faction. This is considered
                    illegal and can bring System Authority against you.
                  </li>
                  <li>
                    Black Market Trading - Bringing illegal/illicit goods and selling them to a
                    station will decrease the station owner's INF.
                  </li>
                  <li>
                    Failing missions - Failing missions, whether intentional or not, will decrease
                    the mission faction's INF.
                    <br />
                    Note: Aborting the mission will only decrease your REP without affecting INF.
                  </li>
                </ul>
              </Typography>
            </IndentedDiv>
            <Typography variant="h6">Diminishing Returns</Typography>
            <IndentedDiv>
              <Typography>
                Too much of one thing is too much. There are caps in place to prevent over-inflating
                changes in influence
              </Typography>
            </IndentedDiv>
          </IndentedDiv>
        </section>
        <Divider />
        <section>
          <Typography variant="h5">Conflicts</Typography>
          <IndentedDiv>
            <Typography variant="h6">Elections</Typography>
            <Typography ml={3}>Complete election missions to win the conflict.</Typography>

            <Typography variant="h6">Wars</Typography>
            <IndentedDiv>
              <Typography>Wars are won in two ways:</Typography>
              <Typography>
                <ul>
                  <li>Conflict Zones</li>
                  <li>Combat Bonds</li>
                </ul>
              </Typography>
              <Typography>
                Diminishing returns are a possibility here. Follow the list below. A maximum of 9
                should be a good cap.
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
            </IndentedDiv>
          </IndentedDiv>
        </section>
      </Paper>
    </Container>
  );
};
