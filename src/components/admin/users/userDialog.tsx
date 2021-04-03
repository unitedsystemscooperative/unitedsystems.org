import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { IUser } from 'models/auth/user';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(1),
  },
  hide: {
    display: 'none',
    // visibility: 'collapse',
  },
}));

export interface UserDialogProps {
  open: boolean;
  values?: IUser;
  onClose: (value?: IUser) => void;
}

export const SystemDialog = (props: UserDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<IUser>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      console.log('no values given');
      reset({
        _id: undefined,
        cmdr: undefined,
        email: undefined,
        role: 'member',
        rank: undefined,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    const _id = values?._id ? values._id : undefined;
    onClose({
      _id,
      cmdr: data.cmdr,
      email: data.email,
      role: data.role,
      rank: data.rank,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{values ? 'Edit' : 'Add'} System</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Please enter the CMDR Name, email, and whether they are part of HC.
          </DialogContentText>
          <TextField
            name="_id"
            inputRef={register}
            disabled
            className={classes.hide}
          />
          <TextField
            name="cmdr"
            inputRef={register({ required: true })}
            fullWidth
            label="CMDR Name"
            className={classes.textField}
          />
          <TextField
            name="email"
            inputRef={register({ required: true })}
            fullWidth
            label="email"
            className={classes.textField}
          />
          <Typography>Is the user a member or part of High Command?</Typography>
          <Controller
            as={
              <RadioGroup name="role" row>
                <FormControlLabel
                  value="member"
                  control={<Radio />}
                  label="Fleet Member"
                />
                <FormControlLabel
                  value="high command"
                  control={<Radio />}
                  label="High Command"
                />
              </RadioGroup>
            }
            name="role"
            control={control}
            defaultValue=""
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
