import { CenteredTypography } from '@/_components/_common/typography';
import { Box, Container, Paper, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { InfoButton } from '../_components/_common/button';
import { uscLinksList } from './uscLinksList';

const boxSXProps: SxProps = {
  '& button': {
    margin: 1,
  },
  '& a': {
    margin: 1,
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container maxWidth="md">
        <CenteredTypography variant="h3">About USC</CenteredTypography>
        <Container maxWidth="md">
          <Paper
            id="usc-links"
            sx={{
              textAlign: 'center',
              width: 'fit-content',
              margin: 'auto',
              padding: 1,
              marginBottom: 1,
            }}>
            <Box sx={{ display: 'grid', gridTemplateRows: 'auto' }}>
              <Box sx={boxSXProps}>
                {uscLinksList
                  .filter((x) => x.local === true)
                  .map((guide) => (
                    <InfoButton {...guide} color="secondary" key={guide.title} />
                  ))}
              </Box>
              <Box sx={boxSXProps}>
                {uscLinksList
                  .filter((x) => x.local === false)
                  .map((guide) => (
                    <InfoButton {...guide} color="primary" key={guide.title} />
                  ))}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Container>
      {children}
    </>
  );
}
