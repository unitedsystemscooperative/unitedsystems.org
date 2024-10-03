import { IShipInfo } from '@/builds/_models';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { ShipAutocomplete } from '../shipAutocomplete';
import { QuerySection, QuerySectionHeader } from './sharedComponents';

export const QueryShip = (props: {
  shipSize: number | null;
  setShipSize: Dispatch<SetStateAction<number | null>>;
  shipType: string | null;
  setShipType: Dispatch<SetStateAction<string | null>>;
}) => {
  const { shipType, setShipType, shipSize, setShipSize } = props;

  const handleShipSizeChange = (_: MouseEvent<HTMLElement>, newValue: number) => {
    setShipType(null);
    setShipSize(newValue);
  };

  const handleShipChange = (_, value: IShipInfo | null) => {
    const ship = value?.shipId;
    setShipType(ship ?? null);
    setShipSize(null);
  };

  return (
    <QuerySection sx={{ gridArea: 'ship' }}>
      <QuerySectionHeader>Ship Type and Size</QuerySectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ minWidth: 200, margin: 1, flex: '1 0' }}>
          <ShipAutocomplete shipType={shipType} handleShipChange={handleShipChange} />
        </Box>
        <div style={{ margin: 'auto' }}>
          <Tooltip title="What's the size of the ship you're looking for?" arrow>
            <ToggleButtonGroup value={shipSize} exclusive onChange={handleShipSizeChange}>
              <ToggleButton value={1}>Small</ToggleButton>
              <ToggleButton value={2}>Medium</ToggleButton>
              <ToggleButton value={3}>Large</ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
        </div>
      </div>
    </QuerySection>
  );
};
