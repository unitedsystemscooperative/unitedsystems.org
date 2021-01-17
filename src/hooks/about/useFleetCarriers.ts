import { sortItems } from 'functions/sort';
import { IFleetCarrier } from 'models/information/fleetCarrier';
import { useContext, useMemo } from 'react';
import { QueryAllFleetCarriers } from 'gql/queries/fleetCarriers';
import useSWR from 'swr';
import { gqlFetcher } from 'gql/fetcher';
import { RealmAppContext } from 'providers';

export const useFleetCarriers = () => {
  const realm = useContext(RealmAppContext);
  const { data, error } = useSWR(QueryAllFleetCarriers, (query) =>
    gqlFetcher(query, undefined, realm)
  );
  if (error) {
    throw new Error(`Failed to fetch carriers: ${error.message}`);
  }
  let fleetCarriers = data?.fleetCarriers;
  return { fleetCarriers, isLoading: !error && !data };
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
