import { Container, Fade, Paper, Typography } from '@mui/material';
import { styled } from '@material-ui/core/styles';
import makeStyles from '@mui/styles/makeStyles';
// import { useDownloadLink } from 'hooks/useDownloadLink';
import {
  lore,
  latin,
  latinTranslation,
  // videoID,
  // videoPosterID,
} from 'data/home';

const PREFIX = 'Home';

const classes = {
  root: `${PREFIX}-root`,
  header: `${PREFIX}-header`,
  paper: `${PREFIX}-paper`,
  motto: `${PREFIX}-motto`,
  latin: `${PREFIX}-latin`,
  subtitle: `${PREFIX}-subtitle`,
  video: `${PREFIX}-video`,
  lore: `${PREFIX}-lore`
};

const StyledFade = styled(Fade)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {},

  [`& .${classes.header}`]: {
    textAlign: 'center',
  },

  [`& .${classes.paper}`]: {
    textAlign: 'center',
    padding: theme.spacing(1),
  },

  [`& .${classes.motto}`]: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    border: '1px solid white',
    borderRadius: 10,
    width: 350,
    margin: 'auto',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  [`& .${classes.latin}`]: {
    fontFamily: 'Cinzel, serif',
    fontSize: 32,
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
  },

  [`& .${classes.subtitle}`]: {
    flex: '0 0',
  },

  [`& .${classes.video}`]: {
    width: '100%',
    padding: 0,
    objectFit: 'scale-down',
    maxHeight: 700,
  },

  [`& .${classes.lore}`]: {
    marginBottom: theme.spacing(1),
  }
}));

export const Home = () => {

  // const { getDownloadLink } = useDownloadLink();
  return (
    <StyledFade in={true}>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h3" className={classes.header}>
          United Systems Cooperative
        </Typography>
        <Paper className={classes.paper}>
          <Typography className={classes.lore}>{lore}</Typography>
          <div className={classes.motto}>
            <Typography className={classes.latin} variant="h4">
              {latin}
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
              {latinTranslation}
            </Typography>
          </div>
          {/* <video
            controls
            className={classes.video}
            poster={getDownloadLink(videoPosterID)}
            controlsList="nodownload"
          >
            <source src={getDownloadLink(videoID)} type="video/mp4" />
            "Your browser does not support this video"
          </video> */}
          <img className={classes.video} src="/uscLogo.png" />
        </Paper>
      </Container>
    </StyledFade>
  );
};
