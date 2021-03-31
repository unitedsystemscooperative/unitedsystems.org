import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { IAlly } from 'models/about/ally';
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

export interface AllyDialogProps {
  open: boolean;
  values?: IAlly;
  onClose: (value?: IAlly) => void;
}

export const AllyDialog = (props: AllyDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset } = useForm<IAlly>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      console.log('no values given');
      reset({
        _id: undefined,
        name: undefined,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IAlly> = (data: IAlly) => {
    const _id = values?._id ? values._id : undefined;
    onClose({
      _id,
      name: data.name,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{values ? 'Edit' : 'Add'} System</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Please enter the Ally's name.</DialogContentText>
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
            placeholder="Ally Name"
            className={classes.textField}
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
