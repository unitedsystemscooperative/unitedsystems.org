import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Container, Fab, Link, Slide, Theme, Typography, useMediaQuery } from '@mui/material';
import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';
import { filterShipBuilds } from 'functions/builds';
import { IBuildInfov2, IQuery } from 'models/builds';
import { useSnackbar } from 'notistack';
import { BuildContext, BuildContextProvider } from 'providers/buildProvider';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BuildList } from './builds/buildList';
import { Query } from './query/query';

const BuildSystemDisplay = () => {
  const [query, setQuery] = useState<IQuery>();
  const [queriedBuilds, setQueriedBuilds] = useState<IBuildInfov2[]>([]);
  const { builds, buildError, areBuildsLoading, addBuild } = useContext(BuildContext);
  const { enqueueSnackbar } = useSnackbar();

  const buildRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const handleQuery = useCallback((query: IQuery) => {
    setQuery(query);
  }, []);

  const filterBuilds = useCallback(() => {
    if (areBuildsLoading || buildError) {
      return;
    }
    const filtered = filterShipBuilds(builds, query);
    setQueriedBuilds(filtered);
  }, [areBuildsLoading, builds, query, buildError]);

  useEffect(() => {
    if (areBuildsLoading) {
      return;
    }
    if (buildError) {
      enqueueSnackbar(`Failed to retrieve builds. ${buildError.message}`, {
        variant: 'error',
      });
    }
    filterBuilds();
  }, [areBuildsLoading, filterBuilds, buildError, enqueueSnackbar]);

  const handleAddBuild = () => {
    console.log('BuildSystem: Add clicked');
    addBuild();
  };

  const handleFab = () => {
    if (buildRef.current) {
      buildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BuildContextProvider>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          Ship Build Archive
        </Typography>
        <Query updateQuery={handleQuery} addBuild={handleAddBuild} />
        <div ref={buildRef}>
          <BuildList shipBuilds={queriedBuilds} />
        </div>
        <PaperP2>
          <CenteredTypography variant="subtitle2">
            Ship Images by{' '}
            <Link href="https://forums.frontier.co.uk/member.php/118579-Qohen-Leth">CMDR Qohen Leth</Link> via Copyright
            CC BY-NC-SA 4.0 (available on <Link href="https://edassets.org">edassets.org</Link>)
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
    </BuildContextProvider>
  );
};

export const BuildSystem = () => {
  return (
    <BuildContextProvider>
      <BuildSystemDisplay />
    </BuildContextProvider>
  );
};
