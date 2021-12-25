import { TextFieldwM1 } from '@/components/_common';
import {
  Platform,
  PlatformString,
  Referral,
  ReferralString,
  Region,
  RegionString,
} from '@@/admin/models';
import { IJoinRequest } from '@@/join/models/joinRequest';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Control, RegisterOptions, useController, useWatch } from 'react-hook-form';

export const QuestionBox = styled('div')(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 5,
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),
}));

interface ControllerProps {
  name: keyof Omit<IJoinRequest, '_id'>;
  rules?: RegisterOptions;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<Omit<IJoinRequest, '_id'>, object>;
}

interface FormQuestionProps {
  question: string;
  label: string;
  controllerProps: ControllerProps;
}
export const FormTextField = ({ question, label, controllerProps }: FormQuestionProps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ ...controllerProps, defaultValue: '' });
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      <TextFieldwM1 label={label} {...inputProps} inputRef={ref} fullWidth variant="standard" />
      {error?.message && <Typography color="error">{error?.message}</Typography>}
    </QuestionBox>
  );
};

export const FormCheckBoxField = ({ question, label, controllerProps }: FormQuestionProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ ...controllerProps, defaultValue: false });
  return (
    <QuestionBox>
      <Typography>{question}</Typography>
      {typeof value === 'boolean' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel
            label={label}
            control={<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />}
          />
        </Box>
      ) : (
        <Typography color="error">This field should be a checkbox</Typography>
      )}
      {error?.message && <Typography color="error">{error?.message}</Typography>}
    </QuestionBox>
  );
};

interface FormControlProps {
  control: Control<Omit<IJoinRequest, '_id'>>;
}
export const FormCmdrName = ({ control }: FormControlProps) => {
  return (
    <FormTextField
      question="Please enter your in-game CMDR name"
      label="CMDR Name"
      controllerProps={{
        name: 'cmdr',
        rules: {
          required: 'Your CMDR name is required.',
          minLength: {
            value: 2,
            message: 'Your CMDR name must be longer than 2 characters',
          },
        },
        control,
      }}
    />
  );
};

export const FormDiscordName = ({ control }: FormControlProps) => {
  return (
    <FormTextField
      question="Please enter your discord name in format: name#1234"
      label="Discord Tag"
      controllerProps={{
        name: 'discord',
        rules: {
          required: 'The Discord tag is required.',
          pattern: {
            value: /^.+#\d{4}$/gi,
            message: 'This must be in {username}#0000 format',
          },
        },
        control,
      }}
    />
  );
};

export const FormPlatformRadioGroup = ({ control }: FormControlProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'platform',
    control,
    rules: { required: 'You must select a platform.' },
    defaultValue: null,
  });
  return (
    <QuestionBox>
      <Typography>Which platform do you primarily play on?</Typography>

      <RadioGroup {...field} row sx={{ justifyContent: 'space-evenly' }}>
        {Object.keys(Platform)
          .filter((k) => !isNaN(Number(k)))
          .map((platform) => (
            <FormControlLabel
              key={platform}
              value={platform}
              label={PlatformString[platform]}
              control={<Radio />}
            />
          ))}
      </RadioGroup>
      {error?.message && <Typography color="error">{error?.message}</Typography>}
    </QuestionBox>
  );
};

export const FormPlayingLength = ({ control }: FormControlProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'playingLength',
    control,
    rules: { required: 'Please choose how long you have been playing.' },
    defaultValue: null,
  });
  return (
    <QuestionBox>
      <Typography>How long have you been playing?</Typography>
      <RadioGroup row {...field} sx={{ justifyContent: 'space-evenly' }}>
        <FormControlLabel value="lessthanMonth" control={<Radio />} label="Less than 1 month" />
        <FormControlLabel value="morethanMonth" control={<Radio />} label="More than 1 month" />
        <FormControlLabel value="morethan6Month" control={<Radio />} label="More than 6 months" />
        <FormControlLabel value="morethan1Year" control={<Radio />} label="More than 1 year" />
      </RadioGroup>
      {error?.message && <Typography color="error">{error?.message}</Typography>}
    </QuestionBox>
  );
};

export const FormReferral = ({ control }: FormControlProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'referral',
    control,
    rules: { required: 'You must select a referral type.' },
    defaultValue: null,
  });
  const referral = useWatch({ control, name: 'referral' });
  const {
    field: { ref: ref2, ...inputProps2 },
    fieldState: { error: error2 },
  } = useController({ name: 'referral2', control, defaultValue: '' });
  const [ref2Question, setRef2Question] = useState('');

  useEffect(() => {
    switch (+referral) {
      case Referral.Player:
        setRef2Question('Which player referred you?');
        break;
      case Referral.Other:
        setRef2Question('Please explain');
        break;
      default:
        setRef2Question('');
        break;
    }
  }, [referral]);

  return (
    <QuestionBox>
      <Typography>How did you find us?</Typography>
      <RadioGroup {...field} row sx={{ justifyContent: 'space-evenly' }}>
        {Object.keys(Referral)
          .filter((k) => !isNaN(Number(k)))
          .map((referral) => (
            <FormControlLabel
              key={referral}
              value={referral}
              label={ReferralString[referral]}
              control={<Radio />}
            />
          ))}
      </RadioGroup>
      {error?.message && <Typography color="error">{error?.message}</Typography>}
      <Collapse in={ref2Question !== ''} timeout={500} mountOnEnter unmountOnExit>
        <div>
          <Divider />
          <div>
            <Typography>{ref2Question}</Typography>
            <TextFieldwM1
              label="Explain"
              {...inputProps2}
              inputRef={ref2}
              helperText={error2?.message}
              fullWidth
              variant="standard"
            />
          </div>
        </div>
      </Collapse>
    </QuestionBox>
  );
};
export const FormRegion = ({ control }: FormControlProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'region',
    control,
    rules: { required: 'You must select a region.' },
    defaultValue: null,
  });
  return (
    <QuestionBox>
      <Typography>Which region are you in?</Typography>

      <RadioGroup {...field} row sx={{ justifyContent: 'space-evenly' }}>
        {Object.keys(Region)
          .filter((k) => !isNaN(Number(k)))
          .map((region) => (
            <FormControlLabel
              key={region}
              value={region}
              label={RegionString[region]}
              control={<Radio />}
            />
          ))}
      </RadioGroup>

      {error?.message && <Typography color="error">{error?.message}</Typography>}
    </QuestionBox>
  );
};
export const FormRules = ({ control }: FormControlProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'rules',
    control,
    rules: { required: 'You must read and agree to abide by the rules.' },
    defaultValue: false,
  });
  return (
    <QuestionBox>
      <Typography>
        I have read and agree to the{' '}
        <Link href="/about?x=rules" target="_blank">
          rules
        </Link>
        .
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          label="Yes"
          control={<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />}
        />
      </Box>

      {error?.message && <Typography color="error">{error?.message}</Typography>}
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
