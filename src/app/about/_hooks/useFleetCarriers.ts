import { genericSortArray } from '@/functions/sort';
import { IFleetCarrier } from '@/app/about/_models/fleetCarrier';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';

const API_PATH = '/api/fc';

export const useFleetCarriers = (init?: IFleetCarrier[]) => {
  const {
    data: fleetCarriers,
    error,
    mutate,
  } = useSWR(
    API_PATH,
    (url: string) => axios.get<IFleetCarrier[]>(url).then((data) => data?.data ?? []),
    {
      fallbackData: init,
    }
  );
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

  const addCarrier = async (carrier: IFleetCarrier) => {
    try {
      await axios.post<IFleetCarrier>(API_PATH, carrier);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const updateCarrier = async (carrier: IFleetCarrier) => {
    try {
      await axios.put(API_PATH, carrier);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const deleteCarrier = async (carrier: IFleetCarrier) => {
    try {
      await axios.delete(`${API_PATH}?id=${carrier._id}`);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  return {
    fleetCarriers,
    personalCarriers,
    squadCarriers,
    isLoading: !error && !fleetCarriers,
    error,
    addCarrier,
    updateCarrier,
    deleteCarrier,
  };
};
