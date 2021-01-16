import { makeStyles, Tooltip } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { IShipInfo } from 'models/shipBuilds';
import { ShipAutocomplete } from '../shipAutocomplete';
import { useSharedStyles } from './sharedStyles';

const useStyles = makeStyles((theme) => ({
  shipQueries: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  shipTypeQuery: {
    [theme.breakpoints.up('lg')]: {
      minWidth: 200,
      margin: theme.spacing(1),
      flex: '1 0',
    },
  },
  shipSizeQuery: {
    margin: 'auto',
  },
}));

export const QueryShip = (props: {
  shipSize: number | null;
  setShipSize: Dispatch<SetStateAction<number | null>>;
  shipType: string | null;
  setShipType: Dispatch<SetStateAction<string | null>>;
}) => {
  const { shipType, setShipType, shipSize, setShipSize } = props;
  const sharedClasses = useSharedStyles();
  const classes = useStyles();

  const handleShipSizeChange = (
    _: MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setShipType(null);
    setShipSize(newValue);
  };

  const handleShipChange = (_: ChangeEvent<{}>, value: IShipInfo | null) => {
    const ship = value?.shipId;
    setShipType(ship ?? null);
    setShipSize(null);
  };

  return (
    <div className={sharedClasses.querySection}>
      <h3 className={sharedClasses.querySectionheader}>Ship Type and Size</h3>
      <div className={classes.shipQueries}>
        <div className={classes.shipTypeQuery}>
          <ShipAutocomplete
            shipType={shipType}
            handleShipChange={handleShipChange}
          />
        </div>
        <div className={classes.shipSizeQuery}>
          <Tooltip
            title="What's the size of the ship you're looking for?"
            arrow
          >
            <ToggleButtonGroup
              value={shipSize}
              exclusive
              onChange={handleShipSizeChange}
            >
              <ToggleButton value={1}>Small</ToggleButton>
              <ToggleButton value={2}>Medium</ToggleButton>
              <ToggleButton value={3}>Large</ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
