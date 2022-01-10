import { genericSortArray } from '@/functions/sort';
import { useData } from '@/hooks/useData';
import { useMemo } from 'react';
import { IFleetCarrier } from '~/about/models/fleetCarrier';

const API_PATH = '/api/fc';

export const useFleetCarriers = (initState?: IFleetCarrier[]) => {
  const {
    data: fleetCarriers,
    error,
    isLoading,
    addItem: addCarrier,
    updateItem: updateCarrier,
    deleteItem: deleteCarrier,
  } = useData(API_PATH, initState);

  const personalCarriers = useMemo(() => {
    if (fleetCarriers) {
      const personalCarriers = fleetCarriers.filter((x) => !x.purpose);
      return genericSortArray(personalCarriers, {
        orderBy: 'name',
        order: 'asc',
      });
    } else {
      return undefined;
    }
  }, [fleetCarriers]);
  const squadCarriers = useMemo(() => {
    if (fleetCarriers) {
      const personalCarriers = fleetCarriers.filter((x) => x.purpose);
      return genericSortArray(personalCarriers, {
        orderBy: 'name',
        order: 'asc',
      });
    } else {
      return undefined;
    }
  }, [fleetCarriers]);

  return {
    fleetCarriers,
    personalCarriers,
    squadCarriers,
    isLoading,
    error,
    addCarrier,
    updateCarrier,
    deleteCarrier,
  };
};
