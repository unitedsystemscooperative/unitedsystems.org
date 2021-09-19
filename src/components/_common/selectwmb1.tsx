import { Select, SelectProps, styled } from '@mui/material';

/**
 * Select with 1 spacing on Bottom Margin
 */
export const SelectwMB1 = styled(Select)<SelectProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
