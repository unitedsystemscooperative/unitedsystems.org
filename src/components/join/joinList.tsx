import { useJoinInfo } from 'hooks/join/useJoinInfo';
import { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  Container,
  Fade,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { copytoClipboard } from 'functions/copytoClipboard';
import { EDSpinner } from '@admiralfeb/react-components';
import { useSnackbar } from 'notistack';

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

export const JoinList = () => {
  const joinInfo = useJoinInfo();

  const classes = useStyles();
  const [select, setSelect] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (joinInfo.error) {
      enqueueSnackbar(`Failed to retrieve list. ${joinInfo.error.message}`, {
        variant: 'error',
      });
      return;
    }
    if (joinInfo.joiners && joinInfo.joiners.length > 0) {
      enqueueSnackbar('Successfully retrieved list.', { variant: 'success' });
    }
  }, [joinInfo.joiners, joinInfo.error, enqueueSnackbar]);

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

  if (joinInfo.loading) {
    return <EDSpinner />;
  }

  return (
    <Fade in={true}>
      <Container className={classes.root}>
        <Typography variant="h3">Join List</Typography>
        <div className={classes.joinTypes}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelect(0)}
          >
            Members
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelect(1)}
          >
            Guests
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelect(2)}
          >
            Ambassadors
          </Button>
        </div>
        {isMobile && (
          <Paper className={classes.root}>
            <Typography>Tables scroll on small screens</Typography>
          </Paper>
        )}
        <Collapse in={select === 0}>
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
                            <FileCopyIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {map.discord}{' '}
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => copytoClipboard(map.discord)}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                        <TableCell>
                          {processLength(map.playingLength!)}
                        </TableCell>
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
        <Collapse in={select === 1}>
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
                            <FileCopyIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {map.discord}{' '}
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => copytoClipboard(map.discord)}
                          >
                            <FileCopyIcon />
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
        <Collapse in={select === 2}>
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
                            <FileCopyIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {map.discord}{' '}
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => copytoClipboard(map.discord)}
                          >
                            <FileCopyIcon />
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
    </Fade>
  );
};
