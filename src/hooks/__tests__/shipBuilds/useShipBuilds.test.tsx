import { useAllShipBuilds } from 'hooks/shipBuilds/useShipBuilds';

import { MockedProvider } from '@apollo/client/testing';
import { cleanup, renderHook } from '@testing-library/react-hooks';
import shipBuilds from 'data/shipBuilds/builds.json';

import { QueryAllShipBuilds } from 'gql/queries/shipBuilds';

describe('useShipBuilds', () => {
  afterEach(cleanup);

  it('should throw error if it fails the query in useAllShipBuilds', async () => {
    const errorMock = {
      request: {
        query: QueryAllShipBuilds,
      },
      error: new Error('an error occurred'),
    };

    const wrapper = (props: { children: JSX.Element }) => (
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        {props.children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllShipBuilds(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.error).toBeDefined();
  });

  it('should return data in useAllShipBuilds', async () => {
    const dataMock = {
      request: {
        query: QueryAllShipBuilds,
      },
      result: { data: { shipBuildsv2s: shipBuilds } },
    };

    const wrapper = (props: { children: JSX.Element }) => (
      <MockedProvider mocks={[dataMock]} addTypename={false}>
        {props.children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllShipBuilds(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.shipBuilds.length).toBeGreaterThan(5);
  });
});
