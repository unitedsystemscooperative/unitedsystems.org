'use client';
import { filterShipBuilds } from '@/app/builds/_functions';
import { IBuildInfov2, IQuery } from '@/app/builds/_models';
import { BuildContext, BuildContextProvider } from '@/app/builds/_providers/buildProvider';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Container, Fab, Slide, Theme, Typography, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BuildList } from './builds/buildList';
import { ShipImgAcknowledgement } from './builds/shipImgAcknowledgement';
import { Query } from './query/query';
import { IBuildContext } from '../_models/action-models';

const BuildSystemDisplay = () => {
  const [query, setQuery] = useState<IQuery>();
  const [queriedBuilds, setQueriedBuilds] = useState<IBuildInfov2[]>([]);
  const { builds, buildError, areBuildsLoading, addBuild } = useContext(
    BuildContext
  ) as IBuildContext;
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
    addBuild();
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
        <BuildList shipBuilds={queriedBuilds} />
      </div>
      <ShipImgAcknowledgement />
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

export const BuildSystem = ({ init }: { init?: IBuildInfov2[] }) => {
  return (
    <BuildContextProvider init={init}>
      <BuildSystemDisplay />
    </BuildContextProvider>
  );
};
