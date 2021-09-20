import { styled, TextField, Typography } from '@mui/material';
import { IJoinInfo } from 'models/join/joinInfo';
import { FormState, RegisterOptions, UseFormRegister } from 'react-hook-form';

export const QuestionBox = styled('div')(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 5,
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),
}));

interface FormTextFieldProps {
  question: string;
  label: string;
  field: keyof Omit<IJoinInfo, '_id'>;
  rules?: RegisterOptions;
  register: UseFormRegister<Omit<IJoinInfo, '_id'>>;
  formState: FormState<Omit<IJoinInfo, '_id'>>;
}

export const FormTextField = ({
  question,
  label,
  field,
  register,
  formState,
}: FormTextFieldProps) => {
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      <TextField
        label={label}
        {...register(field, { required: true, minLength: 2 })}
      />
      {formState.errors[field]?.type === 'required' && (
        <Typography color="error">This field is required</Typography>
      )}
      {formState.errors.discord.type === 'pattern' && (
        <Typography color="error">
          Discord Name is required and must be in name#1234 format
        </Typography>
      )}
    </QuestionBox>
  );
};
