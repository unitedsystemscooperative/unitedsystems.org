import {
  Button,
  Container,
  makeStyles,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useCMDRs } from 'hooks/useCmdrs';
import React from 'react';
import { CMDRTable } from './cmdrTable';

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

const DashboardTitleBar = ({ addUser }: { addUser?: () => void }) => {
  const classes = useTitleBarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        CMDR Management
      </Typography>
      <Tooltip title="Add a cmdr" arrow>
        <Button variant="contained" color="primary" onClick={addUser} disabled>
          <Add />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export const CMDRDashboard = () => {
  const classes = useStyles();
  const { cmdrs, loading, error, addCMDR, updateCMDR, deleteCMDR } = useCMDRs();
  return (
    <Container maxWidth="xl" component={Paper} className={classes.root}>
      <DashboardTitleBar />
      <CMDRTable cmdrs={cmdrs} />
    </Container>
  );
};
