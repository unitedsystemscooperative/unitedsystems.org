import {
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
import makeStyles from '@mui/styles/makeStyles';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IJoinInfo } from 'models/join/joinInfo';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
  question: {
    borderColor: theme.palette.secondary.main,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
  },
}));

export const JoinFormGuest = (props: {
  onSubmit: (data: IJoinInfo, type: string) => void;
}) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, errors } = useForm<IJoinInfo>();

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
      <Typography variant="h3" className={classes.header}>
        Guest
      </Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.header}>
          All items are required.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.question}>
            <Typography>Please enter your in-game CMDR name</Typography>
            <TextField
              label="CMDR Name"
              inputRef={register({ required: true, minLength: 2 })}
              name="cmdr"
            />
            {errors.cmdr && (
              <Typography color="error">CMDR Name is required</Typography>
            )}
          </div>
          <div className={classes.question}>
            <Typography>
              Please enter your discord name in format: name#1234
            </Typography>
            <TextField
              label="Discord Name"
              inputRef={register({ required: true, pattern: /^.+#\d{4}$/gi })}
              name="discord"
            />
            {errors.discord && (
              <Typography color="error">
                Discord Name is required and must be in name#1234 format
              </Typography>
            )}
          </div>
          <div className={classes.question}>
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
          </div>
          <div className={classes.question}>
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
                    inputRef={register({ required: true })}
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
          </div>
          <div className={classes.question}>
            <Typography>What timezone are you in?</Typography>
            <TextField inputRef={register} name="timezone" />
            {errors.timezone && (
              <Typography color="error">Please enter your timezone.</Typography>
            )}
          </div>
          <div className={classes.question}>
            <Typography>
              I have read and agree to the{' '}
              <Link href="/about?x=rules" target="_blank">
                rules
              </Link>
              .
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="rules"
                  inputRef={register({ required: true })}
                />
              }
              label="Yes"
            />
            {errors.rules && (
              <Typography color="error">
                You must read and agree to abide by the rules.
              </Typography>
            )}
          </div>
          <div className={classes.header}>
            <Button type="submit" color="primary" variant="outlined">
              Submit Form
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};
