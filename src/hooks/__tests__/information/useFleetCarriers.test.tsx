import {
  useFleetCarriers,
  usePersonalCarriers,
  useSquadCarriers,
} from 'hooks/information/useFleetCarriers';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, renderHook } from '@testing-library/react-hooks';
import fleetCarrierData from 'data/about/fleetCarriers.json';

import { QueryAllFleetCarriers } from 'gql/queries/fleetCarriers';

describe('useFleetCarriers', () => {
  afterEach(cleanup);

  it('should throw error if it fails the query', async () => {
    const errorMock = {
      request: {
        query: QueryAllFleetCarriers,
      },
      error: new Error('an error occurred'),
    };

    const wrapper = (props: { children: JSX.Element }) => (
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        {props.children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useFleetCarriers(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.error).toBeDefined();
  });
});

describe('usePersonalCarriers', () => {
  it('should return personal carriers if provided carriers', () => {
    const personalCarriers = fleetCarrierData.filter((x) =>
      x.purpose.toLowerCase().includes('personal')
    );

    const { result } = renderHook(() => usePersonalCarriers(fleetCarrierData));

    expect(result.current?.length).toBe(personalCarriers.length);
  });

  it('should return personal carriers if provided carriers', () => {
    const { result } = renderHook(() => usePersonalCarriers(undefined));

    expect(result.current).toBeUndefined();
  });
});

describe('useSquadCarriers', () => {
  it('should return personal carriers if provided carriers', () => {
    const uscCarriers = fleetCarrierData.filter(
      (x) => !x.purpose.toLowerCase().includes('personal')
    );

    const { result } = renderHook(() => useSquadCarriers(fleetCarrierData));

    expect(result.current?.length).toBe(uscCarriers.length);
  });

  it('should return personal carriers if provided carriers', () => {
    const { result } = renderHook(() => useSquadCarriers(undefined));

    expect(result.current).toBeUndefined();
  });
});
