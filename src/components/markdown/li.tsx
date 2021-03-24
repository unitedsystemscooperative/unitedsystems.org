import { ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  li: { marginBottom: theme.spacing(2) },
}));
export const Li = (props) => {
  const classes = useStyles();
  return <ListItemText inset className={classes.li} {...props} />;
};
