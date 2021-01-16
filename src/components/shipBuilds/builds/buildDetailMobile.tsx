import {
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import { useLinks } from 'hooks/useLinks';
import { IBuildInfov2, IShipInfo, ShipSize } from 'models/shipBuilds';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import gfm from 'remark-gfm';
import { EngIcons } from './engIcons';
import { TagGroup } from './tagGroup';

const useStyles = makeStyles((theme) => ({
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

export const BuildDetailMobile = (props: {
  foundBuild: IBuildInfov2;
  shipInfo: IShipInfo | undefined;
}) => {
  const { blueprints } = useLinks();
  const { foundBuild, shipInfo } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.flexrow}>
        {shipInfo && (
          <img
            src={shipInfo!.shipImg}
            alt={shipInfo!.name}
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
      <TagGroup build={foundBuild!} />
      <EngIcons engLevel={foundBuild!.engLevel} />
      {foundBuild.description && (
        <ReactMarkdown
          plugins={[gfm]}
          renderers={{ paragraph: Typography, link: Link }}
          children={foundBuild.description}
        />
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
    </Paper>
  );
};
