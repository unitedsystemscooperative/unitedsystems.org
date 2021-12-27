import { Paper, styled } from '@mui/material';

/**
 * Paper Component with Padding Spacing 1
 */
export const PaperP1 = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

/**
 * Paper Component with Padding Spacing 2
 */
export const PaperP2 = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));
