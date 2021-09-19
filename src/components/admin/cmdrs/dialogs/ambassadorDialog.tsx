import { DatePicker } from '@mui/lab';
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
import { TextFieldwMB1 } from 'components/_common';
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
  const { register, handleSubmit, reset, control } = useForm<IAmbassador>();

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
          _id: undefined,
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

  return (
    <Dialog onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{values?.length > 0 ? 'Edit' : 'Add'} CMDR</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the CMDR information.
          </DialogContentText>
          {values?.length <= 1 && (
            <TextFieldwMB1
              name="cmdrName"
              inputRef={register({ required: true })}
              fullWidth
              label="CMDR Name"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwMB1
              name="discordName"
              inputRef={register({ required: true })}
              fullWidth
              label="Discord Handle - Format [name]#0000"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <Controller
              name="discordJoinDate"
              control={control}
              render={(field) => (
                <DatePicker
                  label="Discord Join Date"
                  disableFuture
                  mask="____-__-__"
                  {...field}
                  clearable
                  renderInput={(params) => <TextField {...params} />}
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
            <TextFieldwMB1
              name="notes"
              inputRef={register({ required: false })}
              fullWidth
              label="Notes"
              multiline
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwMB1
              name="groupRepresented"
              inputRef={register({ required: false })}
              fullWidth
              label="Group Represented"
              multiline
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwMB1
              name="inaraLink"
              inputRef={register({ required: false })}
              fullWidth
              label="Inara Link"
              disabled={values?.length > 1}
            />
          )}
          {values?.length <= 1 && (
            <TextFieldwMB1
              name="email"
              inputRef={register({ required: false })}
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
