import {
  Container,
  Fab,
  makeStyles,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IQuery } from 'models/builds';
import { useCallback, useRef, useState } from 'react';
import { BuildList } from './builds/buildList';
import { BuildDialog } from './dialog/buildDialog';
import { Query } from './query/query';

const useStyles = makeStyles({
  root: {
    '& p': {
      textAlign: 'center',
    },
  },
  header: { textAlign: 'center' },
  fab: {
    position: 'fixed',
    bottom: '5px',
    right: '10px',
  },
});

export const BuildSystem = () => {
  const [query, setQuery] = useState<IQuery>();
  const [openDialog, setOpenDialog] = useState(false);
  const buildRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  const handleQuery = useCallback((query: IQuery) => {
    setQuery(query);
  }, []);

  const handleAddBuild = () => {
    console.log('BuildSystem: Add clicked');
    setOpenDialog(true);
  };
  const handleAddClose = () => setOpenDialog(false);

  const handleFab = () => {
    if (buildRef.current) {
      buildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h3" className={classes.header}>
        Ship Build Archive
      </Typography>
      <Query updateQuery={handleQuery} addBuild={handleAddBuild} />
      <div ref={buildRef}>
        <BuildList buildQuery={query} />
      </div>
      <Slide direction="left" in={isMobile} timeout={1000}>
        <div className={classes.fab}>
          <Fab color="primary" className="fab" onClick={handleFab}>
            <ArrowDownwardIcon />
          </Fab>
        </div>
      </Slide>
      <BuildDialog open={openDialog} onClose={handleAddClose} />
    </Container>
  );
};
