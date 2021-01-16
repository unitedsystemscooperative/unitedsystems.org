import {
  Button,
  Container,
  Fade,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Typography, Paper } from '@material-ui/core';
import { InfoSection } from './infoSection';
import { useInfoButtons } from 'hooks/useInfoButtons';
import { MutableRefObject, useRef } from 'react';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  specialButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
}));

/** Information Landing Component */
export const Information = () => {
  const classes = useStyles();
  const { toolsList, docsList, guidesList } = useInfoButtons();
  const guidesRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const docsRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleScroll = (ref: MutableRefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fade in={true}>
      <Container maxWidth="lg">
        <Typography variant="h3" className={classes.header}>
          Information Archive
        </Typography>

        <Paper className={classes.paper}>
          <Typography variant="subtitle1">
            New Players look to the{' '}
            <span className={classes.secondary}> blue buttons </span>for helpful
            tips in getting started with the Guides, Tools, and Documentation
            below.
          </Typography>
        </Paper>
        {isMobile && (
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">Scroll To:</Typography>
            <Button
              variant="outlined"
              onClick={() => handleScroll(guidesRef)}
              title="guides"
            >
              Guides
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleScroll(toolsRef)}
              title="tools"
            >
              Tools
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleScroll(docsRef)}
              title="docs"
            >
              Documentation
            </Button>
          </Paper>
        )}
        <div ref={guidesRef}>
          <InfoSection
            id="guides"
            key="guides"
            header="Guides"
            buttons={guidesList}
          />
        </div>
        <div ref={toolsRef}>
          <InfoSection
            id="tools"
            key="tools"
            header="Tools"
            buttons={toolsList}
          />
        </div>
        <div ref={docsRef}>
          <InfoSection
            id="docs"
            key="docs"
            header="Documentation"
            buttons={docsList}
          />
        </div>
      </Container>
    </Fade>
  );
};
