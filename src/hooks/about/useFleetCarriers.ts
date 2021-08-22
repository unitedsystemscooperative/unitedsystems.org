import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { genericSortArray } from 'functions/sort';

const addCarrier = async (carrier: IFleetCarrier) => {
  try {
    await axios.post<IFleetCarrier>('/api/fc', carrier);
    mutate('/api/fc');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateCarrier = async (carrier: IFleetCarrier) => {
  try {
    await axios.put('/api/fc', carrier);
    mutate('/api/fc');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteCarrier = async (carrier: IFleetCarrier) => {
  try {
    await axios.delete(`/api/fc?id=${carrier._id}`);
    mutate('/api/fc');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useFleetCarriers = () => {
  const { data, error } = useSWR('/api/fc', (url: string) => axios.get(url));
  const fleetCarriers = data?.data ?? [];
  return {
    fleetCarriers,
    isLoading: !error && !data,
    error,
    addCarrier,
    updateCarrier,
    deleteCarrier,
  };
};

export const usePersonalCarriers = (
  fleetCarriers: IFleetCarrier[] | undefined
) => {
  return useMemo(() => {
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
};

export const useSquadCarriers = (
  fleetCarriers: IFleetCarrier[] | undefined
) => {
  return useMemo(() => {
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
};
