import { styled } from '@mui/material';

export const IndentedDiv = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(3),
  '& p': {
    marginBottom: theme.spacing(2),
  },
}));
