import { makeStyles, Paper, Typography, Container } from '@material-ui/core';
import { PrimaryLayout } from 'components/layouts/primary';
import { useDownloadLink } from 'hooks/useDownloadLink';
import {
  lore,
  latin,
  latinTranslation,
  videoID,
  videoPosterID,
} from 'data/home';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  motto: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    border: '1px solid white',
    borderRadius: 10,
    width: 350,
    margin: 'auto',
    marginBottom: 10,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  latin: {
    fontFamily: 'Cinzel, serif',
    fontSize: 32,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  subtitle: {
    flex: '0 0',
  },
  video: {
    width: '100%',
    padding: 0,
  },
  lore: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  const { getDownloadLink } = useDownloadLink();

  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta
          name='description'
          content='Web site of the United Systems Cooperative'
        />
      </Head>
      <PrimaryLayout>
        <Container maxWidth='lg'>
          <Typography component='h1' variant='h3' className={classes.header}>
            United Systems Cooperative
          </Typography>
          <Paper className={classes.paper}>
            <Typography className={classes.lore}>{lore}</Typography>
            <div className={classes.motto}>
              <Typography className={classes.latin} variant='h4'>
                {latin}
              </Typography>
              <Typography variant='subtitle2' className={classes.subtitle}>
                {latinTranslation}
              </Typography>
            </div>
            <video
              controls
              className={classes.video}
              poster={getDownloadLink(videoPosterID)}
              controlsList='nodownload'>
              <source src={getDownloadLink(videoID)} type='video/mp4' />
              "Your browser does not support this video"
            </video>
          </Paper>
        </Container>
      </PrimaryLayout>
    </>
  );
}
