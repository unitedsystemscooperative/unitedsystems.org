import { ReactNode, useEffect, useState } from 'react';
import { useRealmApp } from 'hooks/useRealmApp';
import { IRealmContext } from 'models/realmContext';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const createRealmApolloClient = (app: IRealmContext) => {
  if (app.app === undefined) {
    throw new Error('app is not defined');
  }
  const link = new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.app.id}/graphql`,
    // A custom fetch handler adds the logged in user's access token to GraphQL requests
    fetch: async (uri, options) => {
      if (!app.currentUser) {
        throw new Error(`Must be logged in to use the GraphQL API`);
      }
      // Refreshing a user's custom data also refreshes their access token
      await app.currentUser.refreshCustomData();
      options!.headers = new Headers({
        Authorization: `Bearer ${app.currentUser.accessToken}`,
      });
      return fetch(uri, options);
    },
  });

  const cache = new InMemoryCache();

  return new ApolloClient({ link, cache });
};

export const RealmApolloProvider = (props: { children: ReactNode }) => {
  const app = useRealmApp();
  const [client, setClient] = useState(createRealmApolloClient(app));
  useEffect(() => {
    setClient(createRealmApolloClient(app));
  }, [app]);
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
