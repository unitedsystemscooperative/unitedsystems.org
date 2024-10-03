import { TextFieldwM1 } from '@/_components/_common';
import { IAlly } from '@/about/_models/ally';
import { WithOptionalId } from 'utils/db';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface AllyDialogProps {
  open: boolean;
  values?: IAlly;
  onClose: (value?: WithOptionalId<IAlly>) => void;
}

export const AllyDialog = (props: AllyDialogProps) => {
  const { open, values, onClose } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<IAlly, '_id'>>();

  useEffect(() => {
    if (values) {
      reset({ name: values.name });
    } else {
      reset({
        name: undefined,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<Omit<IAlly, '_id'>> = (data: Omit<IAlly, '_id'>) => {
    const _id = values?._id ? values._id : undefined;
    onClose({
      _id,
      name: data.name,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{values ? 'Edit' : 'Add'} System</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Please enter the Ally's name.</DialogContentText>
          <TextFieldwM1
            placeholder="Ally Name"
            fullWidth
            error={errors.name !== undefined}
            helperText={errors.name?.type === 'required' && 'This field is required.'}
            {...register('name', { required: true })}
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
