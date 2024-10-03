import { TextFieldwM1 } from '@/_components/_common';
import { genericSortArray } from 'functions/sort';
import { useShipMap } from '@/builds/_hooks/useShipMap';
import { IShipInfo } from '@/builds/_models';
import { Autocomplete } from '@mui/material';

const findShipName = (ships: IShipInfo[], shipID: string | null) => {
  if (shipID === null) {
    return null;
  }
  const shipName = ships.find((x) => x.shipId === shipID);
  return shipName;
};

interface IShipAutocompleteProps {
  shipType: string | null;
  handleShipChange: (_, value: IShipInfo | null) => void;
  disableClearable?: boolean;
}

export const ShipAutocomplete = (props: IShipAutocompleteProps) => {
  const { shipType, handleShipChange, disableClearable } = props;
  const ships = useShipMap();

  return (
    <Autocomplete
      id="shipType"
      options={genericSortArray(ships, { orderBy: 'name', order: 'asc' })}
      autoHighlight
      disableClearable={disableClearable}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextFieldwM1 {...params} label="Ship Type" />}
      value={findShipName(ships, shipType)}
      onChange={handleShipChange}
    />
  );
};
