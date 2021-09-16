import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PrimaryLayout } from 'components/layouts';
import {
  getAllReleaseIDs,
  getReleaseData,
} from 'functions/releases/getReleases';
import NextLink from 'next/link';
import Head from 'next/head';
import React from 'react';
import { USCMarkdown } from 'components/uscmarkdown';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const Release = ({
  releaseData,
}: {
  releaseData: { id: string; content: string; title: string; date: string };
}) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{releaseData.title}</title>
        <meta name="description" content="Release of the website" />
      </Head>
      <PrimaryLayout>
        <Container maxWidth="lg" className={classes.root}>
          <NextLink href="/releases" passHref>
            <Button color="secondary" variant="contained">
              Return to Releases
            </Button>
          </NextLink>
          <Paper className={classes.paper}>
            <Typography variant="h4">{releaseData.title}</Typography>
            <Typography variant="subtitle1">{releaseData.date}</Typography>
            <Divider />
            <USCMarkdown>{releaseData.content}</USCMarkdown>
          </Paper>
        </Container>
      </PrimaryLayout>
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

export default Release;
