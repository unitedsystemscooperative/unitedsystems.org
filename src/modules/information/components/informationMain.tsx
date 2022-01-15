import { scrolltoRef } from '@/functions/scrolltoRef';
import { useInfoButtons } from '@/hooks/useInfoButtons';
import { Box, Button, Container, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { useRef } from 'react';
import { InfoSection } from '~/information/components/infoSection';

export const InformationMain = () => {
  const { toolsList, docsList, guidesList, odysseyList } = useInfoButtons();
  const odysseyRef = useRef<HTMLDivElement | null>(null);
  const guidesRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const docsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Information Archive
      </Typography>

      <Paper
        sx={{
          textAlign: 'center',
          padding: 1,
          marginBottom: 1,
          '& button': {
            margin: 1,
          },
        }}>
        <Typography variant="subtitle1">
          New Players look to the{' '}
          <Box component="span" sx={{ color: 'seconary.main' }}>
            blue buttons
          </Box>{' '}
          for helpful tips in getting started with the Guides, Tools, and Documentation below.
        </Typography>
      </Paper>
      {isMobile && (
        <Paper
          sx={{
            textAlign: 'center',
            padding: 1,
            marginBottom: 1,
            '& button': {
              margin: 1,
            },
          }}>
          <Typography variant="subtitle1">Scroll To:</Typography>
          <Button variant="outlined" onClick={() => scrolltoRef(odysseyRef)} title="odyssey">
            Odyssey
          </Button>
          <Button variant="outlined" onClick={() => scrolltoRef(guidesRef)} title="guides">
            Guides
          </Button>
          <Button variant="outlined" onClick={() => scrolltoRef(toolsRef)} title="tools">
            Tools
          </Button>
          <Button variant="outlined" onClick={() => scrolltoRef(docsRef)} title="docs">
            Documentation
          </Button>
        </Paper>
      )}
      <div ref={odysseyRef} data-testid="section-odyssey">
        <InfoSection id="odyssey" key="odyssey" header="Odyssey" buttons={odysseyList} />
      </div>
      <div ref={guidesRef} data-testid="section-guides">
        <InfoSection id="guides" key="guides" header="Guides" buttons={guidesList} />
      </div>
      <div ref={toolsRef} data-testid="section-tools">
        <InfoSection id="tools" key="tools" header="Tools" buttons={toolsList} />
      </div>
      <div ref={docsRef} data-testid="section-docs">
        <InfoSection id="docs" key="docs" header="Documentation" buttons={docsList} />
      </div>
    </Container>
  );
};
