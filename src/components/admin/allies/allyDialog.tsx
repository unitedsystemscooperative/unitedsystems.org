import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { TextFieldwMB1 } from 'components/_common';
import { IAlly } from 'models/about/ally';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface AllyDialogProps {
  open: boolean;
  values?: IAlly;
  onClose: (value?: IAlly) => void;
}

export const AllyDialog = (props: AllyDialogProps) => {
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<IAlly>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
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
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextFieldwMB1
                fullWidth
                placeholder="Ally Name"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {/* <TextField
            {...register('name', { required: true })}
            fullWidth
            placeholder="Ally Name"
          /> */}
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
