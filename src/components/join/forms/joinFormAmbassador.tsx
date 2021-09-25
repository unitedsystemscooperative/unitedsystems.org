import { Container, Paper, Typography } from '@mui/material';
import { IJoinInfo } from 'models/join/joinInfo';
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
} from './commonComponents';

export const JoinFormAmbassador = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const { register, handleSubmit, formState, control } = useForm<
    Omit<IJoinInfo, '_id'>
  >();

  const onSubmit = (data: IJoinInfo) => props.onSubmit(data, 'ambassador');

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Ambassador
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          All items are required.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCmdrName register={register} formState={formState} />
          <FormDiscordName register={register} formState={formState} />
          <FormPlatformRadioGroup control={control} formState={formState} />
          <FormTextField
            question="What faction/group do you represent?"
            label="Group"
            field="group"
            rules={{ required: 'This field is required' }}
            register={register}
            formState={formState}
          />
          <FormCheckBoxField
            question="Do you have private information to discuss with High Command?"
            label="Yes"
            fieldName="needPrivate"
            control={control}
            formState={formState}
          />
          <FormRegion formState={formState} control={control} />
          <FormRules formState={formState} control={control} />
          <FormSubmit />
        </form>
      </Paper>
    </Container>
  );
};
