import { Box, Card, CardContent, CardMedia, Divider, ListItem, Typography } from '@mui/material';
import { useShipIdfromMap } from 'hooks/builds/useShipMap';
import { IBuildInfov2, IShipInfo, ShipSize } from 'models/builds';
import { HTMLAttributes } from 'react';
import { EngIcons } from '../engIcons';
import { TagGroup } from '../tagGroup';

const BuildCard = ({ shipBuild, shipInfo }: { shipBuild: IBuildInfov2; shipInfo: IShipInfo }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minWidth: '400px',
        margin: 1,
        textAlign: 'center',
      }}>
      <Box sx={{ ml: 1 }}>
        <CardMedia
          sx={{
            height: '75px',
            width: '75px',
            flexShrink: 0,
            margin: 'auto',
          }}
          image={shipInfo.shipImg}
          title={shipInfo.name}
        />
        <Typography>{ShipSize[shipInfo.size]}</Typography>
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
  );
};

interface BuildOptionProps extends HTMLAttributes<HTMLLIElement> {
  shipBuild?: IBuildInfov2;
}

export const BuildOption = ({ shipBuild, ...liProps }: BuildOptionProps) => {
  const shipInfo = useShipIdfromMap(shipBuild?.shipId);

  return shipBuild && shipInfo ? (
    <ListItem {...liProps}>
      <BuildCard shipBuild={shipBuild} shipInfo={shipInfo} />
    </ListItem>
  ) : null;
};
