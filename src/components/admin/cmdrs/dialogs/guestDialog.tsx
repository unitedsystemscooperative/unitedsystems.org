import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { IGuest } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank } from 'models/admin/ranks';
import { Referral, ReferralString } from 'models/admin/referrals';
import { Region, RegionString } from 'models/admin/regions';
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

export interface GuestDialogProps {
  open: boolean;
  values: IGuest[];
  onClose: (value?: IGuest, membersToEdit?: IGuest[]) => void;
}

export const GuestDialog = (props: GuestDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<IGuest>();

  useEffect(() => {
    if (values) {
      if (values.length === 1) {
        const value = values[0];
        reset({
          cmdrName: value.cmdrName,
          discordName: value.discordName,
          discordJoinDate: value.discordJoinDate ? value.discordJoinDate : null,
          platform: value.platform,
          rank: Rank.Guest,
          region: value.region,
          notes: value.notes,
          inaraLink: value.inaraLink,
          email: value.email,
          ref1: value.ref1,
          ref2: value.ref2,
        });
      } else {
        reset({
          _id: undefined,
          cmdrName: undefined,
          discordName: undefined,
          discordJoinDate: null,
          platform: undefined,
          rank: Rank.Guest,
          region: undefined,
          notes: '',
          inaraLink: undefined,
          email: undefined,
          ref1: undefined,
          ref2: undefined,
        });
      }
    } else {
      reset();
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IGuest> = (data) => {
    if (values.length > 1) {
      const multiCmdrUpdate: IGuest = {
        cmdrName: undefined,
        discordName: undefined,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: Rank.Guest,
        region: data.region,
        notes: '',
        inaraLink: undefined,
        email: undefined,
        ref1: data.ref1,
      };
      onClose(multiCmdrUpdate, values);
    } else {
      const _id = values[0]?._id ? values[0]._id : undefined;
      const singleCmdrUpdate: IGuest = {
        _id,
        cmdrName: data.cmdrName,
        discordName: data.discordName,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: Rank.Guest,
        region: data.region,
        notes: data.notes,
        inaraLink: data.inaraLink,
        email: data.email,
        ref1: data.ref1,
        ref2: data.ref2,
      };
      onClose(singleCmdrUpdate);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{values?.length > 0 ? 'Edit' : 'Add'} CMDR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the CMDR information.
          </DialogContentText>
          {values?.length <= 1 && (
            <TextField
              name="cmdrName"
              inputRef={register({ required: true })}
              fullWidth
              label="CMDR Name"
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextField
              name="discordName"
              inputRef={register({ required: true })}
              fullWidth
              label="Discord Handle - Format [name]#0000"
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <Controller
              name="discordJoinDate"
              control={control}
              render={(field) => (
                <KeyboardDatePicker
                  label="Discord Join Date"
                  autoOk
                  disableFuture
                  format="yyyy-MM-DD"
                  {...field}
                  clearable
                />
              )}
            />
          )}
          <FormControl fullWidth>
            <InputLabel>Platform</InputLabel>
            <Controller
              name="platform"
              control={control}
              as={
                <Select label="Platform" fullWidth>
                  <MenuItem value={Platform.PC}>PC</MenuItem>
                  <MenuItem value={Platform.Xbox}>Xbox</MenuItem>
                  <MenuItem value={Platform.PS}>PlayStation</MenuItem>
                </Select>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Controller
              name="region"
              control={control}
              as={
                <Select fullWidth>
                  <MenuItem value={Region.N_CAmerica}>
                    {RegionString[Region.N_CAmerica]}
                  </MenuItem>
                  <MenuItem value={Region.SAmerica}>
                    {RegionString[Region.SAmerica]}
                  </MenuItem>
                  <MenuItem value={Region.Europe_Africa}>
                    {RegionString[Region.Europe_Africa]}
                  </MenuItem>
                  <MenuItem value={Region.Asia}>
                    {RegionString[Region.Asia]}
                  </MenuItem>
                  <MenuItem value={Region.Asia_Pacific}>
                    {RegionString[Region.Asia_Pacific]}
                  </MenuItem>
                </Select>
              }
            />
          </FormControl>
          {values?.length <= 1 && (
            <FormControl fullWidth>
              <InputLabel>Reference</InputLabel>
              <Controller
                name="ref1"
                control={control}
                as={
                  <Select fullWidth>
                    <MenuItem value={Referral.Discord}>
                      {ReferralString[Referral.Discord]}
                    </MenuItem>
                    <MenuItem value={Referral.FB}>
                      {ReferralString[Referral.FB]}
                    </MenuItem>
                    <MenuItem value={Referral.Forums}>
                      {ReferralString[Referral.Forums]}
                    </MenuItem>
                    <MenuItem value={Referral.InGame}>
                      {ReferralString[Referral.InGame]}
                    </MenuItem>
                    <MenuItem value={Referral.Inara}>
                      {ReferralString[Referral.Inara]}
                    </MenuItem>
                    <MenuItem value={Referral.Player}>
                      {ReferralString[Referral.Player]}
                    </MenuItem>
                    <MenuItem value={Referral.Reddit}>
                      {ReferralString[Referral.Reddit]}
                    </MenuItem>
                    <MenuItem value={Referral.USI}>
                      {ReferralString[Referral.USI]}
                    </MenuItem>
                    <MenuItem value={Referral.Website}>
                      {ReferralString[Referral.Website]}
                    </MenuItem>
                  </Select>
                }
              />
            </FormControl>
          )}
          {values?.length <= 1 && (
            <TextField
              name="ref2"
              inputRef={register({ required: false })}
              fullWidth
              label="Referral Explanation"
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextField
              name="notes"
              inputRef={register({ required: false })}
              fullWidth
              label="Notes"
              multiline
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextField
              name="groupRepresented"
              inputRef={register({ required: false })}
              fullWidth
              label="Group Represented"
              multiline
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextField
              name="inaraLink"
              inputRef={register({ required: false })}
              fullWidth
              label="Inara Link"
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextField
              name="email"
              inputRef={register({ required: false })}
              fullWidth
              label="Email"
              className={classes.textField}
              disabled={values?.length > 1}
            />
          )}
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
