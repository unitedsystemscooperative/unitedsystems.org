import { Container, makeStyles, Typography } from '@material-ui/core';
import { AboutLinks } from 'components/about/links';
import { PrimaryLayout } from 'components/layouts/primary';
import { useInfoButtons } from 'hooks/useInfoButtons';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
}));
export default function About() {
  const classes = useStyles();
  const { uscLinksList } = useInfoButtons();
  return (
    <PrimaryLayout>
      <Container maxWidth='md'>
        <Typography variant='h3' className={classes.header}>
          About USC
        </Typography>
        <AboutLinks
          id='usc-links'
          key='usc-links'
          header='USC Links'
          buttons={uscLinksList}
        />
      </Container>
    </PrimaryLayout>
  );
}
