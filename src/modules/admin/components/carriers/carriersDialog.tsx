import { TextFieldwM1 } from '@/components/_common';
import { IFleetCarrier } from '@/app/about/_models/fleetCarrier';
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

export interface CarrierDialogProps {
  open: boolean;
  values?: IFleetCarrier;
  onClose: (value?: IFleetCarrier) => void;
}

export const CarrierDialog = (props: CarrierDialogProps) => {
  const { open, values, onClose } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<IFleetCarrier, '_id'>>();

  useEffect(() => {
    if (values) {
      reset({
        name: values.name,
        inaraLink: values.inaraLink,
        owner: values.owner,
        purpose: values.purpose,
        id: values.id,
      });
    } else {
      reset({
        name: undefined,
        inaraLink: undefined,
        owner: undefined,
        purpose: undefined,
        id: undefined,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IFleetCarrier> = (data: IFleetCarrier) => {
    const _id = values?._id ? values._id : undefined;
    const purpose = data.purpose ? data.purpose : '';
    onClose({
      _id,
      name: data.name,
      inaraLink: data.inaraLink,
      purpose,
      id: data.id,
      owner: data.owner,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{values ? 'Edit' : 'Add'} Carrier</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Please enter the Carrier Name, Carrier ID, Owner, Inara Link, and the Purpose (if
            Personal, just leave it blank).
          </DialogContentText>
          <TextFieldwM1
            placeholder="Carrier Name"
            fullWidth
            error={errors.name !== undefined}
            helperText={errors.name?.type === 'required' && 'This field is required.'}
            {...register('name', { required: true })}
          />
          {/* TODO: add schema validate for Carrier ID (VVV-VVV) */}
          <TextFieldwM1
            placeholder="Carrier ID"
            fullWidth
            error={errors.id !== undefined}
            helperText={errors.id?.type === 'required' && 'This field is required.'}
            {...register('id', { required: true })}
          />
          <TextFieldwM1
            placeholder="Owner"
            fullWidth
            error={errors.owner !== undefined}
            helperText={errors.owner?.type === 'required' && 'This field is required.'}
            {...register('owner', { required: true })}
          />
          <TextFieldwM1
            placeholder="Inara Link"
            fullWidth
            error={errors.inaraLink !== undefined}
            helperText={errors.inaraLink?.type === 'required' && 'This field is required.'}
            {...register('inaraLink', { required: true })}
          />
          <TextFieldwM1
            placeholder="Purpose - Leave blank if Personal"
            fullWidth
            {...register('purpose', { required: false })}
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
