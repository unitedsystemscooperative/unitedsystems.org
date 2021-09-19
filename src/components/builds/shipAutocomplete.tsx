import { Autocomplete, TextField } from '@mui/material';
import { genericSortArray } from 'functions/sort';
import { useShipMap } from 'hooks/builds/useShipMap';
import { IShipInfo } from 'models/builds';

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
}

export const ShipAutocomplete = (props: IShipAutocompleteProps) => {
  const { shipType, handleShipChange } = props;
  const ships = useShipMap();

  return (
    <Autocomplete
      id="shipType"
      options={genericSortArray(ships, { orderBy: 'name', order: 'asc' })}
      autoHighlight
      disableClearable
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ship Type"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autocomplete: 'new-password',
          }}
        />
      )}
      value={findShipName(ships, shipType)}
      onChange={handleShipChange}
    />
  );
};
