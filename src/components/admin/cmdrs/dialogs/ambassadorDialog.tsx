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
import { DatePickerwMB1, TextFieldwM1 } from 'components/_common';
import { IAmbassador } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank } from 'models/admin/ranks';
import { Region, RegionString } from 'models/admin/regions';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface AmbassadorDialogProps {
  open: boolean;
  values: IAmbassador[];
  onClose: (value?: IAmbassador, membersToEdit?: IAmbassador[]) => void;
}

export const AmbassadorDialog = (props: AmbassadorDialogProps) => {
  const { open, values, onClose } = props;
  const { register, handleSubmit, reset, control } = useForm<
    Omit<IAmbassador, '_id'>
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
          rank: Rank.Ambassador,
          region: value.region,
          notes: value.notes,
          inaraLink: value.inaraLink,
          email: value.email,
          groupRepresented: value.groupRepresented,
        });
      } else {
        reset({
          cmdrName: undefined,
          discordName: undefined,
          discordJoinDate: null,
          platform: undefined,
          rank: Rank.Ambassador,
          region: undefined,
          notes: '',
          inaraLink: undefined,
          email: undefined,
          groupRepresented: undefined,
        });
      }
    } else {
      reset();
    }
  }, [values, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IAmbassador> = (data) => {
    if (values.length > 1) {
      const multiCmdrUpdate: IAmbassador = {
        cmdrName: undefined,
        discordName: undefined,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: Rank.Ambassador,
        region: data.region,
        notes: '',
        groupRepresented: data.groupRepresented,
        isCoalition: data.isCoalition,
        inaraLink: undefined,
        email: undefined,
      };
      onClose(multiCmdrUpdate, values);
    } else {
      const _id = values[0]?._id ? values[0]._id : undefined;
      const singleCmdrUpdate: IAmbassador = {
        _id,
        cmdrName: data.cmdrName,
        discordName: data.discordName,
        discordJoinDate: data.discordJoinDate,
        platform: data.platform,
        rank: Rank.Ambassador,
        region: data.region,
        notes: data.notes,
        groupRepresented: data.groupRepresented,
        isCoalition: data.isCoalition,
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
            <TextFieldwM1
              {...register('groupRepresented', { required: false })}
              fullWidth
              label="Group Represented"
              multiline
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
