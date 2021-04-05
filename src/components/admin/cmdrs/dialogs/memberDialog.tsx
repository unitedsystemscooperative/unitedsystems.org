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
import { IMember } from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
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

export interface MemberDialogProps {
  open: boolean;
  values?: IMember[];
  onClose: (value?: IMember) => void;
}

export const MemberDialog = (props: MemberDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<IMember>();

  useEffect(() => {
    if (values) {
      if (values.length > 1) {
      } else {
        reset({
          _id: undefined,
          cmdrName: undefined,
          discordName: undefined,
          joinDate: undefined,
          discordJoinDate: undefined,
          platform: undefined,
          rank: undefined,
          isInInaraSquad: false,
          region: undefined,
          ref1: undefined,
          ref2: undefined,
          notes: '',
          promotion: -1,
          entersVoice: false,
          inaraLink: undefined,
          email: undefined,
        });
      }
    } else {
      console.log('no values given');
      reset({
        _id: undefined,
        cmdrName: undefined,
        discordName: undefined,
        joinDate: undefined,
        discordJoinDate: undefined,
        platform: undefined,
        rank: Rank.Cadet,
        isInInaraSquad: false,
        region: undefined,
        ref1: undefined,
        ref2: undefined,
        notes: '',
        promotion: -1,
        entersVoice: false,
        inaraLink: undefined,
        email: undefined,
      });
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IMember> = (data: IMember) => {
    if (values.length > 1) {
      const multiCmdrUpdate: IMember = {
        cmdrName: undefined,
        discordName: undefined,
        joinDate: data.joinDate,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: data.rank,
        isInInaraSquad: data.isInInaraSquad,
        region: data.region,
        ref1: undefined,
        ref2: undefined,
        notes: '',
        promotion: data.promotion,
        entersVoice: data.entersVoice,
        inaraLink: undefined,
        email: undefined,
      };
      onClose(multiCmdrUpdate);
    } else {
      const singleCmdrUpdate: IMember = {
        cmdrName: data.cmdrName,
        discordName: data.discordName,
        joinDate: data.joinDate,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: data.rank,
        isInInaraSquad: data.isInInaraSquad,
        region: data.region,
        ref1: data.ref1,
        ref2: data.ref2,
        notes: data.notes,
        promotion: data.promotion,
        entersVoice: data.entersVoice,
        inaraLink: data.inaraLink,
        email: data.email,
      };
      onClose(singleCmdrUpdate);
    }
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
