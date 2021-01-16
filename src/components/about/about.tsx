import { makeStyles, Typography, Fade, Container } from '@material-ui/core';
import { useInfoButtons } from 'hooks/useInfoButtons';
import { AboutLinks } from './aboutLinks';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
}));

export const About = () => {
  const classes = useStyles();
  const { uscLinksList } = useInfoButtons();
  return (
    <Fade in={true}>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.header}>
          About USC
        </Typography>
        <AboutLinks
          id="usc-links"
          key="usc-links"
          header="USC Links"
          buttons={uscLinksList}
        />
      </Container>
    </Fade>
  );
};
