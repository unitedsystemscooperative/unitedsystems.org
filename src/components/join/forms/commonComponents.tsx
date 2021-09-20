import { styled } from '@mui/material';

export const QuestionBox = styled('div')(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 5,
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1),
}));
