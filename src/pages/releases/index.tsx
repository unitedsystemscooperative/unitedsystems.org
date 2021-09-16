import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PrimaryLayout } from 'components/layouts';
import { getReleases } from 'functions/releases/getReleases';
import Head from 'next/head';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
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
    <>
      <Head>
        <title>USC Website Releases</title>
        <meta name="description" content="USC Website Releases" />
      </Head>
      <PrimaryLayout>
        <Container maxWidth="md">
          <Typography variant="h4" className={classes.center}>
            Releases
          </Typography>
          <List component={Paper}>
            {allReleases.map(({ id, date, title }) => (
              <Link key={id} href={`/releases/${id}`} passHref>
                <ListItem button component="a">
                  <ListItemText>
                    {title} - {date}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </PrimaryLayout>
    </>
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
