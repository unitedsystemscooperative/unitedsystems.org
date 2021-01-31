import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts';
import BgsMarkdown from 'components/information/bgs.mdx';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const BGSInfo = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>BGS General Info</title>
        <meta
          name="description"
          content="Background Information (BGS) General Information"
        />
      </Head>
      <PrimaryLayout>
        <Container maxWidth="lg">
          <Typography variant="h4" className={classes.center}>
            Background Simulation (BGS) General Information
          </Typography>
          <Paper className={classes.paper}>
            <BgsMarkdown />
          </Paper>
        </Container>
      </PrimaryLayout>
    </>
  );
};

export default BGSInfo;
