import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { TextFieldwM1 } from 'components/_common';
import { Platform, PlatformString } from 'models/admin/platforms';
import { Region, RegionString } from 'models/admin/regions';
import { IJoinInfo } from 'models/join/joinInfo';
import React from 'react';
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

interface FormCheckBoxFieldProps {
  question: string;
  label: string;
  fieldName: keyof Omit<IJoinInfo, '_id'>;
  rules?: RegisterOptions;
  formState: FormState<Omit<IJoinInfo, '_id'>>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<Omit<IJoinInfo, '_id'>, object>;
}
export const FormCheckBoxField = ({
  question,
  label,
  fieldName,
  rules,
  control,
  formState,
}: FormCheckBoxFieldProps) => {
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      <Controller
        name={fieldName}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) =>
          typeof value === 'boolean' ? (
            <FormControlLabel
              label={label}
              control={
                <Checkbox
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              }
            />
          ) : (
            <Typography color="error">
              This field should be a checkbox
            </Typography>
          )
        }
      />
      {formState.errors[fieldName]?.message && (
        <Typography color="error">
          {formState.errors[fieldName].message}
        </Typography>
      )}
    </QuestionBox>
  );
};

interface FormRegisterStateProps {
  register: UseFormRegister<Omit<IJoinInfo, '_id'>>;
  formState: FormState<Omit<IJoinInfo, '_id'>>;
}
export const FormCmdrName = ({
  register,
  formState,
}: FormRegisterStateProps) => {
  return (
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
  );
};

export const FormDiscordName = ({
  register,
  formState,
}: FormRegisterStateProps) => {
  return (
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
  );
};

interface FormControllerProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<Omit<IJoinInfo, '_id'>, object>;
  formState: FormState<Omit<IJoinInfo, '_id'>>;
}
export const FormPlatformRadioGroup = ({
  control,
  formState,
}: FormControllerProps) => {
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
export const FormPlatformRadioGroup = ({
  control,
  formState,
}: FormControllerProps) => {
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
export const FormRegion = ({ control, formState }: FormControllerProps) => {
  return (
    <QuestionBox>
      <Typography>Which region are you in?</Typography>
      <Controller
        name="region"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextFieldwM1 label="Region" select {...field} fullWidth>
            <MenuItem value={Region.N_CAmerica}>
              {RegionString[Region.N_CAmerica]}
            </MenuItem>
            <MenuItem value={Region.SAmerica}>
              {RegionString[Region.SAmerica]}
            </MenuItem>
            <MenuItem value={Region.Europe_Africa}>
              {RegionString[Region.Europe_Africa]}
            </MenuItem>
            <MenuItem value={Region.Asia}>{RegionString[Region.Asia]}</MenuItem>
            <MenuItem value={Region.Asia_Pacific}>
              {RegionString[Region.Asia_Pacific]}
            </MenuItem>
          </TextFieldwM1>
        )}
      />
      {formState.errors.region && (
        <Typography color="error">You must select a region.</Typography>
      )}
    </QuestionBox>
  );
};
export const FormRules = ({ control, formState }: FormControllerProps) => {
  return (
    <QuestionBox>
      <Typography>
        <Typography>
          I have read and agree to the{' '}
          <Link href="/about?x=rules" target="_blank">
            rules
          </Link>
          .
        </Typography>
      </Typography>
      <Controller
        name="rules"
        control={control}
        rules={{ required: 'You must read and agree to abide by the rules.' }}
        render={({ field: { value, onChange } }) => (
          <FormControlLabel
            label="Yes"
            control={
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
          />
        )}
      />
      {formState.errors.rules?.message && (
        <Typography color="error">{formState.errors.rules.message}</Typography>
      )}
    </QuestionBox>
  );
};

export const FormSubmit = () => {
  return (
    <Box component="div" sx={{ textAlign: 'center' }}>
      <Button type="submit" color="primary" variant="outlined">
        Submit Form
      </Button>
    </Box>
  );
};
