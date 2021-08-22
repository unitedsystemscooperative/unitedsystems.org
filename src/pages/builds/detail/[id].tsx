import { EDSpinner } from '@admiralfeb/react-components';
import {
  Container,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { BuildDetailFull } from 'components/builds/builds/buildDetailFull';
import { BuildDetailMobile } from 'components/builds/builds/buildDetailMobile';
import { BuildDetailBuilds } from 'components/builds/builds/buildDetailBuilds';
import { useShipBuildInfo } from 'hooks/builds/useShipBuildInfo';
import { useRouter } from 'next/router';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

const useStyles = makeStyles({
  textCenter: {
    textAlign: 'center',
  },
});

export const BuildDetail = () => {
  const id = useRouter().asPath.substring(
    useRouter().asPath.lastIndexOf('/') + 1
  );
  const { loading, shipInfo, foundBuild } = useShipBuildInfo(id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <>
      <Head>
        <title>USC Build</title>
        <meta name="description" content="USC Build Detail" />
      </Head>
      <PrimaryLayout>
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
        </Container>
      </PrimaryLayout>
    </>
  );
};

export default BuildDetail;
