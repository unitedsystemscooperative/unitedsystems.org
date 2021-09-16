import { ListItemText } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  li: { marginBottom: theme.spacing(2) },
}));
export const Li = (props) => {
  const classes = useStyles();
  return <ListItemText inset className={classes.li} {...props} />;
};
