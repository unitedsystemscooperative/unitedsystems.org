import { Container } from '@mui/material';
import { AboutLinks } from 'components/about/links';
import { CenteredTypography } from 'components/_common/typography';
import { uscLinksList } from 'data/about';
import { ReactNode } from 'react';

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container maxWidth="md">
        <CenteredTypography variant="h3">About USC</CenteredTypography>
        <AboutLinks
          id="usc-links"
          key="usc-links"
          header="USC Links"
          buttons={uscLinksList}
        />
      </Container>
      {children}
    </>
  );
};
