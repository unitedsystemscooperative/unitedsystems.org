import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IJoinInfo } from 'models/join/joinInfo';
import {
  FormCmdrName,
  FormDiscordName,
  FormPlatformRadioGroup,
  QuestionBox,
} from './commonComponents';

export const JoinFormGuest = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const { register, handleSubmit, setValue, formState, control } = useForm<
    Omit<IJoinInfo, '_id'>
  >();
  const [platforms, setPlatforms] = useState<{
    pc: boolean;
    xbox: boolean;
    ps: boolean;
  }>({ pc: false, xbox: false, ps: false });
  const [ref, setRef] = useState('');
  const [ref2Question, setRef2Question] = useState('');

  useEffect(() => {
    register('platforms', { required: true });
    register('reference', { required: true });
  }, [register]);

  const handlePlatformChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetName = event.target.name;
    const checked = event.target.checked;
    if (targetName === 'pc' || targetName === 'xbox' || targetName === 'ps') {
      setPlatforms((state) => {
        state[targetName] = checked;
        const newValue = { ...state, [targetName]: checked };
        setValue('platforms', newValue);
        return newValue;
      });
    }
  };

  const handleRefChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRef(event.target.value);
    setValue('reference', event.target.value);
    switch (event.target.value) {
      case 'player':
        setRef2Question('Which player referred you?');
        break;
      case 'other':
        setRef2Question("Please explain 'Other'");
        break;
      default:
        setRef2Question('');
        break;
    }
  };

  const onSubmit = (data: IJoinInfo) => props.onSubmit(data, 'guest');

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Guest
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography sx={{ textAlign: 'center' }}>
          All items are required.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCmdrName register={register} formState={formState} />
          <FormDiscordName register={register} formState={formState} />
          <FormPlatformRadioGroup control={control} formState={formState} />

          <QuestionBox>
            <Typography>How did you find us?</Typography>
            <FormControl component="fieldset" required>
              <RadioGroup
                name="reference"
                row
                value={ref}
                onChange={handleRefChange}
              >
                <FormControlLabel
                  value="reddit"
                  control={<Radio />}
                  label="Reddit"
                />
                <FormControlLabel
                  value="inara"
                  control={<Radio />}
                  label="Inara"
                />
                <FormControlLabel
                  value="player"
                  control={<Radio />}
                  label="Player Referral"
                />
                <FormControlLabel
                  value="facebook"
                  control={<Radio />}
                  label="Facebook"
                />
                <FormControlLabel
                  value="website"
                  control={<Radio />}
                  label="Our Website"
                />
                <FormControlLabel
                  value="forums"
                  control={<Radio />}
                  label="Forums"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            {errors.reference && (
              <Typography color="error">
                You must select how to found us.
              </Typography>
            )}
            <Collapse
              in={ref2Question !== ''}
              timeout={500}
              mountOnEnter
              unmountOnExit
            >
              <div>
                <Divider />
                <div>
                  <Typography>{ref2Question}</Typography>
                  <TextField
                    {...register('reference2', { required: true })}
                    name="reference2"
                  />
                  {errors.reference2 && (
                    <Typography color="error">
                      You must populate this field.
                    </Typography>
                  )}
                </div>
              </div>
            </Collapse>
          </QuestionBox>
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
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" color="primary" variant="outlined">
              Submit Form
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
