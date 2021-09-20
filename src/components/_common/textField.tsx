import { styled, TextField, TextFieldProps } from '@mui/material';

/**
 * Text Field with 1 spacing on Margin Top/Bottom
 */
export const TextFieldwMB1 = styled(TextField)<TextFieldProps>(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
