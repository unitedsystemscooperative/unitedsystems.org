import { styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

/**
 * Date Picker with 1 spacing on Bottom Margin
 */
export const DatePickerwMB1 = styled(DatePicker)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
