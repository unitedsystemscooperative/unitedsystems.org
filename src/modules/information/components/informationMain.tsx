import { useInfoButtons } from '@/hooks/useInfoButtons';
import { InfoSection } from '~/information/components/infoSection';
import { Box, Button, Container, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { MutableRefObject, useRef } from 'react';

export const InformationMain = () => {
  const { toolsList, docsList, guidesList, odysseyList } = useInfoButtons();
  const odysseyRef = useRef<HTMLDivElement | null>(null);
  const guidesRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const docsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const handleScroll = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
          <Button variant="outlined" onClick={() => handleScroll(odysseyRef)} title="odyssey">
            Odyssey
          </Button>
          <Button variant="outlined" onClick={() => handleScroll(guidesRef)} title="guides">
            Guides
          </Button>
          <Button variant="outlined" onClick={() => handleScroll(toolsRef)} title="tools">
            Tools
          </Button>
          <Button variant="outlined" onClick={() => handleScroll(docsRef)} title="docs">
            Documentation
          </Button>
        </Paper>
      )}
      <div ref={odysseyRef}>
        <InfoSection id="odyssey" key="odyssey" header="Odyssey" buttons={odysseyList} />
      </div>
      <div ref={guidesRef}>
        <InfoSection id="guides" key="guides" header="Guides" buttons={guidesList} />
      </div>
      <div ref={toolsRef}>
        <InfoSection id="tools" key="tools" header="Tools" buttons={toolsList} />
      </div>
      <div ref={docsRef}>
        <InfoSection id="docs" key="docs" header="Documentation" buttons={docsList} />
      </div>
    </Container>
  );
};
