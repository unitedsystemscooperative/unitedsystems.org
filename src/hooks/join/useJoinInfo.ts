import { IJoinInfo } from 'models/join/joinInfo';
import { useContext, useMemo } from 'react';
import { QueryAllJoiners } from 'gql/queries/joiners';
import { InsertJoiner } from 'gql/mutations/joiner.insert';
import { RealmAppContext } from 'providers';
import useSWR from 'swr';
import { gqlFetcher } from 'gql/fetcher';

export const useJoinInfo = () => {
  const { allJoiners, loading, error } = useAllJoinInfo();
  console.log(allJoiners);

  const joiners = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'join');
  }, [allJoiners, loading, error]);
  const guests = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'guest');
  }, [allJoiners, loading, error]);
  const ambassadors = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'ambassador');
  }, [allJoiners, loading, error]);

  return { joiners, guests, ambassadors, loading, error };
};

export const useAllJoinInfo = () => {
  const realm = useContext(RealmAppContext);
  const { data, error } = useSWR('/api/joiners', (query) =>
    gqlFetcher(QueryAllJoiners, undefined, realm)
  );
  const allJoiners = data?.joiners ?? [];

  return { allJoiners, loading: !error && !data, error };
};

export const useAddJoinInfo = () => {
  const realm = useContext(RealmAppContext);
  const addJoiner = async (joiner: IJoinInfo) => {
    try {
      const addedJoiner = await gqlFetcher(
        InsertJoiner,
        {
          joiner: {
            ...joiner,
          },
        },
        realm
      );
      return addedJoiner;
    } catch (e) {
      throw new Error(`Unable to add. ${e.message}`);
    }
  };

  return addJoiner;
};
