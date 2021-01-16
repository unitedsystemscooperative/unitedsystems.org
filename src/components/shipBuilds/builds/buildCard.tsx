import {
  CardMedia,
  Divider,
  Typography,
  Button,
  CardContent,
  Card,
  Fade,
  makeStyles,
} from '@material-ui/core';
import { IBuildInfov2, ShipSize } from 'models/shipBuilds';
import { EngIcons } from './engIcons';
import { NavLink } from 'react-router-dom';
import { useShipIdfromMap } from 'hooks/shipBuilds/useShipMap';
import { TagGroup } from './tagGroup';
import { theme } from 'theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '400px',
    minWidth: '400px',
    margin: '5px',
  },
  content: {
    flexGrow: 1,
    flexBasis: 'auto',
    flexWrap: 'wrap',
  },
  media: {
    height: '100px',
    width: '100px',
    flexShrink: 0,
    margin: 'auto',
  },
  shipName: {
    display: 'flex',
  },
  spacer: {
    flexGrow: 1,
  },
  mediaAndActions: {
    marginLeft: theme.spacing(1),
  },
  actions: {
    display: 'grid',
    gridTemplateRows: 'auto',
    '& a': {
      minWidth: 121,
      marginBottom: theme.spacing(1),
    },
  },
});

export const BuildCard = (props: { shipBuild: IBuildInfov2 | undefined }) => {
  const { shipBuild } = props;
  const shipInfo = useShipIdfromMap(shipBuild?.shipId);
  const classes = useStyles();

  return shipBuild && shipInfo ? (
    <Fade in={true} timeout={500}>
      <Card variant="outlined" className={classes.root}>
        <div className={classes.mediaAndActions}>
          <CardMedia
            className={classes.media}
            image={shipInfo.shipImg}
            title={shipInfo.name}
          />
          <Typography>{ShipSize[shipInfo.size]}</Typography>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="secondary"
              href={shipBuild.buildLink}
              target="_blank"
            >
              View Build
            </Button>
            <Button
              to={`/builds/detail/${(shipBuild._id as unknown) as string}`}
              component={NavLink}
              color="primary"
              variant="contained"
            >
              More Details
            </Button>
          </div>
        </div>
        <CardContent className={classes.content}>
          <Typography>{shipBuild.title}</Typography>
          <Divider />
          <Typography>{shipInfo.name} </Typography>
          {shipInfo.requires && (
            <Typography>Requirement: {shipInfo.requires}</Typography>
          )}
          <TagGroup build={shipBuild} />
          <Divider />
          <EngIcons engLevel={shipBuild.engLevel} />
          <Divider />
          <Typography>Author: {shipBuild.author}</Typography>
          {shipBuild.variants.length > 0 ? (
            <Typography>Has Variants</Typography>
          ) : null}
          {shipBuild.related.length > 0 ? (
            <Typography>Has Related Builds</Typography>
          ) : null}
          <div className={classes.spacer} />
        </CardContent>
      </Card>
    </Fade>
  ) : null;
};
