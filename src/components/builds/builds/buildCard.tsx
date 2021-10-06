import { Box, Button, Card, CardContent, CardMedia, Divider, Fade, Typography } from '@mui/material';
import { useShipIdfromMap } from 'hooks/builds/useShipMap';
import { IBuildInfov2, ShipSize } from 'models/builds';
import NextLink from 'next/link';
import { EngIcons } from './engIcons';
import { TagGroup } from './tagGroup';

export const BuildCard = ({ shipBuild }: { shipBuild: IBuildInfov2 | undefined }) => {
  const shipInfo = useShipIdfromMap(shipBuild?.shipId);

  return shipBuild && shipInfo ? (
    <Fade in={true} timeout={500}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '400px',
          minWidth: '400px',
          margin: '5px',
          textAlign: 'center',
        }}>
        <Box sx={{ ml: 1 }}>
          <CardMedia
            sx={{
              height: '100px',
              width: '100px',
              flexShrink: 0,
              margin: 'auto',
            }}
            image={shipInfo.shipImg}
            title={shipInfo.name}
          />
          <Typography>{ShipSize[shipInfo.size]}</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateRows: 'auto',
              '& a': {
                minWidth: 121,
                mb: 1,
              },
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              href={shipBuild.buildLink}
              target="_blank"
            >
              View Build
            </Button>
            <NextLink
              href={`/builds/detail/${(shipBuild._id as unknown) as string}`}
              passHref
            >
              <Button color="primary" variant="outlined">
                More Details
              </Button>
            </NextLink>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, flexBasis: 'auto', flexWrap: 'wrap' }}>
          <Typography>{shipBuild.title}</Typography>
          <Divider />
          <Typography>{shipInfo.name} </Typography>
          {shipInfo.requires && <Typography>Requirement: {shipInfo.requires}</Typography>}
          <TagGroup build={shipBuild} />
          <Divider />
          <EngIcons engLevel={shipBuild.engLevel} />
          <Divider />
          <Typography>Author: {shipBuild.author}</Typography>
          {shipBuild.variants.length > 0 ? <Typography>Has Variants</Typography> : null}
          {shipBuild.related.length > 0 ? <Typography>Has Related Builds</Typography> : null}
          <div style={{ flexGrow: 1 }} />
        </CardContent>
      </Card>
    </Fade>
  ) : null;
};
