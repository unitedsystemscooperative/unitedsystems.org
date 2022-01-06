import { getReleases } from '~/releases/getReleases';
import { ReleaseInfo } from '~/releases/releaseInfo';
import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const ReleaseIndexPage = ({ allReleases }: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<{
  allReleases: Omit<ReleaseInfo, 'content'>[];
}> = () => {
  const allReleases = getReleases();
  return {
    props: {
      allReleases,
    },
  };
};

export default ReleaseIndexPage;
