import { Container, Divider, Paper, Typography } from '@mui/material';
import { USCMarkdown } from 'components/uscmarkdown';
import { PaperOutlineButton } from 'components/_common/button';
import {
  getAllReleaseIDs,
  getReleaseData,
} from 'functions/releases/getReleases';
import Head from 'next/head';
import NextLink from 'next/link';

const ReleasePage = ({
  releaseData,
}: {
  releaseData: { id: string; content: string; title: string; date: string };
}) => {
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

export async function getStaticPaths() {
  const paths = getAllReleaseIDs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const releaseData = getReleaseData(params.id);
  return {
    props: {
      releaseData,
    },
  };
}

export default ReleasePage;
