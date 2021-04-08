import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { IMember } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank, RankString } from 'models/admin/ranks';
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

export interface MemberDialogProps {
  open: boolean;
  values?: IMember[];
  onClose: (value?: IMember, membersToEdit?: IMember[]) => void;
}

export const MemberDialog = (props: MemberDialogProps) => {
  const classes = useStyles();
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<IMember>();

  useEffect(() => {
    if (values) {
      if (values.length === 1) {
        reset(values[0]);
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
      reset();
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IMember> = (data) => {
    console.log(data);
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
      // onClose(multiCmdrUpdate, values);
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
      // onClose(singleCmdrUpdate);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{values ? 'Edit' : 'Add'} CMDR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the CMDR information.
          </DialogContentText>
          <TextField
            name="cmdrName"
            inputRef={register({ required: true })}
            fullWidth
            label="CMDR Name"
            className={classes.textField}
            disabled={values?.length > 1}
          />
          <TextField
            name="discordName"
            inputRef={register({ required: true })}
            fullWidth
            label="Discord Handle - Format [name]#0000"
            className={classes.textField}
            disabled={values?.length > 1}
          />
          <Controller
            name="joinDate"
            control={control}
            render={(field) => (
              <KeyboardDatePicker
                label="Join Date"
                autoOk
                disableFuture
                format="yyyy-MM-DD"
                {...field}
              />
            )}
          />
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
          <Controller
            name="platform"
            control={control}
            as={
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select label="Platform" fullWidth>
                  <MenuItem value={Platform.PC}>PC</MenuItem>
                  <MenuItem value={Platform.Xbox}>Xbox</MenuItem>
                  <MenuItem value={Platform.PS}>PlayStation</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <Controller
            name="rank"
            control={control}
            as={
              <FormControl fullWidth>
                <InputLabel>Rank</InputLabel>
                <Select fullWidth>
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
                  <MenuItem value={Rank.Cadet}>
                    {RankString[Rank.Cadet]}
                  </MenuItem>
                  <MenuItem value={Rank.Reserve}>
                    {RankString[Rank.Reserve]}
                  </MenuItem>
                </Select>
              </FormControl>
            }
          />
          <Controller
            name="promotion"
            control={control}
            as={
              <FormControl fullWidth>
                <InputLabel>Promotion</InputLabel>
                <Select fullWidth>
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
                  <MenuItem value={Rank.Cadet}>
                    {RankString[Rank.Cadet]}
                  </MenuItem>
                  <MenuItem value={Rank.Reserve}>
                    {RankString[Rank.Reserve]}
                  </MenuItem>
                </Select>
              </FormControl>
            }
          />
          <Controller
            name="isInInaraSquad"
            control={control}
            render={(field) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
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
            render={(field) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                }
                label="Do they enter voice?"
                labelPlacement="start"
              />
            )}
          />
          <Controller
            name="region"
            control={control}
            as={
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
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
              </FormControl>
            }
          />
          <Controller
            name="ref1"
            control={control}
            as={
              <FormControl fullWidth>
                <InputLabel>Reference</InputLabel>
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
              </FormControl>
            }
          />
          <TextField
            name="ref2"
            inputRef={register({ required: false })}
            fullWidth
            label="Referral Explanation"
            className={classes.textField}
            disabled={values?.length > 1}
          />
          <TextField
            name="notes"
            inputRef={register({ required: false })}
            fullWidth
            label="notes"
            multiline
            className={classes.textField}
            disabled={values?.length > 1}
          />

          <TextField
            name="inaraLink"
            inputRef={register({ required: false })}
            fullWidth
            label="Inara Link"
            className={classes.textField}
            disabled={values?.length > 1}
          />
          <TextField
            name="email"
            inputRef={register({ required: false })}
            fullWidth
            label="Email"
            className={classes.textField}
            disabled={values?.length > 1}
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
