import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box,
  Container,
  Fab,
  Link,
  Slide,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';
import { IQuery } from 'models/builds';
import { useCallback, useRef, useState } from 'react';
import { BuildList } from './builds/buildList';
import { Query } from './query/query';

export const BuildSystem = () => {
  const [query, setQuery] = useState<IQuery>();
  const [openDialog, setOpenDialog] = useState(false);
  const buildRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );

  const handleQuery = useCallback((query: IQuery) => {
    setQuery(query);
  }, []);

  const handleAddBuild = () => {
    console.log('BuildSystem: Add clicked');
    setOpenDialog(true);
  };

  const handleFab = () => {
    if (buildRef.current) {
      buildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Ship Build Archive
      </Typography>
      <Query updateQuery={handleQuery} addBuild={handleAddBuild} />
      <div ref={buildRef}>
        <BuildList
          buildQuery={query}
          buildDialog={openDialog}
          setBuildDialog={setOpenDialog}
        />
      </div>
      <PaperP2>
        <CenteredTypography variant="subtitle2">
          Ship Images by{' '}
          <Link href="https://forums.frontier.co.uk/member.php/118579-Qohen-Leth">
            CMDR Qohen Leth
          </Link>{' '}
          via Copyright CC BY-NC-SA 4.0 (available on{' '}
          <Link href="https://edassets.org">edassets.org</Link>)
        </CenteredTypography>
      </PaperP2>
      <Slide direction="left" in={isMobile} timeout={1000}>
        <Box sx={{ position: 'fixed', bottom: '5px', right: '10px' }}>
          <Fab color="primary" onClick={handleFab}>
            <ArrowDownwardIcon />
          </Fab>
        </Box>
      </Slide>
    </Container>
  );
};
