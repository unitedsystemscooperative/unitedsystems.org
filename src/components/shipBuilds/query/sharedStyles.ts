import { makeStyles } from '@material-ui/core';

export const useSharedStyles = makeStyles((theme) => ({
  querySection: {
    width: '90%',
    minWidth: '90%',
    height: '100%',
    border: '2px solid gray',
    padding: '5px',
    borderRadius: '15px',
    margin: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      width: '98%',
    },
  },
  querySectionheader: {
    marginTop: '5px',
    textAlign: 'center',
  },
  queryExplanationText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));
