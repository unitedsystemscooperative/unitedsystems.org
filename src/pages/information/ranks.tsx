import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts';
import BgsMarkdown from 'components/information/bgs.mdx';
import Head from 'next/head';
import { Ranks } from 'components/information/ranks/ranks';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const RanksPage = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>USC | Elite Ranks</title>
        <meta
          name="description"
          content="Pilot's Federation Ranks in Elite Dangerous"
        />
      </Head>
      <PrimaryLayout>
        <Ranks />
      </PrimaryLayout>
    </>
  );
};

export default RanksPage;
