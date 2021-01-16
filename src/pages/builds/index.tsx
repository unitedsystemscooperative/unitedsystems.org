import {
  Container,
  Fab,
  Fade,
  makeStyles,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useCallback, useRef, useState } from 'react';
import { BuildList } from 'components/shipBuilds/builds/buildList';
import { IQuery } from 'models/shipBuilds';
import { Query } from 'components/shipBuilds/query/query';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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

const QueryandBuildList = () => {
  const [query, setQuery] = useState<IQuery>();
  const buildRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  const handleQuery = useCallback((query: IQuery) => {
    setQuery(query);
  }, []);

  const handleFab = () => {
    if (buildRef.current) {
      buildRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fade in={true}>
      <Container maxWidth='xl' className={classes.root}>
        <Typography variant='h3' className={classes.header}>
          Ship Build Archive
        </Typography>
        <Query updateQuery={handleQuery} />
        <div ref={buildRef}>
          <BuildList buildQuery={query} />
        </div>
        <Slide direction='left' in={isMobile} timeout={1000}>
          <div className={classes.fab}>
            <Fab color='primary' className='fab' onClick={handleFab}>
              <ArrowDownwardIcon />
            </Fab>
          </div>
        </Slide>
      </Container>
    </Fade>
  );
};

export default QueryandBuildList;
