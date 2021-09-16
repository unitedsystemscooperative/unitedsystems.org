import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useShipBuildInfo } from 'hooks/builds/useShipBuildInfo';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { useLinks } from 'hooks/useLinks';
import { IBuildInfov2, IShipInfo, ShipSize } from 'models/builds';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { BuildDialog, BuildDialogProps } from '../dialog/buildDialog';
import { BuildCard } from './buildCard';
import { EngIcons } from './engIcons';
import { TagGroup } from './tagGroup';

const useDetailStyles = makeStyles(() => ({
  paper: {
    marginBottom: 5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
}));
const BuildDetailBuilds = (props: { title: string; buildIDs: string[] }) => {
  const { title, buildIDs } = props;
  const classes = useDetailStyles();
  const { loading, shipBuilds } = useShipBuilds();

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <div className={classes.textCenter}>
      <Typography variant="h4">{title}</Typography>
      <div className={classes.paper}>
        {buildIDs.map((id) => {
          const build = shipBuilds.find(
            (x: { _id: unknown }) => ((x._id as unknown) as string) === id
          );
          return <BuildCard shipBuild={build} key={id} />;
        })}
      </div>
    </div>
  );
};

const useFullStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  img: {
    width: 300,
  },
  buttonGrid: {
    display: 'grid',
    gridTemplate: '1fr 1fr / 1fr 1fr',
  },
  flexDown: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      margin: theme.spacing(1),
    },
    '& button': {
      margin: theme.spacing(1),
    },
  },
  flexAcross: {
    display: 'flex',
    flexDirection: 'row',
    '& a': {
      flexGrow: 1,
    },
    '& button': {
      flexGrow: 1,
    },
  },
  spacer: {
    flexGrow: 1,
  },
  gridDown: {
    display: 'grid',
    gridTemplate: 'auto / 1fr',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textCenter: {
    textAlign: 'center',
  },
}));
const BuildDetailFull = (props: {
  foundBuild: IBuildInfov2;
  shipInfo: IShipInfo | undefined;
  addBuild: (addType: 'variant' | 'related', refId: string) => void;
}) => {
  const classes = useFullStyles();
  const { blueprints } = useLinks();
  const { shipInfo, foundBuild, addBuild } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.flexAcross}>
        {shipInfo && (
          <div className={`${classes.flexDown} ${classes.margin}`}>
            <img
              src={shipInfo.shipImg}
              alt={shipInfo.name}
              className={classes.img}
            />
            <div className={classes.flexAcross}>
              <Typography>{shipInfo.name}</Typography>
              <span className={classes.spacer} />
              <Typography>{ShipSize[shipInfo.size]}</Typography>
            </div>
            {shipInfo.requires && (
              <Typography>Requires: {shipInfo.requires}</Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              href={foundBuild.buildLink}
              target="_blank"
            >
              Show Build
            </Button>
            <div className={classes.buttonGrid}>
              <Button
                variant="contained"
                color="secondary"
                href={shipInfo.shipReview}
                target="_blank"
              >
                {`Pilot's Review`}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href={`${blueprints}?s=${shipInfo.blueprint}`}
                target="_blank"
              >
                Ship Anatomy
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addBuild('variant', foundBuild._id.toString())}
              >
                Add Variant
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addBuild('related', foundBuild._id.toString())}
              >
                Add Related
              </Button>
            </div>
          </div>
        )}
        <Divider orientation="vertical" flexItem />
        <div
          className={`${classes.flexDown} ${classes.spacer} ${classes.margin}`}
        >
          <Typography variant="h5">{foundBuild.title}</Typography>
          <Typography>Author: {foundBuild.author}</Typography>
          <EngIcons engLevel={foundBuild.engLevel} />
          <TagGroup build={foundBuild} />
          {foundBuild.description && (
            <ReactMarkdown
              plugins={[gfm]}
              renderers={{ paragraph: Typography, link: Link }}
            >
              {foundBuild.description}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </Paper>
  );
};

const useMobileStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    width: 150,
    flexShrink: 0,
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonGrid: {
    display: 'grid',
    gridTemplate: '1fr 1fr / 1fr 1fr',
    gap: 5,
    padding: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
}));
const BuildDetailMobile = (props: {
  foundBuild: IBuildInfov2;
  shipInfo: IShipInfo | undefined;
  addBuild: (addType: 'variant' | 'related', refId: string) => void;
}) => {
  const { blueprints } = useLinks();
  const { foundBuild, shipInfo, addBuild } = props;
  const classes = useMobileStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.flexrow}>
        {shipInfo && (
          <img
            src={shipInfo.shipImg}
            alt={shipInfo.name}
            className={classes.img}
          />
        )}
        <div>
          <Typography variant="h5">{foundBuild.title}</Typography>
          <Typography>Author: {foundBuild.author}</Typography>
          <div className={classes.flexrow}>
            {shipInfo && (
              <>
                <Typography>{shipInfo.name}</Typography>
                <div className={classes.spacer} />
                <Typography>{ShipSize[shipInfo.size]}</Typography>
              </>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        href={foundBuild.buildLink}
        target="_blank"
      >
        Show Build
      </Button>
      <Divider style={{ marginTop: '10px' }} />
      <TagGroup build={foundBuild} />
      <EngIcons engLevel={foundBuild.engLevel} />
      {foundBuild.description && (
        <ReactMarkdown
          plugins={[gfm]}
          renderers={{ paragraph: Typography, link: Link }}
        >
          {foundBuild.description}
        </ReactMarkdown>
      )}
      <div className={classes.buttonGrid}>
        {shipInfo && (
          <>
            <Button
              variant="contained"
              color="secondary"
              href={shipInfo.shipReview}
              target="_blank"
            >
              Pilot's Review
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href={`${blueprints}?s=${shipInfo.blueprint}`}
              target="_blank"
            >
              Ship Anatomy
            </Button>
          </>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={() => addBuild('variant', foundBuild._id.toString())}
        >
          Add Variant
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => addBuild('related', foundBuild._id.toString())}
        >
          Add Related
        </Button>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles({
  textCenter: {
    textAlign: 'center',
  },
});
export const BuildDetail = () => {
  const id = useRouter().asPath.substring(
    useRouter().asPath.lastIndexOf('/') + 1
  );
  console.log(id);
  const { loading, shipInfo, foundBuild } = useShipBuildInfo(id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles();

  const handleAddBuild = (addType: 'variant' | 'related', refId: string) => {
    console.log('add build');

    setDialogProps((prev) => ({ ...prev, open: true, addType, refId }));
  };
  const handleAddClose = () => {
    setDialogProps((prev) => ({ ...prev, open: false }));
  };
  const [dialogProps, setDialogProps] = useState<BuildDialogProps>({
    open: false,
    onClose: handleAddClose,
  });

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" className={classes.textCenter}>
        Build Detail
      </Typography>
      {foundBuild ? (
        isMobile ? (
          <BuildDetailMobile
            foundBuild={foundBuild}
            shipInfo={shipInfo}
            addBuild={handleAddBuild}
          />
        ) : (
          <BuildDetailFull
            foundBuild={foundBuild}
            shipInfo={shipInfo}
            addBuild={handleAddBuild}
          />
        )
      ) : (
        <></>
      )}
      {foundBuild && foundBuild.variants.length > 0 ? (
        <BuildDetailBuilds
          title="Build Variants"
          buildIDs={foundBuild.variants}
        />
      ) : null}
      {foundBuild && foundBuild.related.length > 0 ? (
        <BuildDetailBuilds
          title="Related Builds"
          buildIDs={foundBuild.related}
        />
      ) : null}
      <BuildDialog {...dialogProps} />
    </Container>
  );
};
