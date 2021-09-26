import {
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useAddJoinRequest } from 'hooks/join/useJoinInfo';
import { IJoinRequest } from 'models/join/joinRequest';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { JoinFormAmbassador } from './forms/joinFormAmbassador';
import { JoinFormGuest } from './forms/joinFormGuest';
import { JoinFormMember } from './forms/joinFormMember';

export const Join = () => {
  const [form, setForm] = useState<number | null>();
  const addJoiner = useAddJoinRequest();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onSubmit = (data: IJoinRequest, type: string) => {
    const newData = data;
    const time = new Date().getTime();
    newData.timeStamp = new Date(time).toISOString();
    newData.type = type;
    try {
      addJoiner(newData);
      enqueueSnackbar('Successfully submitted form', { variant: 'success' });
      router.push('/join/nextSteps');
    } catch (e) {
      enqueueSnackbar(`Failed to submit: ${e.message}`, { variant: 'error' });
    }
  };

  return (
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
          <Button variant="outlined" color="primary" onClick={() => setForm(0)}>
            As a member
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setForm(1)}>
            As a guest
          </Button>
          <Button variant="outlined" color="primary" onClick={() => setForm(2)}>
            As an ambassador
          </Button>
        </Box>
      </Paper>

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
    </Container>
  );
};
