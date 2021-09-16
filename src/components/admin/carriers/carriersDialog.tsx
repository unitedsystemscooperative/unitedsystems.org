import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useEffect } from 'react';
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

export interface CarrierDialogProps {
  open: boolean;
  values?: IFleetCarrier;
  onClose: (value?: IFleetCarrier) => void;
}

export const CarrierDialog = (props: CarrierDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset } = useForm<IFleetCarrier>();

  useEffect(() => {
    if (values) {
      reset(values);
    } else {
      reset({
        _id: undefined,
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
            Please enter the Carrier Name, Carrier ID, Owner, Inara Link, and
            the Purpose (if Personal, just leave it blank).
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
            placeholder="Carrier Name"
            className={classes.textField}
          />
          <TextField
            name="id"
            inputRef={register({ required: true })}
            fullWidth
            placeholder="Carrier ID"
            className={classes.textField}
          />
          <TextField
            name="owner"
            inputRef={register({ required: true })}
            fullWidth
            placeholder="Owner"
            className={classes.textField}
          />
          <TextField
            name="inaraLink"
            inputRef={register({ required: true })}
            fullWidth
            placeholder="Inara Link"
            className={classes.textField}
          />
          <TextField
            name="purpose"
            inputRef={register({ required: false })}
            fullWidth
            placeholder="Purpose - Leave blank if Personal"
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
