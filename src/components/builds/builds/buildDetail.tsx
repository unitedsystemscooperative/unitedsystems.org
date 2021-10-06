import { EDSpinner } from '@admiralfeb/react-components';
import { Box, Button, Container, Divider, Link, Paper, styled, Theme, Typography, useMediaQuery } from '@mui/material';
import { USCMarkdown } from 'components/uscmarkdown';
import { BoxwMB1 } from 'components/_common';
import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';
import { useShipBuildInfo } from 'hooks/builds/useShipBuildInfo';
import { useLinks } from 'hooks/useLinks';
import { IBuildInfov2, IShipInfo, ShipSize } from 'models/builds';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AddBuildFunction, BuildContext } from 'providers/buildProvider';
import { useContext } from 'react';
import { BuildCard } from './buildCard';
import { EngIcons } from './engIcons';
import { TagGroup } from './tagGroup';

const BuildDetailBuilds = ({ title, buildIDs }: { title: string; buildIDs: string[] }) => {
  const { areBuildsLoading, builds } = useContext(BuildContext);

  if (areBuildsLoading) {
    return <EDSpinner />;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4">{title}</Typography>
      <BoxwMB1
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {buildIDs.map((id) => {
          const build = builds.find((x) => ((x._id as unknown) as string) === id);
          return <BuildCard shipBuild={build} key={id} />;
        })}
      </BoxwMB1>
    </div>
  );
};

const Spacer = styled('div')(() => ({ flexGrow: 1 }));
const FlexAcross = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  '& a': {
    flexGrow: 1,
    textAlign: 'center',
  },
  '& button': {
    flexGrow: 1,
  },
}));

interface BuildDetailProps {
  foundBuild: IBuildInfov2;
  shipInfo: IShipInfo | undefined;
  addBuild: AddBuildFunction;
}

const BuildDetailFull = ({ shipInfo, foundBuild, addBuild }: BuildDetailProps) => {
  const { blueprints } = useLinks();

  return (
    <Paper sx={{ p: 1, mb: 1 }}>
      <FlexAcross>
        {shipInfo && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              '& a': {
                m: 1,
                textAlign: 'center',
              },
              '& button': {
                m: 1,
              },
              m: 1,
            }}>
            <Image src={shipInfo.shipImg} alt={shipInfo.name} width={300} height={300} />
            <FlexAcross>
              <Typography>{shipInfo.name}</Typography>
              <Spacer />
              <Typography>{ShipSize[shipInfo.size]}</Typography>
            </FlexAcross>
            {shipInfo.requires && <Typography>Requires: {shipInfo.requires}</Typography>}

            <Button variant="contained" color="primary" href={foundBuild.buildLink} target="_blank">
              Show Build
            </Button>
            <div style={{ display: 'grid', gridTemplate: '1fr 1fr / 1fr 1fr' }}>
              <Button variant="contained" color="secondary" href={shipInfo.shipReview} target="_blank">
                {`Pilot's Review`}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href={`${blueprints}?s=${shipInfo.blueprint}`}
                target="_blank">
                Ship Anatomy
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addBuild('variant', foundBuild._id.toString())}>
                Add Variant
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addBuild('related', foundBuild._id.toString())}>
                Add Related
              </Button>
            </div>
          </Box>
        )}
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& a': {
              m: 1,
            },
            '& button': {
              m: 1,
            },
            flexGrow: 1,
            m: 1,
          }}>
          <Typography variant="h5">{foundBuild.title}</Typography>
          <Typography>Author: {foundBuild.author}</Typography>
          <EngIcons engLevel={foundBuild.engLevel} />
          <TagGroup build={foundBuild} />
          {foundBuild.description && <USCMarkdown>{foundBuild.description}</USCMarkdown>}
        </Box>
      </FlexAcross>
    </Paper>
  );
};

const NoShrinkImg = styled(Image)(() => ({ flexShrink: 0 }));
const FlexRow = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
}));
const BuildDetailMobile = ({ shipInfo, foundBuild, addBuild }: BuildDetailProps) => {
  const { blueprints } = useLinks();
  return (
    <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <FlexRow>
        {shipInfo && <NoShrinkImg src={shipInfo.shipImg} alt={shipInfo.name} width={150} height={150} />}
        <div>
          <Typography variant="h5">{foundBuild.title}</Typography>
          <Typography>Author: {foundBuild.author}</Typography>
          <FlexRow>
            {shipInfo && (
              <>
                <Typography>{shipInfo.name}</Typography>
                <Spacer />
                <Typography>{ShipSize[shipInfo.size]}</Typography>
              </>
            )}
          </FlexRow>
        </div>
      </FlexRow>
      <Button variant="contained" color="primary" href={foundBuild.buildLink} target="_blank">
        Show Build
      </Button>
      <Divider sx={{ mt: 2 }} />
      <TagGroup build={foundBuild} />
      <EngIcons engLevel={foundBuild.engLevel} />
      {foundBuild.description && <USCMarkdown>{foundBuild.description}</USCMarkdown>}
      <Box
        sx={{
          display: 'grid',
          gridTemplate: '1fr 1fr / 1fr 1fr',
          gap: 5,
          p: 1,
        }}>
        {shipInfo && (
          <>
            <Button variant="contained" color="secondary" href={shipInfo.shipReview} target="_blank">
              Pilot's Review
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href={`${blueprints}?s=${shipInfo.blueprint}`}
              target="_blank">
              Ship Anatomy
            </Button>
          </>
        )}

        <Button variant="contained" color="secondary" onClick={() => addBuild('variant', foundBuild._id.toString())}>
          Add Variant
        </Button>
        <Button variant="contained" color="secondary" onClick={() => addBuild('related', foundBuild._id.toString())}>
          Add Related
        </Button>
      </Box>
    </Paper>
  );
};

export const BuildDetail = () => {
  const id = useRouter().asPath.substring(useRouter().asPath.lastIndexOf('/') + 1);
  console.log(id);
  const { loading, shipInfo, foundBuild } = useShipBuildInfo(id);
  const { addBuild } = useContext(BuildContext);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Container maxWidth="lg">
      <CenteredTypography variant="h3">Build Detail</CenteredTypography>
      {foundBuild ? (
        <>
          {isMobile ? (
            <BuildDetailMobile foundBuild={foundBuild} shipInfo={shipInfo} addBuild={addBuild} />
          ) : (
            <BuildDetailFull foundBuild={foundBuild} shipInfo={shipInfo} addBuild={addBuild} />
          )}
          <PaperP2>
            <CenteredTypography variant="subtitle2">
              Ship Image by{' '}
              <Link href="https://forums.frontier.co.uk/member.php/118579-Qohen-Leth">CMDR Qohen Leth</Link> via
              Copyright CC BY-NC-SA 4.0 (available on <Link href="https://edassets.org">edassets.org</Link>)
            </CenteredTypography>
          </PaperP2>
        </>
      ) : (
        <></>
      )}
      {foundBuild && foundBuild.variants.length > 0 ? (
        <BuildDetailBuilds title="Build Variants" buildIDs={foundBuild.variants} />
      ) : null}
      {foundBuild && foundBuild.related.length > 0 ? (
        <BuildDetailBuilds title="Related Builds" buildIDs={foundBuild.related} />
      ) : null}
    </Container>
  );
};
