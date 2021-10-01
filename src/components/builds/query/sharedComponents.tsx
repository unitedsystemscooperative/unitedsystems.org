import { styled, Typography } from '@mui/material';

export const QuerySection = styled('div')(({ theme }) => ({
  width: '90%',
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
  [theme.breakpoints.up('lg')]: {
    width: '98%',
  },
}));

export const QuerySectionHeader = styled('h3')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

export const QueryExplanation = ({ text }: { text: string }) => {
  return <Typography color="grey.400">{text}</Typography>;
};