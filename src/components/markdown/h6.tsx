import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  header: { paddingTop: theme.spacing(1) },
}));

export const H6 = (props) => {
  const classes = useStyles();
  return <Typography variant="h6" className={classes.header} {...props} />;
};
