import { CenteredTypography } from '@/components/_common/typography';
import { Container } from '@mui/material';
import { ReactNode } from 'react';
import { uscLinksList } from '~/about/data';
import { AboutLinks } from '~/about/layouts/links';

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container maxWidth="md">
        <CenteredTypography variant="h3">About USC</CenteredTypography>
        <AboutLinks id="usc-links" key="usc-links" header="USC Links" buttons={uscLinksList} />
      </Container>
      {children}
    </>
  );
};
