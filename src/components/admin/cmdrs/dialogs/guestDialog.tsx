import { DatePicker } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { TextFieldwM1 } from 'components/_common';
import { IGuest } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank } from 'models/admin/ranks';
import { Referral, ReferralString } from 'models/admin/referrals';
import { Region, RegionString } from 'models/admin/regions';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface GuestDialogProps {
  open: boolean;
  values: IGuest[];
  onClose: (value?: IGuest, membersToEdit?: IGuest[]) => void;
}

export const GuestDialog = (props: GuestDialogProps) => {
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<
    Omit<IGuest, '_id'>
  >();

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
  // TODO: Add errors to required and schema validation

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{values?.length > 0 ? 'Edit' : 'Add'} CMDR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the CMDR information.
          </DialogContentText>
          {values?.length <= 1 && (
            <TextFieldwM1
              name="cmdrName"
              {...register('cmdrName', { required: true })}
              fullWidth
              label="CMDR Name"
              disabled={values?.length > 1}
            />
          )}
          {/* TODO: Enforce Discord Tag schema */}
          {values?.length <= 1 && (
            <TextFieldwM1
              name="discordName"
              {...register('discordName', { required: true })}
              fullWidth
              label="Discord Handle - Format [name]#0000"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <Controller
              name="discordJoinDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Discord Join Date"
                  disableFuture
                  mask="____-__-__"
                  {...field}
                  clearable
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          )}
          <Controller
            name="platform"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldwM1 label="Platform" select fullWidth {...field}>
                <MenuItem value={Platform.PC}>PC</MenuItem>
                <MenuItem value={Platform.Xbox}>Xbox</MenuItem>
                <MenuItem value={Platform.PS}>PlayStation</MenuItem>
              </TextFieldwM1>
            )}
          />
          <Controller
            name="region"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldwM1 label="Region" select {...field} fullWidth>
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
              </TextFieldwM1>
            )}
          />
          {values?.length <= 1 && (
            <Controller
              name="ref1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextFieldwM1 label="Reference" select {...field} fullWidth>
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
                </TextFieldwM1>
              )}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwM1
              {...register('ref2', { required: false })}
              fullWidth
              label="Referral Explanation"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwM1
              {...register('notes', { required: false })}
              fullWidth
              label="Notes"
              multiline
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwM1
              {...register('inaraLink', { required: false })}
              fullWidth
              label="Inara Link"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwM1
              {...register('email', { required: false })}
              fullWidth
              label="Email"
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
