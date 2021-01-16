import { useParams } from 'react-router-dom';
import { EDSpinner } from '@admiralfeb/react-components';
import { NotFound } from 'components';
import {
  Container,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { BuildDetailFull } from './buildDetailFull';
import { BuildDetailMobile } from './buildDetailMobile';
import { BuildDetailBuilds } from './buildDetailBuilds';
import { useShipBuildInfo } from 'hooks/shipBuilds/useShipBuildInfo';

interface RouteParams {
  id: string;
}

const useStyles = makeStyles({
  textCenter: {
    textAlign: 'center',
  },
});

export const BuildDetail = () => {
  let { id } = useParams<RouteParams>();
  const { loading, shipInfo, foundBuild } = useShipBuildInfo(id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

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
          <BuildDetailMobile foundBuild={foundBuild} shipInfo={shipInfo} />
        ) : (
          <BuildDetailFull foundBuild={foundBuild} shipInfo={shipInfo} />
        )
      ) : (
        <NotFound />
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
    </Container>
  );
};
