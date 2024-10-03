import { IJoinRequest } from '@/join/_models/joinRequest';
import { Container, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  FormCheckBoxField,
  FormCmdrName,
  FormDiscordName,
  FormPlatformRadioGroup,
  FormRegion,
  FormRules,
  FormSubmit,
  FormTextField,
} from './joinComponents';

export const JoinFormAmbassador = (props: {
  onSubmit: (data: IJoinRequest, type: string) => void;
}) => {
  const { handleSubmit, control } = useForm<Omit<IJoinRequest, '_id'>>();

  const onSubmit = (data: IJoinRequest) => props.onSubmit(data, 'ambassador');

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Ambassador
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>All items are required.</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCmdrName control={control} />
          <FormDiscordName control={control} />
          <FormPlatformRadioGroup control={control} />
          <FormTextField
            question="What faction/group do you represent?"
            label="Group"
            controllerProps={{
              name: 'group',
              rules: { required: 'This field is required' },
              control,
            }}
          />
          <FormCheckBoxField
            question="Do you have private information to discuss with High Command?"
            label="Yes"
            controllerProps={{ name: 'needPrivate', control }}
          />
          <FormRegion control={control} />
          <FormRules control={control} />
          <FormSubmit />
        </form>
      </Paper>
    </Container>
  );
};
