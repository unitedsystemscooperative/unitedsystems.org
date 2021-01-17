import {
  Container,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts';
import { getReleases } from 'functions/releases/getReleases';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
}));

const ReleaseIndex = ({
  allReleases,
}: {
  allReleases: { id: string; title: string; date: string }[];
}) => {
  const classes = useStyles();
  return (
    <PrimaryLayout>
      <Container maxWidth='md'>
        <Typography variant='h4' className={classes.center}>
          Releases
        </Typography>
        <List component={Paper}>
          {allReleases.map(({ id, date, title }) => (
            <Link key={id} href={`/releases/${id}`} passHref>
              <ListItem button component='a'>
                <ListItemText>
                  {title} - {date}
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Container>
    </PrimaryLayout>
  );
};

export async function getStaticProps() {
  const allReleases = getReleases();
  return {
    props: {
      allReleases,
    },
  };
}

export default ReleaseIndex;
