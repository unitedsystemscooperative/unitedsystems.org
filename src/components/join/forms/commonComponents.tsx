import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Platform, PlatformString } from 'models/admin/platforms';
import { IJoinInfo } from 'models/join/joinInfo';
import {
  Control,
  Controller,
  FormState,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

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
  rules,
  register,
  formState,
}: FormTextFieldProps) => {
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      <TextField label={label} {...register(field, { ...rules })} />
      {formState.errors[field]?.message && (
        <Typography color="error">{formState.errors[field].message}</Typography>
      )}
    </QuestionBox>
  );
};

export const FormCheckBoxField = ({
  question,
  label,
  field,
  rules,
  register,
  formState,
}: FormTextFieldProps) => {
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      <FormControl component="fieldset">
        <FormGroup row>
          <FormControlLabel
            label={label}
            control={<Checkbox {...register(field, { ...rules })} />}
          />
        </FormGroup>
      </FormControl>
      {formState.errors[field]?.message && (
        <Typography color="error">{formState.errors[field].message}</Typography>
      )}
    </QuestionBox>
  );
};

interface FormPlatformRadioGroupProps {
  formState: FormState<Omit<IJoinInfo, '_id'>>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<Omit<IJoinInfo, '_id'>, object>;
}

export const FormPlatformRadioGroup = ({
  formState,
  control,
}: FormPlatformRadioGroupProps) => {
  return (
    <QuestionBox>
      <Typography>
        Which platform(s) do you play on? Choose all that apply.
      </Typography>
      <Controller
        name="platform"
        control={control}
        rules={{ required: 'You must select a platform.' }}
        render={({ field }) => (
          <RadioGroup {...field}>
            {Object.keys(PlatformString).map((platform) => (
              <FormControlLabel
                key={platform}
                value={Platform[platform]}
                label={platform}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
      {formState.errors.platform && (
        <Typography color="error">You must select a platform.</Typography>
      )}
    </QuestionBox>
  );
};
interface FormRadioGroupProps {
  question: string;
  label: string;
  field: keyof Omit<IJoinInfo, '_id'>;
  rules?: RegisterOptions;
  formState: FormState<Omit<IJoinInfo, '_id'>>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<Omit<IJoinInfo, '_id'>, object>;
}

export const FormRadioGroup = ({ formState, control }: FormRadioGroupProps) => {
  return (
    <QuestionBox>
      <Typography>
        Which platform(s) do you play on? Choose all that apply.
      </Typography>
      <Controller
        name="platform"
        control={control}
        rules={{ required: 'You must select a platform.' }}
        render={({ field }) => (
          <RadioGroup {...field}>
            {Object.keys(PlatformString).map((platform) => (
              <FormControlLabel
                key={platform}
                value={Platform[platform]}
                label={platform}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
      {formState.errors.platform && (
        <Typography color="error">You must select a platform.</Typography>
      )}
    </QuestionBox>
  );
};
