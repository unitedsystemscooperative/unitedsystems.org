import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { System } from 'models/about/system';
import { useEffect } from 'react';
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

export interface SystemDialogProps {
  open: boolean;
  values?: System;
  onClose: (value?: System) => void;
}

export const SystemDialog = (props: SystemDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { handleSubmit, reset, control, setValue } = useForm<System>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset();
    }
  }, [values, reset, setValue]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<System> = (data: System) => {
    const _id = values?._id ? values._id : undefined;
    onClose({
      _id,
      name: data.name,
      inaraLink: data.inaraLink,
      isControlled: data.isControlled ?? false,
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
          <Controller
            name="name"
            control={control}
            render={(field) => (
              <TextField
                fullWidth
                label="System Name"
                className={classes.textField}
                {...field}
              />
            )}
          />
          <Controller
            name="inaraLink"
            control={control}
            render={(field) => (
              <TextField
                fullWidth
                label="Inara Link"
                className={classes.textField}
                {...field}
              />
            )}
          />
          <Controller
            name="isControlled"
            control={control}
            render={(field) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                }
                label="Controlled"
                labelPlacement="start"
              />
            )}
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
