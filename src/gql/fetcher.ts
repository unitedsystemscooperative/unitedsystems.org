import { GraphQLClient } from 'graphql-request';
import { IRealmContext } from 'models/realmContext';

const getClient = (endpoint: string, accessToken: string) => {
  const client = new GraphQLClient(endpoint);
  client.setHeaders({ authorization: `Bearer ${accessToken}` });
  return client;
};

export const gqlFetcher = async (query, variables, realm: IRealmContext) => {
  if (realm.app === undefined) {
    throw new Error('app is not defined');
  }
  const gqlEndpoint = `https://realm.mongodb.com/api/client/v2.0/app/${realm.app.id}/graphql`;
  if (!realm.currentUser) {
    throw new Error('Must be logged in to use the GraphQL API');
  }
  await realm.currentUser.refreshCustomData();
  const client = getClient(gqlEndpoint, realm.currentUser.accessToken);

  const data = await client.request(query, variables);
  return data;
};
