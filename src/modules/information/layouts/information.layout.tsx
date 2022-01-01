import { CenteredTypography } from '@/components/_common';
import { Container } from '@mui/material';
import { ReactNode } from 'react';
import { InformationLinks } from './links';

export const InformationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Container maxWidth="md">
        <CenteredTypography variant="h3">About USC</CenteredTypography>
        {/* <InformationLinks id="usc-links" header="USC Links" buttons={uscLinksList} /> */}
      </Container>
      {children}
    </>
  );
};
