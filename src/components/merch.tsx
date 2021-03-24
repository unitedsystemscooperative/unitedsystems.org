import {
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useLinks } from 'hooks/useLinks';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(1),
  },
  img: {
    width: '100%',
  },
}));

export const Merch = () => {
  const classes = useStyles();
  const links = useLinks();
  return (
    <Container maxWidth="sm" className={classes.center}>
      <Typography variant="h3">USC Merch Store</Typography>
      <Paper className={classes.paper}>
        <Typography>
          Click the image or link below to open the merch store.
        </Typography>
        <a href={links.merch} target="_blank" rel="noreferrer">
          <img
            className={classes.img}
            src="/img/expansion.png"
            alt="expansion image"
          />
        </a>
        <Link href={links.merch} target="_blank">
          Go to the Merch Store
        </Link>
      </Paper>
    </Container>
  );
};
