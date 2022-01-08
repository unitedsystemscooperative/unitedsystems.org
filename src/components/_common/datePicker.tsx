import { DatePicker, DatePickerProps } from '@mui/lab';
import { styled } from '@mui/material';

/**
 * Date Picker with 1 spacing on Bottom Margin
 */
export const DatePickerwMB1 = styled(DatePicker)<DatePickerProps>(
  ({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  })
);
