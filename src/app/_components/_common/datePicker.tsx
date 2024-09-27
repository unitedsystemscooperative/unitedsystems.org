'use client';
import { DatePicker } from '@mui/x-date-pickers';
import type {} from '@mui/x-date-pickers/AdapterDayjs';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export type DatePickerwMB1Props<TField extends FieldValues> = {
  label: string;
  disableFuture?: boolean;
  field: ControllerRenderProps<TField>;
  clearable?: boolean;
};

export const DatePickerwMB1 = <TField extends FieldValues>(props: DatePickerwMB1Props<TField>) => {
  return (
    <DatePicker
      label={props.label}
      disableFuture={props.disableFuture}
      {...props.field}
      slotProps={{
        field: { clearable: props.clearable },
        textField: { fullWidth: true, ...props.field },
      }}
      sx={{
        my: 1,
      }}
    />
  );
};

/**
 * Date Picker with 1 spacing on Bottom Margin
 */
// export const DatePickerwMB1 = styled<DatePickerProps<Dayjs>>(DatePicker)(({ theme }) => ({
//   marginTop: theme.spacing(1),
//   marginBottom: theme.spacing(1),
// }));
