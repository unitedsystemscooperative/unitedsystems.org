import { useEffect, useState } from 'react';
import { IQuery, OtherFilters } from 'models/shipBuilds';

import { makeStyles, Paper } from '@material-ui/core';
import { QuerySpecialization } from './querySpecialities';
import { QueryShip } from './queryShip';
import { QueryEngineering } from './queryEngineering';
import { QueryOther } from './queryOther';
import { useUrlQuery } from 'hooks/useURLQuery';
import { QueryActions } from './queryActions';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    rowGap: '2px',
    gridTemplateAreas: `
    'specializations'
    'engineering'
    'ship'
    'other'
    'buttons'`,
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      gridTemplateAreas: `
        'specializations    engineering'
        'ship   other'
        'buttons    buttons'`,
      gridTemplateRows: '1fr 1fr 0.1fr',
      rowGap: '5px',
      columnGap: '5px',
    },
  },
}));

export const Query = (props: { updateQuery: (query: IQuery) => void }) => {
  const [shipType, setShipType] = useState<string | null>(null);
  const [shipSize, setShipSize] = useState<number | null>(null);
  const [engLevel, setEngLevel] = useState<number | null>(null);
  const [selectedSpecialties, setSpecialties] = useState<string[]>([]);
  const [other, setOther] = useState<OtherFilters>({
    guardian: null,
    powerplay: null,
    beginner: null,
    showVariants: null,
  });
  const urlQuery = useUrlQuery();
  const history = useHistory();
  const { updateQuery } = props;
  const classes = useStyles();

  useEffect(() => {
    const shipParam = urlQuery.get('ship');
    if (shipParam) {
      setShipType(shipParam);
    }

    const sizeParam = urlQuery.get('size');
    if (sizeParam) {
      try {
        const sizeNumber = parseInt(sizeParam);
        setShipSize(sizeNumber);
      } catch (e) {
        // do nothing
      }
    }

    const engParam = urlQuery.get('engLevel');
    if (engParam) {
      try {
        const engNumber = parseInt(engParam);
        setEngLevel(engNumber);
      } catch (e) {
        // do nothing
      }
    }
    const specialtiesParam = urlQuery.getAll('specialties');
    if (specialtiesParam && specialtiesParam.length > 0) {
      setSpecialties(specialtiesParam);
    }
    const guardianParam = urlQuery.get('guardian');
    const guardianValue =
      guardianParam === '1' ? 1 : guardianParam === '0' ? 0 : null;
    setOther((other) => ({ ...other, guardian: guardianValue }));

    const powerplayParam = urlQuery.get('powerplay');
    const powerplayValue =
      powerplayParam === '1' ? 1 : powerplayParam === '0' ? 0 : null;
    setOther((other) => ({ ...other, powerplay: powerplayValue }));

    const beginnerParam = urlQuery.get('beginner');
    if (beginnerParam === 'true' || beginnerParam === '1') {
      setOther((other) => ({ ...other, beginner: 1 }));
    } else if (beginnerParam === '0') {
      setOther((other) => ({ ...other, beginner: 0 }));
    }

    const variantsParam = urlQuery.get('showVariants');
    const variantValue = variantsParam === 'true' ? true : false;
    setOther((other) => ({ ...other, showVariants: variantValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query: IQuery = {
      ship: shipType,
      size: shipSize,
      engLevel,
      specialties: selectedSpecialties,
      ...other,
    };
    const queryString = qs.stringify(query);
    history.push(`/builds/?${queryString}`);
    updateQuery(query);
  }, [
    shipType,
    shipSize,
    engLevel,
    selectedSpecialties,
    other,
    updateQuery,
    history,
  ]);

  const resetQueries = () => {
    setShipType(null);
    setShipSize(null);
    setEngLevel(null);
    setSpecialties([]);
    setOther({
      guardian: null,
      powerplay: null,
      beginner: null,
      showVariants: null,
    });
  };

  return (
    <Paper className={classes.root}>
      <QuerySpecialization
        selectedSpecialties={selectedSpecialties}
        setSpecialties={setSpecialties}
      />
      <QueryShip
        shipType={shipType}
        setShipType={setShipType}
        shipSize={shipSize}
        setShipSize={setShipSize}
      />
      <QueryEngineering engLevel={engLevel} setEngLevel={setEngLevel} />
      <QueryOther other={other} setOther={setOther} />
      <QueryActions resetQueries={resetQueries} />
    </Paper>
  );
};
