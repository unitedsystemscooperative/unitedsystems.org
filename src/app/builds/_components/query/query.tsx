'use client';
import { IQuery, OtherFilters } from '@/app/builds/_models';
import { Box } from '@mui/material';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useReducer } from 'react';
import { QueryActions } from './queryActions';
import { QueryEngineering } from './queryEngineering';
import { QueryOther } from './queryOther';
import { QueryShip } from './queryShip';
import { QuerySpecialties } from './querySpecialities';

interface QueryProps {
  updateQuery: (query: IQuery) => void;
  addBuild: () => void;
}

type action =
  | { type: 'ship'; value: string | null }
  | { type: 'size'; value: number | null }
  | { type: 'specialties'; value: string[] }
  | { type: 'engLevel'; value: number | null }
  | { type: 'other'; value: OtherFilters | null }
  | { type: 'guardian'; value: number | null }
  | { type: 'powerplay'; value: number | null }
  | { type: 'beginner'; value: number | null }
  | { type: 'query'; value: IQuery | null }
  | { type: 'reset' };

function processQueryParams(queryParams: ReadonlyURLSearchParams): IQuery {
  const ship = queryParams.get('ship');

  const sizeParam = queryParams.get('size');
  const size = sizeParam ? parseInt(sizeParam) : null;

  const engParam = queryParams.get('engLevel');
  const engLevel = engParam ? parseInt(engParam) : null;

  const specialties = queryParams.getAll('specialties');

  const guardianParam = queryParams.get('guardian');
  const guardian = guardianParam === '1' ? 1 : guardianParam === '0' ? 0 : null;

  const powerplayParam = queryParams.get('powerplay');
  const powerplay = powerplayParam === '1' ? 1 : powerplayParam === '0' ? 0 : null;

  const beginnerParam = queryParams.get('beginner');
  const beginner = beginnerParam === '1' ? 1 : beginnerParam === '0' ? 0 : null;

  return {
    ship,
    size,
    engLevel,
    specialties,
    guardian,
    powerplay,
    beginner,
  } satisfies IQuery;
}

export const Query = (props: QueryProps) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const { updateQuery, addBuild } = props;

  const queryReducer = (prevState: IQuery, action: action): IQuery => {
    let newQuery: IQuery;
    switch (action.type) {
      case 'ship':
        newQuery = { ...prevState, ship: action.value };
        break;
      case 'size':
        newQuery = { ...prevState, size: action.value };
        break;
      case 'specialties':
        const specialties = action.value ?? [];
        newQuery = { ...prevState, specialties };
        break;
      case 'other':
        newQuery = action.value ? { ...prevState, ...action.value } : prevState;
        break;
      case 'engLevel':
        newQuery = { ...prevState, engLevel: action.value };
        break;
      case 'guardian':
        newQuery = { ...prevState, guardian: action.value };
        break;
      case 'powerplay':
        newQuery = { ...prevState, powerplay: action.value };
        break;
      case 'beginner':
        newQuery = { ...prevState, beginner: action.value };
        break;
      case 'query':
        newQuery = action.value ?? prevState;
        break;
      case 'reset':
        newQuery = {
          ship: null,
          size: null,
          specialties: [],
          engLevel: null,
          guardian: null,
          powerplay: null,
          beginner: null,
        };
        break;
      default:
        newQuery = prevState;
    }

    const queryString = qs.stringify(newQuery);
    router.push(`/builds?${queryString}`);
    router.refresh();

    updateQuery(newQuery);

    return newQuery;
  };

  const [query, dispatch] = useReducer(queryReducer, {
    ship: null,
    size: null,
    specialties: [],
    engLevel: null,
    guardian: null,
    powerplay: null,
    beginner: null,
  });

  useEffect(() => {
    const query = processQueryParams(queryParams);

    dispatch({ type: 'query', value: query });

    // Disable as I only want this on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetQueries = () => {
    dispatch({ type: 'reset' });
  };

  const handleAdd = () => {
    console.log('Query: Add Build clicked.');
    console.log(addBuild);
    addBuild();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: { xs: '2px', lg: '5px' },
        columnGap: { lg: '5px' },
        gridTemplateAreas: {
          xs: `
    'specializations'
    'engineering'
    'ship'
    'other'
    'buttons'`,
          lg: `
        'specializations   specializations   specializations'
        'engineering   ship   other'
        'buttons    buttons   buttons'`,
        },
        textAlign: 'center',
        gridTemplateRows: {
          lg: 'fit-content(300px) fit-content(200px) fit-content(100px)',
        },
      }}>
      <QuerySpecialties
        selectedSpecialties={query.specialties}
        setSpecialties={(value: string[]) => dispatch({ type: 'specialties', value })}
      />
      <QueryShip
        shipType={query.ship}
        setShipType={(value: string) => dispatch({ type: 'ship', value })}
        shipSize={query.size}
        setShipSize={(value: number) => dispatch({ type: 'size', value })}
      />
      <QueryEngineering
        engLevel={query.engLevel}
        setEngLevel={(value: number) => dispatch({ type: 'engLevel', value })}
      />
      <QueryOther
        other={{ ...query }}
        setOther={(value: OtherFilters) => dispatch({ type: 'other', value })}
      />
      <QueryActions resetQueries={resetQueries} addBuild={handleAdd} />
    </Box>
  );
};
