import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { System } from 'models/about/system';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(1),
  },
  hide: {
    display: 'none',
    // visibility: 'collapse',
  },
}));

export interface SystemDialogProps {
  open: boolean;
  values?: System;
  onClose: (value?: System) => void;
}

export const SystemDialog = (props: SystemDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset } = useForm<System>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      console.log('no values given');
      reset({
        _id: undefined,
        name: undefined,
        inaraLink: undefined,
        isControlled: false,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<System> = (data: System) => {
    const _id = values?._id ? values._id : undefined;
    onClose({
      _id,
      name: data.name,
      inaraLink: data.inaraLink,
      isControlled: data.isControlled,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{values ? 'Edit' : 'Add'} System</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Please enter the System Name, Inara Link, and whether we control the
            system.
          </DialogContentText>
          <TextField
            name="_id"
            inputRef={register}
            disabled
            className={classes.hide}
          />
          <TextField
            name="name"
            inputRef={register({ required: true })}
            fullWidth
            placeholder="System Name"
            className={classes.textField}
          />
          <TextField
            name="inaraLink"
            inputRef={register({ required: true })}
            fullWidth
            placeholder="Inara Link"
            className={classes.textField}
          />
          <FormControlLabel
            control={<Checkbox inputRef={register} name="isControlled" />}
            label="Controlled"
            labelPlacement="start"
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
