import {
  Button,
  Collapse,
  Container,
  Fade,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useAddJoinInfo } from 'hooks/join/useJoinInfo';
import { IJoinInfo } from 'models/join/joinInfo';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { JoinFormAmbassador } from './joinFormAmbassador';
import { JoinFormGuest } from './joinFormGuest';
import { JoinFormMember } from './joinFormMember';
import { JoinNextSteps } from './joinNextSteps';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
  },
  paper: {
    width: 'fit-content',
    margin: 'auto',
    padding: theme.spacing(1),
  },
  joinTypes: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  form: {
    width: '100%',
    [theme.breakpoints.up('md')]: { width: 500 },
  },
}));

export const JoinNew = () => {
  const classes = useStyles();
  const [form, setForm] = useState<number | null>();
  const addJoiner = useAddJoinInfo();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: IJoinInfo, type: string) => {
    const newData = data;
    const time = new Date().getTime();
    newData.timeStamp = new Date(time).toISOString();
    newData.type = type;
    console.log(newData);
    try {
      addJoiner(newData);
      enqueueSnackbar('Successfully submitted form', { variant: 'success' });
      setForm(3);
    } catch (e) {
      enqueueSnackbar(`Failed to submit: ${e.message}`, { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Fade in={true}>
        <Container maxWidth="sm">
          <Typography variant="h3" className={classes.textCenter}>
            Join Us
          </Typography>
          <Paper className={classes.paper}>
            <Typography className={classes.textCenter}>
              Welcome to USC. Please select how you'd like to join us below.
            </Typography>
            <div className={classes.joinTypes}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setForm(0)}
              >
                As a member
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setForm(1)}
              >
                As a guest
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setForm(2)}
              >
                As an ambassador
              </Button>
            </div>
          </Paper>
        </Container>
      </Fade>
      <Collapse in={form === 0} unmountOnExit mountOnEnter>
        <div>
          <JoinFormMember onSubmit={onSubmit} />
        </div>
      </Collapse>
      <Collapse in={form === 1} unmountOnExit mountOnEnter>
        <div>
          <JoinFormGuest onSubmit={onSubmit} />
        </div>
      </Collapse>
      <Collapse in={form === 2} unmountOnExit mountOnEnter>
        <div>
          <JoinFormAmbassador onSubmit={onSubmit} />
        </div>
      </Collapse>
      <Collapse in={form === 3} unmountOnExit mountOnEnter>
        <div>
          <JoinNextSteps />
        </div>
      </Collapse>
    </Container>
  );
};
