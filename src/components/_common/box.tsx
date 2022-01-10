import { Box, BoxProps, styled } from '@mui/material';

/* istanbul ignore next */
/**
 * Box with 1 spacing on Bottom Margin
 */
export const BoxwMB1 = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

/* istanbul ignore next */
export const BoxwMB1andFlex = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}));
