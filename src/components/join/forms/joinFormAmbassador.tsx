import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { IJoinInfo } from 'models/join/joinInfo';
import { useForm } from 'react-hook-form';
import {
  FormCheckBoxField,
  FormPlatformRadioGroup,
  FormTextField,
  QuestionBox,
} from './commonComponents';

export const JoinFormAmbassador = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    control,
  } = useForm<Omit<IJoinInfo, '_id'>>();

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
          <FormTextField
            question="Please enter your in-game CMDR name"
            label="CMDR Name"
            field="cmdr"
            rules={{
              required: 'Your CMDR name is required.',
              minLength: {
                value: 2,
                message: 'Your CMDR name must be longer than 2 characters',
              },
            }}
            register={register}
            formState={formState}
          />
          <FormTextField
            question="Please enter your discord name in format: name#1234"
            label="Discord Tag"
            field="discord"
            rules={{
              required: 'The Discord tag is required.',
              pattern: {
                value: /^.+#\d{4}$/gi,
                message: 'This must be in {username}#0000 format',
              },
            }}
            register={register}
            formState={formState}
          />
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
            field="needPrivate"
            register={register}
            formState={formState}
          />
          <QuestionBox>
            <Typography>What timezone are you in?</Typography>
            <TextField {...register('timezone')} />
            {errors.timezone && (
              <Typography color="error">Please enter your timezone.</Typography>
            )}
          </QuestionBox>
          <QuestionBox>
            <Typography>
              I have read and agree to the{' '}
              <Link href="/about?x=rules" target="_blank">
                rules
              </Link>
              .
            </Typography>
            <FormControlLabel
              control={<Checkbox {...register('rules', { required: true })} />}
              label="Yes"
            />
            {errors.rules && (
              <Typography color="error">
                You must read and agree to abide by the rules.
              </Typography>
            )}
          </QuestionBox>
          <Box component="div" sx={{ textAlign: 'center' }}>
            <Button type="submit" color="primary" variant="outlined">
              Submit Form
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
