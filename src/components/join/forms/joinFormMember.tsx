import { Container, Paper, Typography } from '@mui/material';
import { IJoinInfo } from 'models/join/joinInfo';
import { useForm } from 'react-hook-form';
import {
  FormCmdrName,
  FormDiscordName,
  FormPlatformRadioGroup,
  FormPlayingLength,
  FormReference,
  FormRegion,
  FormRules,
  FormSubmit,
} from './joinComponents';

export const JoinFormMember = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const { handleSubmit, control } = useForm<Omit<IJoinInfo, '_id'>>();

  const onSubmit = (data: IJoinInfo) => props.onSubmit(data, 'join');

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Member
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          All items are required.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCmdrName control={control} />
          <FormDiscordName control={control} />
          <FormPlatformRadioGroup control={control} />
          <FormPlayingLength control={control} />
          <FormReference control={control} />
          <FormRegion control={control} />
          <FormRules control={control} />
          <FormSubmit />
        </form>
      </Paper>
    </Container>
  );
};
