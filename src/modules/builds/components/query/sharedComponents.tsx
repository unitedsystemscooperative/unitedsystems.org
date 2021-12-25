import { Paper, styled, Typography } from '@mui/material';

export const QuerySection = styled(Paper)(({ theme }) => ({
  width: '100%',
  minWidth: '90%',
  height: '100%',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'grey',
  padding: '5px',
  borderRadius: '15px',
  margin: 'auto',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const QuerySectionHeader = styled('h3')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

export const QueryExplanation = styled(Typography)(() => ({
  color: 'grey.400',
}));
