import { Container, makeStyles, Typography } from '@material-ui/core';
import { PrimaryLayout } from './primary';
import { ReactNode } from 'react';
import { uscLinksList } from 'data/about';
import { AboutLinks } from 'components/about/links';

const useStyles = makeStyles(() => ({
  center: {
    textAlign: 'center',
  },
}));

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <PrimaryLayout>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.center}>
          About USC
        </Typography>
        <AboutLinks
          id="usc-links"
          key="usc-links"
          header="USC Links"
          buttons={uscLinksList}
        />
      </Container>
      {children}
    </PrimaryLayout>
  );
};
