import { gqlFetcher } from 'gql/fetcher';
import { AllFactionSystems } from 'gql/queries/factionSystems';
import { RealmAppContext } from 'providers';
import { useContext } from 'react';
import useSWR from 'swr';

export const useFactionSystems = () => {
  const realm = useContext(RealmAppContext);
  const { data, error } = useSWR(AllFactionSystems, (query) =>
    gqlFetcher(query, undefined, realm)
  );
  const factionSystems = data?.factionSystems ?? [];

  return { factionSystems, loading: !error && !data, error };
};
