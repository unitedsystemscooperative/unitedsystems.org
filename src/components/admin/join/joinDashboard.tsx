import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Collapse,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import { copytoClipboard } from 'functions/copytoClipboard';
import { useJoinInfo } from 'hooks/join/useJoinInfo';
import React, { useState } from 'react';

enum JoinViews {
  'Members',
  'Guests',
  'Ambassadors',
}

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
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

export const JoinDashboard = () => {
  const classes = useStyles();
  const joinInfo = useJoinInfo();
  const [joinView, setJoinView] = useState<JoinViews>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const processLength = (length: string) => {
    switch (length) {
      case 'lessthanMonth':
        return '< 1 Month';
      case 'morethanMonth':
        return '> 1 Month';
      case 'morethan6Month':
        return '> 6 Months';
      case 'morethan1Year':
        return '> 1 Year';
      default:
        return '';
    }
  };

  const buildPlatforms = (platforms: {
    pc: boolean;
    xbox: boolean;
    ps: boolean;
  }) => {
    const pc = platforms.pc ? 'PC,' : '';
    const xbox = platforms.xbox ? 'Xbox,' : '';
    const ps = platforms.ps ? 'PlayStation' : '';
    return `${pc}${xbox}${ps}`;
  };

  if (joinInfo.loading) {
    return <EDSpinner />;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h3">Join List</Typography>
      <Toolbar>
        <Typography>Join List</Typography>
      </Toolbar>
      <div className={classes.joinTypes}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(0)}
        >
          {JoinViews.Members}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(1)}
        >
          {JoinViews.Guests}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setJoinView(2)}
        >
          {JoinViews.Ambassadors}
        </Button>
      </div>
      {isMobile && (
        <Paper className={classes.root}>
          <Typography>Tables scroll on small screens</Typography>
        </Paper>
      )}
      <Collapse in={joinView === 0}>
        <div>
          <Typography variant="h4">Members</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>CMDR</TableCell>
                  <TableCell>Discord</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Playing Length</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Reference2</TableCell>
                  <TableCell>Timezone</TableCell>
                </TableRow>
              </TableHead>
              {joinInfo.joiners && (
                <TableBody>
                  {joinInfo.joiners.map((map) => (
                    <TableRow key={`${map.discord} ${map.timeStamp}`}>
                      <TableCell>{map.timeStamp}</TableCell>
                      <TableCell>
                        {map.cmdr}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            copytoClipboard(map.cmdr.toUpperCase())
                          }
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {map.discord}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.discord)}
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                      <TableCell>{processLength(map.playingLength)}</TableCell>
                      <TableCell>{map.reference}</TableCell>
                      <TableCell>{map.reference2}</TableCell>
                      <TableCell>{map.timezone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </Collapse>
      <Collapse in={joinView === 1}>
        <div>
          <Typography variant="h4">Guests</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>CMDR</TableCell>
                  <TableCell>Discord</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Reference2</TableCell>
                  <TableCell>Timezone</TableCell>
                </TableRow>
              </TableHead>
              {joinInfo.guests && (
                <TableBody>
                  {joinInfo.guests.map((map) => (
                    <TableRow key={`${map.discord} ${map.timeStamp}`}>
                      <TableCell>{map.timeStamp}</TableCell>
                      <TableCell>
                        {map.cmdr}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            copytoClipboard(map.cmdr.toUpperCase())
                          }
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {map.discord}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.discord)}
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                      <TableCell>{map.reference}</TableCell>
                      <TableCell>{map.reference2}</TableCell>
                      <TableCell>{map.timezone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </Collapse>
      <Collapse in={joinView === 2}>
        <div>
          <Typography variant="h4">Ambassadors</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>TimeStamp</TableCell>
                  <TableCell>CMDR</TableCell>
                  <TableCell>Discord</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Need Private</TableCell>
                  <TableCell>Timezone</TableCell>
                </TableRow>
              </TableHead>
              {joinInfo.ambassadors && (
                <TableBody>
                  {joinInfo.ambassadors.map((map) => (
                    <TableRow key={`${map.discord} ${map.timeStamp}`}>
                      <TableCell>{map.timeStamp}</TableCell>
                      <TableCell>
                        {map.cmdr}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            copytoClipboard(map.cmdr.toUpperCase())
                          }
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {map.discord}{' '}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.discord)}
                        >
                          <FileCopy />
                        </IconButton>
                      </TableCell>
                      <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                      <TableCell>{map.group}</TableCell>
                      <TableCell>{map.needPrivate?.toString()}</TableCell>
                      <TableCell>{map.timezone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </Collapse>
    </Container>
  );
};
