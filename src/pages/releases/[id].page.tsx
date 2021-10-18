import { Container, Divider, Paper, Typography } from '@mui/material';
import { USCMarkdown } from 'components/uscmarkdown';
import { PaperOutlineButton } from 'components/_common/button';
import { getAllReleaseIDs, getReleaseData } from 'functions/releases/getReleases';
import { ReleaseInfo } from 'models/releaseInfo';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const ReleasePage = ({ releaseData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{releaseData.title}</title>
        <meta name="description" content="Release of the website" />
      </Head>
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        <NextLink href="/releases" passHref>
          <PaperOutlineButton color="secondary" variant="outlined">
            Return to Releases
          </PaperOutlineButton>
        </NextLink>
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <Typography variant="h4">{releaseData.title}</Typography>
          <Typography variant="subtitle1">{releaseData.date}</Typography>
          <Divider />
          <USCMarkdown>{releaseData.content}</USCMarkdown>
        </Paper>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths =  () => {
  const paths = getAllReleaseIDs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ releaseData: ReleaseInfo }> = ({ params }) => {
  const releaseData = getReleaseData(params.id as string);
  return {
    props: {
      releaseData,
    },
  };
};

export default ReleasePage;
