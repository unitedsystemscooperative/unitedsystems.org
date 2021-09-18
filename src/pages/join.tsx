import {
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Paper,
  Typography,
} from '@mui/material';
import {
  JoinFormAmbassador,
  JoinFormGuest,
  JoinFormMember,
  JoinNextSteps,
} from 'components/join';
import { PrimaryLayout } from 'components/layouts/primary';
import { useAddJoinInfo } from 'hooks/join/useJoinInfo';
import { IJoinInfo } from 'models/join/joinInfo';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export const JoinRequestPage = () => {
  const [form, setForm] = useState<number | null>();
  const addJoiner = useAddJoinInfo();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: IJoinInfo, type: string) => {
    const newData = data;
    const time = new Date().getTime();
    newData.timeStamp = new Date(time).toISOString();
    newData.type = type;
    try {
      addJoiner(newData);
      enqueueSnackbar('Successfully submitted form', { variant: 'success' });
      setForm(3);
    } catch (e) {
      enqueueSnackbar(`Failed to submit: ${e.message}`, { variant: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>Join USC!</title>
        <meta name="description" content="Join the USC! We have cookies!" />
      </Head>
      <PrimaryLayout>
        <Container maxWidth="sm">
          <Fade in={true}>
            <Container maxWidth="sm">
              <Typography variant="h3" sx={{ textAlign: 'center' }}>
                Join Us
              </Typography>
              <Paper
                sx={{
                  width: 'fit-content',
                  margin: 'auto',
                  padding: 1,
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  Welcome to USC. Please select how you'd like to join us below.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                </Box>
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
      </PrimaryLayout>
    </>
  );
};

export default JoinRequestPage;
