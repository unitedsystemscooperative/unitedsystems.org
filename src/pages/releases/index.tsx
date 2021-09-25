import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { PrimaryLayout } from 'components/layouts';
import { getReleases } from 'functions/releases/getReleases';
import Head from 'next/head';
import Link from 'next/link';

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
      <PrimaryLayout>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
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

export default ReleaseIndexPage;
