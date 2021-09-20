import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { IJoinInfo } from 'models/join/joinInfo';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField, QuestionBox } from './commonComponents';

export const JoinFormAmbassador = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState,
    formState: { errors },
  } = useForm<Omit<IJoinInfo, '_id'>>();

  const [platforms, setPlatforms] = useState<{
    pc: boolean;
    xbox: boolean;
    ps: boolean;
  }>({ pc: false, xbox: false, ps: false });

  useEffect(() => {
    register('platforms', { required: true });
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
            rules={{ required: true, minLength: 2 }}
            register={register}
            formState={formState}
          />
          <FormTextField
            question="Please enter your discord name in format: name#1234"
            label="Discord Tag"
            field="discord"
            rules={{ required: true, pattern: /^.+#\d{4}$/gi }}
            register={register}
            formState={formState}
          />
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
            <Typography>What faction/group do you represent?</Typography>
            <TextField {...register('group', { required: true })} />
            {errors.group && (
              <Typography color="error">
                Please enter the group you represent.
              </Typography>
            )}
          </QuestionBox>
          <QuestionBox>
            <Typography>
              Do you have private information to discuss with High Command?
            </Typography>
            <FormControl component="fieldset" required>
              <FormGroup row>
                <FormControlLabel
                  label="Yes"
                  control={<Checkbox {...register('needPrivate')} />}
                />
              </FormGroup>
            </FormControl>
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
