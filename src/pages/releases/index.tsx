import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { getReleases } from 'functions/releases/getReleases';
import Head from 'next/head';
import NextLink from 'next/link';

const ReleaseIndexPage = ({
  allReleases,
}: {
  allReleases: { id: string; title: string; date: string }[];
}) => {
  return (
    <>
      <Head>
        <title>USC Website Releases</title>
        <meta name="description" content="USC Website Releases" />
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Releases
        </Typography>
        <List component={Paper}>
          {allReleases.map(({ id, date, title }) => (
            <NextLink key={id} href={`/releases/${id}`} passHref>
              <ListItem button component="a">
                <ListItemText>
                  {title} - {date}
                </ListItemText>
              </ListItem>
            </NextLink>
          ))}
        </List>
      </Container>
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

export default ReleaseIndexPage;
