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
import { Controller, useForm } from 'react-hook-form';
import { IJoinInfo } from 'models/join/joinInfo';
import { QuestionBox } from './commonComponents';

export const JoinFormMember = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Omit<IJoinInfo, '_id'>>();

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
          <QuestionBox>
            <Typography>Please enter your in-game CMDR name</Typography>
            <TextField
              label="CMDR Name"
              {...register('cmdr', { required: true, minLength: 2 })}
            />
            {errors.cmdr && (
              <Typography color="error">CMDR Name is required</Typography>
            )}
          </QuestionBox>
          <QuestionBox>
            <Typography>
              Please enter your discord name in format: name#1234
            </Typography>
            <TextField
              label="Discord Name"
              {...register('discord', {
                required: true,
                pattern: /^.+#\d{4}$/gi,
              })}
            />
            {errors.discord && (
              <Typography color="error">
                Discord Name is required and must be in name#1234 format
              </Typography>
            )}
          </QuestionBox>
          <QuestionBox>
            <Typography>
              Which platform(s) do you play on? Choose all that apply.
            </Typography>
            <FormControl component="fieldset" required>
              <FormGroup row>
                <FormControlLabel
                  label="PC"
                  control={
                    <Checkbox
                      name="pc"
                      checked={platforms.pc}
                      onChange={handlePlatformChange}
                    />
                  }
                />
                <FormControlLabel
                  label="Xbox One"
                  control={
                    <Checkbox
                      name="xbox"
                      checked={platforms.xbox}
                      onChange={handlePlatformChange}
                    />
                  }
                />
                <FormControlLabel
                  label="PS4 / PS5"
                  control={
                    <Checkbox
                      name="ps"
                      checked={platforms.ps}
                      onChange={handlePlatformChange}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
            {errors.platforms && (
              <Typography color="error">
                You must select at least one platform.
              </Typography>
            )}
          </QuestionBox>
          <QuestionBox>
            <Typography>How long have you been playing?</Typography>
            <Controller
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="lessthanMonth"
                    control={<Radio />}
                    label="Less than 1 month"
                  />
                  <FormControlLabel
                    value="morethanMonth"
                    control={<Radio />}
                    label="More than 1 month"
                  />
                  <FormControlLabel
                    value="morethan6Month"
                    control={<Radio />}
                    label="More than 6 months"
                  />
                  <FormControlLabel
                    value="morethan1Year"
                    control={<Radio />}
                    label="More than 1 year"
                  />
                </RadioGroup>
              )}
              name="playingLength"
              control={control}
              defaultValue=""
            />
            {errors.playingLength && (
              <Typography color="error">
                You must select how long you've been playing.
              </Typography>
            )}
          </QuestionBox>
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
                  <TextField {...register('reference2', { required: true })} />
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
