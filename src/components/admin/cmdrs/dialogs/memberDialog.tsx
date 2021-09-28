import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  BoxwMB1andFlex,
  DatePickerwMB1,
  TextFieldwM1,
} from 'components/_common';
import { IMember } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank, RankString } from 'models/admin/ranks';
import { Referral, ReferralString } from 'models/admin/referrals';
import { Region, RegionString } from 'models/admin/regions';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface MemberDialogProps {
  open: boolean;
  values: IMember[];
  onClose: (value?: IMember, membersToEdit?: IMember[]) => void;
}

export const MemberDialog = (props: MemberDialogProps) => {
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<
    Omit<IMember, '_id'>
  >();

  useEffect(() => {
    if (values) {
      if (values.length === 1) {
        const value = values[0];
        if (value)
          reset({
            cmdrName: value.cmdrName,
            discordName: value.discordName,
            joinDate: value.joinDate ? value.joinDate : null,
            discordJoinDate: value.discordJoinDate
              ? value.discordJoinDate
              : null,
            platform: value.platform,
            rank: value.rank,
            isInInaraSquad: value.isInInaraSquad,
            region: value.region,
            ref1: value.ref1,
            ref2: value.ref2,
            notes: value.notes,
            promotion: value.promotion ?? -1,
            entersVoice: value.entersVoice,
            inaraLink: value.inaraLink,
            email: value.email,
          });
      } else {
        reset({
          cmdrName: undefined,
          discordName: undefined,
          joinDate: null,
          discordJoinDate: null,
          platform: undefined,
          rank: undefined,
          isInInaraSquad: false,
          region: undefined,
          ref1: undefined,
          ref2: undefined,
          notes: '',
          promotion: undefined,
          entersVoice: false,
          inaraLink: undefined,
          email: undefined,
        });
      }
    } else {
      reset();
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IMember> = (data) => {
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
      onClose(multiCmdrUpdate, values);
    } else {
      const _id = values[0]?._id ? values[0]._id : undefined;
      const singleCmdrUpdate: IMember = {
        _id,
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
              label="CMDR Name"
              fullWidth
              disabled={values?.length > 1}
              {...register('cmdrName', { required: true })}
            />
          )}
          {/* TODO: Enforce Discord Tag schema */}
          {values?.length <= 1 && (
            <TextFieldwM1
              label="Discord Handle - Format [name]#0000"
              fullWidth
              disabled={values?.length > 1}
              {...register('discordName', { required: true })}
            />
          )}
          {values?.length <= 1 && (
            <BoxwMB1andFlex>
              <Controller
                name="joinDate"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePickerwMB1
                    label="Join Date"
                    disableFuture
                    mask="____-__-__"
                    {...field}
                    clearable
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <Controller
                name="discordJoinDate"
                control={control}
                render={({ field }) => (
                  <DatePickerwMB1
                    label="Discord Join Date"
                    disableFuture
                    mask="____-__-__"
                    {...field}
                    clearable
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
            </BoxwMB1andFlex>
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
            name="rank"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextFieldwM1 label="Rank" select fullWidth {...field}>
                <MenuItem value={Rank.FleetAdmiral}>
                  {RankString[Rank.FleetAdmiral]}
                </MenuItem>
                <MenuItem value={Rank.ViceAdmiral}>
                  {RankString[Rank.ViceAdmiral]}
                </MenuItem>
                <MenuItem value={Rank.Commodore}>
                  {RankString[Rank.Commodore]}
                </MenuItem>
                <MenuItem value={Rank.Captain}>
                  {RankString[Rank.Captain]}
                </MenuItem>
                <MenuItem value={Rank.LtCommander}>
                  {RankString[Rank.LtCommander]}
                </MenuItem>
                <MenuItem value={Rank.Lieutenant}>
                  {RankString[Rank.Lieutenant]}
                </MenuItem>
                <MenuItem value={Rank.Ensign}>
                  {RankString[Rank.Ensign]}
                </MenuItem>
                <MenuItem value={Rank.Cadet}>{RankString[Rank.Cadet]}</MenuItem>
                <MenuItem value={Rank.Reserve}>
                  {RankString[Rank.Reserve]}
                </MenuItem>
              </TextFieldwM1>
            )}
          />
          <Controller
            name="promotion"
            control={control}
            render={({ field }) => (
              <TextFieldwM1 label="Promotion to" fullWidth select {...field}>
                <MenuItem value={-1}>None</MenuItem>
                <MenuItem value={Rank.FleetAdmiral}>
                  {RankString[Rank.FleetAdmiral]}
                </MenuItem>
                <MenuItem value={Rank.ViceAdmiral}>
                  {RankString[Rank.ViceAdmiral]}
                </MenuItem>
                <MenuItem value={Rank.Commodore}>
                  {RankString[Rank.Commodore]}
                </MenuItem>
                <MenuItem value={Rank.Captain}>
                  {RankString[Rank.Captain]}
                </MenuItem>
                <MenuItem value={Rank.LtCommander}>
                  {RankString[Rank.LtCommander]}
                </MenuItem>
                <MenuItem value={Rank.Lieutenant}>
                  {RankString[Rank.Lieutenant]}
                </MenuItem>
                <MenuItem value={Rank.Ensign}>
                  {RankString[Rank.Ensign]}
                </MenuItem>
                <MenuItem value={Rank.Cadet}>{RankString[Rank.Cadet]}</MenuItem>
                <MenuItem value={Rank.Reserve}>
                  {RankString[Rank.Reserve]}
                </MenuItem>
              </TextFieldwM1>
            )}
          />
          <BoxwMB1andFlex>
            <Controller
              name="isInInaraSquad"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Is In Inara Squad?"
                  labelPlacement="start"
                />
              )}
            />
            <Controller
              name="entersVoice"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Do they enter voice?"
                  labelPlacement="start"
                />
              )}
            />
          </BoxwMB1andFlex>
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
