import { useJoinRequests } from '@@/join/hooks/useJoinInfo';
import { EDSpinner } from '@admiralfeb/react-components';
import {
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { AmbassadorsTable } from './joinTableAmbassadors';
import { GuestsTable } from './joinTableGuests';
import { MembersTable } from './joinTableMembers';

enum JoinViews {
  'Members',
  'Guests',
  'Ambassadors',
}

const DashBoardTitleBar = ({
  joinView,
  setJoinView,
}: {
  joinView: JoinViews;
  setJoinView: Dispatch<SetStateAction<JoinViews>>;
}) => {
  return (
    <Toolbar sx={{ pl: 2, pr: 1 }}>
      <Typography variant="h4" component="div" sx={{ flex: '2 1 100%', textAlign: 'left' }}>
        {JoinViews[joinView]}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: { xs: 'flex-end', md: 'initial' },
          flexWrap: { xs: 'wrap', md: 'initial' },
          '& button': {
            mx: 1,
          },
        }}>
        <Button variant="outlined" color="primary" onClick={() => setJoinView(JoinViews.Members)}>
          {JoinViews[JoinViews.Members]}
        </Button>
        <Button variant="outlined" color="primary" onClick={() => setJoinView(JoinViews.Guests)}>
          {JoinViews[JoinViews.Guests]}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setJoinView(JoinViews.Ambassadors)}>
          {JoinViews[JoinViews.Ambassadors]}
        </Button>
      </Box>
    </Toolbar>
  );
};

export const JoinDashboard = () => {
  const joinInfo = useJoinRequests();
  const [joinView, setJoinView] = useState<JoinViews>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (joinInfo.loading) {
    return <EDSpinner />;
  }

  return (
    <Container sx={{ textAlign: 'center', mt: 1 }}>
      <Typography variant="h3">Join Requests</Typography>
      <Paper>
        <DashBoardTitleBar joinView={joinView} setJoinView={setJoinView} />
        {isMobile && (
          <Paper sx={{ textAlign: 'center', mt: 1 }}>
            <Typography>Table and pagination scroll on small screens</Typography>
          </Paper>
        )}
        <Collapse in={joinView === JoinViews.Members}>
          <MembersTable members={joinInfo.members} />
        </Collapse>
        <Collapse in={joinView === JoinViews.Guests}>
          <GuestsTable guests={joinInfo.guests} />
        </Collapse>
        <Collapse in={joinView === JoinViews.Ambassadors}>
          <AmbassadorsTable ambassadors={joinInfo.ambassadors} />
        </Collapse>
      </Paper>
    </Container>
  );
};
