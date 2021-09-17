import { Container, Typography } from '@mui/material';
import { AboutLinks } from 'components/about/links';
import { uscLinksList } from 'data/about';
import { ReactNode } from 'react';
import { PrimaryLayout } from './primary';

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PrimaryLayout>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
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
