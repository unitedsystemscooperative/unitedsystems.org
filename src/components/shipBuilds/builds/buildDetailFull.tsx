import {
  Button,
  Divider,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { IBuildInfov2, IShipInfo, ShipSize } from 'models/shipBuilds';
import { TagGroup } from './tagGroup';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { useLinks } from 'hooks/useLinks';
import { EngIcons } from './engIcons';

const useStyles = makeStyles((theme) => ({
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
  },
  flexAcross: {
    display: 'flex',
    flexDirection: 'row',
    '& a': {
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

export const BuildDetailFull = (props: {
  foundBuild: IBuildInfov2;
  shipInfo: IShipInfo | undefined;
}) => {
  const classes = useStyles();
  const { blueprints } = useLinks();
  const { shipInfo, foundBuild } = props;

  return (
    <>
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
                href={foundBuild!.buildLink}
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
                <Button
                  variant="contained"
                  color="secondary"
                  to={`/builds/add?type=variant&refID=${
                    (foundBuild!._id as unknown) as string
                  }`}
                  component={NavLink}
                >
                  Add Variant
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  to={`/builds/add?type=related&refID=${
                    (foundBuild!._id as unknown) as string
                  }`}
                  component={NavLink}
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
            <Typography variant="h5">{foundBuild?.title}</Typography>
            <Typography>Author: {foundBuild?.author}</Typography>
            <EngIcons engLevel={foundBuild!.engLevel} />
            <TagGroup build={foundBuild!} />
            {foundBuild?.description && (
              <ReactMarkdown
                plugins={[gfm]}
                renderers={{ paragraph: Typography, link: Link }}
                children={foundBuild.description}
              />
            )}
          </div>
        </div>
      </Paper>
    </>
  );
};
