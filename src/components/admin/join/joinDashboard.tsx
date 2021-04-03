import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Collapse,
  Container,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useJoinInfo } from 'hooks/join/useJoinInfo';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AmbassadorsTable } from './joinTableAmbassadors';
import { GuestsTable } from './joinTableGuests';
import { MembersTable } from './joinTableMembers';

enum JoinViews {
  'Members',
  'Guests',
  'Ambassadors',
}

const useTitleBarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flex: '2 1 100%',
    textAlign: 'left',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
  },
}));

const DashBoardTitleBar = ({
  joinView,
  setJoinView,
}: {
  joinView: JoinViews;
  setJoinView: Dispatch<SetStateAction<JoinViews>>;
}) => {
  const classes = useTitleBarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        {JoinViews[joinView]}
      </Typography>
      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(JoinViews.Members)}
        >
          {JoinViews[JoinViews.Members]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(JoinViews.Guests)}
        >
          {JoinViews[JoinViews.Guests]}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(JoinViews.Ambassadors)}
        >
          {JoinViews[JoinViews.Ambassadors]}
        </Button>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },
  },
  joinTypes: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

export const JoinDashboard = () => {
  const classes = useStyles();
  const joinInfo = useJoinInfo();
  const [joinView, setJoinView] = useState<JoinViews>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (joinInfo.loading) {
    return <EDSpinner />;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h3">Join Requests</Typography>
      <Paper>
        <DashBoardTitleBar joinView={joinView} setJoinView={setJoinView} />
        {isMobile && (
          <Paper className={classes.root}>
            <Typography>Tables scroll on small screens</Typography>
          </Paper>
        )}
      </Paper>
      <Collapse in={joinView === JoinViews.Members}>
        <MembersTable members={joinInfo.joiners} />
      </Collapse>
      <Collapse in={joinView === JoinViews.Guests}>
        <GuestsTable guests={joinInfo.guests} />
      </Collapse>
      <Collapse in={joinView === JoinViews.Ambassadors}>
        <AmbassadorsTable ambassadors={joinInfo.ambassadors} />
      </Collapse>
    </Container>
  );
};
