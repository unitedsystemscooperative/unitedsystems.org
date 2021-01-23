import { sortItems } from 'functions/sort';
import { IFleetCarrier } from 'models/information/fleetCarrier';
import { useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export const useFleetCarriers = () => {
  const { data, error } = useSWR('/api/fc', (url: string) => axios.get(url));
  const fleetCarriers = data?.data ?? [];
  return { fleetCarriers, isLoading: !error && !data, error };
};

export const usePersonalCarriers = (
  fleetCarriers: IFleetCarrier[] | undefined
) => {
  return useMemo(() => {
    if (fleetCarriers) {
      const personalCarriers = fleetCarriers.filter((x) =>
        x.purpose.toLowerCase().includes('personal')
      );
      return sortItems(personalCarriers, 'name');
    } else {
      return undefined;
    }
  }, [fleetCarriers]);
};

export const useSquadCarriers = (
  fleetCarriers: IFleetCarrier[] | undefined
) => {
  return useMemo(() => {
    if (fleetCarriers) {
      const personalCarriers = fleetCarriers.filter(
        (x) => !x.purpose.toLowerCase().includes('personal')
      );
      return sortItems(personalCarriers, 'name');
    } else {
      return undefined;
    }
  }, [fleetCarriers]);
};
