import { styled, TextField, TextFieldProps } from '@mui/material';

/**
 * Text Field with 1 spacing on Bottom Margin
 */
export const TextFieldwMB1 = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
