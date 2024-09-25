import { USCMarkdown } from '@/components/uscmarkdown';
import { BoxwMB1, CenteredTypography } from '@/components/_common';
import { useLinks } from '@/hooks/useLinks';
import { IBuildInfov2, IShipInfo, ShipSize } from '@/app/builds/_models';
import {
  AddBuildFunction,
  BuildContext,
  BuildContextProvider,
} from '@/app/builds/_providers/buildProvider';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import { EngIcons } from '../engIcons';
import { TagGroup } from '../tagGroup';
import { BuildCard } from './buildCard';
import { ShipImgAcknowledgement } from './shipImgAcknowledgement';

const BuildDetailBuilds = ({
  title,
  buildIDs,
  builds,
}: {
  title: string;
  buildIDs: string[];
  builds: IBuildInfov2[];
}) => {
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
          const build = builds.find((x) => x._id.toString() === id);
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

            <Button variant="outlined" color="primary" href={foundBuild.buildLink} target="_blank">
              Show Build
            </Button>
            <div style={{ display: 'grid', gridTemplate: '1fr 1fr / 1fr 1fr' }}>
              <Button
                variant="outlined"
                color="secondary"
                href={shipInfo.shipReview}
                target="_blank">
                {`Pilot's Review`}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                href={`${blueprints}?s=${shipInfo.blueprint}`}
                target="_blank">
                Ship Anatomy
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => addBuild()}>
                Add Build
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => addBuild(foundBuild._id.toString())}>
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
        {shipInfo && (
          <NoShrinkImg src={shipInfo.shipImg} alt={shipInfo.name} width={150} height={150} />
        )}
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
      <Button variant="outlined" color="primary" href={foundBuild.buildLink} target="_blank">
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
            <Button variant="outlined" color="secondary" href={shipInfo.shipReview} target="_blank">
              Pilot's Review
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href={`${blueprints}?s=${shipInfo.blueprint}`}
              target="_blank">
              Ship Anatomy
            </Button>
          </>
        )}

        <Button variant="outlined" color="secondary" onClick={() => addBuild()}>
          Add Build
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => addBuild(foundBuild._id.toString())}>
          Add Related
        </Button>
      </Box>
    </Paper>
  );
};

export const BuildDetailDisplay = () => {
  const id = useRouter().asPath.substring(useRouter().asPath.lastIndexOf('/') + 1);
  console.log(id);
  const { addBuild, findBuildandShipInfo, builds } = useContext(BuildContext);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { build, shipInfo } = useMemo(() => {
    return findBuildandShipInfo(id);
  }, [findBuildandShipInfo, id]);

  return (
    <Container maxWidth="lg">
      <CenteredTypography variant="h3">Build Detail</CenteredTypography>
      {build ? (
        <>
          {isMobile ? (
            <BuildDetailMobile foundBuild={build} shipInfo={shipInfo} addBuild={addBuild} />
          ) : (
            <BuildDetailFull foundBuild={build} shipInfo={shipInfo} addBuild={addBuild} />
          )}
          <ShipImgAcknowledgement />
        </>
      ) : (
        <></>
      )}
      {build && build.related.length > 0 ? (
        <BuildDetailBuilds title="Related Builds" buildIDs={build.related} builds={builds} />
      ) : null}
    </Container>
  );
};

export const BuildDetail = ({ init }: { init?: IBuildInfov2[] }) => {
  return (
    <BuildContextProvider init={init}>
      <BuildDetailDisplay />
    </BuildContextProvider>
  );
};
