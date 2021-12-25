import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
} from '@mui/material';
import { TextFieldwM1 } from 'components/_common';
import { System } from 'models/about/system';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface SystemDialogProps {
  open: boolean;
  values?: System;
  onClose: (value?: System) => void;
}

export const SystemDialog = (props: SystemDialogProps) => {
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<
    Omit<System, '_id'>
  >();

  useEffect(() => {
    if (values) {
      reset({
        name: values.name,
        inaraLink: values.inaraLink,
        isControlled: values.isControlled,
      });
    } else {
      reset();
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
          <TextFieldwM1
            label="System Name"
            fullWidth
            {...register('name', { required: true })}
          />
          <TextFieldwM1
            label="Inara Link"
            fullWidth
            {...register('inaraLink', { required: true })}
          />
          <Controller
            name="isControlled"
            control={control}
            render={({ field }) => (
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
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
